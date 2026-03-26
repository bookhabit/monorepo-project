# 배포 프로세스 및 환경 설정 관리

## 환경 분리

| 환경 | 용도 | 브랜치 |
|------|------|--------|
| local | 로컬 개발 | 개인 브랜치 |
| development | 통합 테스트 | `develop` |
| staging | 프로덕션 검증 | `release/*` |
| production | 실 서비스 | `main` |

---

## 환경변수 관리

### 파일 구조

```
apps/funnel/server/
├── .env              # 로컬 전용 (gitignore)
├── .env.example      # 키 목록만 커밋 (값 없음)
├── .env.development  # 개발 서버용 (gitignore)
└── .env.production   # 프로덕션용 (gitignore, CI/CD에서 주입)
```

### `.env.example` 템플릿

```bash
# 앱 설정
PORT=4001
NODE_ENV=development
CLIENT_ORIGIN=http://localhost:3001

# 데이터베이스
DATABASE_URL=

# 인증
JWT_SECRET=
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
```

### NestJS에서 환경변수 사용

```ts
// app.module.ts
ConfigModule.forRoot({
  isGlobal: true,
  envFilePath: `.env.${process.env.NODE_ENV ?? 'development'}`,
  validationSchema: Joi.object({
    PORT: Joi.number().default(4001),
    JWT_SECRET: Joi.string().required(),
    DATABASE_URL: Joi.string().required(),
  }),
})
```

---

## 빌드 파이프라인

### 빌드 순서 (Turborepo 자동 처리)

```
@mono/tsconfig  →  @mono/shared  →  @mono/ui  →  각 앱
```

### 전체 프로덕션 빌드

```bash
yarn build
# turbo가 의존성 그래프 기반으로 병렬 빌드
# 변경 없는 패키지는 캐시 사용
```

### 앱별 빌드 결과물

| 앱 타입 | 빌드 명령 | 산출물 |
|---------|---------|--------|
| React (Vite) | `vite build` | `dist/` |
| Next.js | `next build` | `.next/` |
| NestJS | `tsc -p tsconfig.json` | `dist/` |

---

## Docker 컨테이너화

### NestJS 서버 Dockerfile 예시

```dockerfile
# apps/funnel/server/Dockerfile
FROM node:20-alpine AS base
RUN corepack enable

FROM base AS deps
WORKDIR /app
COPY package.json yarn.lock .yarnrc.yml ./
COPY packages/ ./packages/
COPY apps/funnel/server/package.json ./apps/funnel/server/
RUN yarn install --immutable

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN yarn turbo run build --filter=@mono/funnel-server

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/apps/funnel/server/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 4001
CMD ["node", "dist/main.js"]
```

### Next.js 클라이언트 Dockerfile 예시

```dockerfile
# apps/loan-admin/client/Dockerfile
FROM node:20-alpine AS base
RUN corepack enable

FROM base AS builder
WORKDIR /app
COPY . .
RUN yarn install --immutable
RUN yarn turbo run build --filter=@mono/loan-admin-client

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/apps/loan-admin/client/.next/standalone ./
COPY --from=builder /app/apps/loan-admin/client/.next/static ./.next/static
COPY --from=builder /app/apps/loan-admin/client/public ./public
EXPOSE 3005
CMD ["node", "server.js"]
```

---

## CI/CD (GitHub Actions)

### PR 검증 워크플로우

```yaml
# .github/workflows/ci.yml
name: CI

on:
  pull_request:
    branches: [main, develop]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20

      - run: corepack enable

      - name: Restore Turbo cache
        uses: actions/cache@v4
        with:
          path: .turbo
          key: turbo-${{ hashFiles('yarn.lock') }}-${{ github.sha }}
          restore-keys: turbo-${{ hashFiles('yarn.lock') }}-

      - run: yarn install --immutable

      - run: yarn type-check

      - run: yarn lint

      - run: yarn build
```

### 프로덕션 배포 워크플로우

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: corepack enable
      - run: yarn install --immutable
      - run: yarn build

      # 변경된 앱만 배포 (Turbo affected 활용)
      - name: Deploy changed apps
        run: yarn turbo run deploy --filter=[HEAD^1]
        env:
          JWT_SECRET: ${{ secrets.JWT_SECRET }}
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
```

---

## 배포 전 체크리스트

```
빌드
- [ ] yarn build 전체 성공
- [ ] yarn type-check 오류 없음
- [ ] yarn lint 오류 없음

환경변수
- [ ] .env.example 최신화
- [ ] 프로덕션 시크릿 CI/CD secrets에 등록
- [ ] NODE_ENV=production 확인

보안
- [ ] .env 파일 gitignore 확인
- [ ] CORS origin 프로덕션 도메인으로 설정
- [ ] JWT_SECRET 충분한 길이(32자 이상) 확인

배포 후
- [ ] 헬스체크 엔드포인트 응답 확인 (GET /health)
- [ ] Swagger 문서 접근 비활성화 (프로덕션)
- [ ] 에러 모니터링 연결 확인
```

---

## 헬스체크 엔드포인트 (NestJS)

```ts
// app.controller.ts
@Get('health')
health() {
  return { status: 'ok', timestamp: new Date().toISOString() };
}
```

프로덕션에서 Swagger 비활성화:

```ts
// main.ts
if (process.env.NODE_ENV !== 'production') {
  const config = new DocumentBuilder().setTitle('API').build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
}
```
