# 인증 / 인가 아키텍처

## 핵심 설계 원칙

> **"가장 안전한 위치에, 가장 적절한 토큰을 배치"**
> AT는 메모리에 (XSS 방어), RT는 httpOnly 쿠키에 (XSS + CSRF 동시 방어)

---

## 토큰 배치 전략

| 구분 | Access Token (AT) | Refresh Token (RT) |
|------|-------------------|-------------------|
| 저장 위치 | 클라이언트 메모리 (Zustand, persist 없음) | Browser httpOnly Cookie |
| 수명 | 짧음 (15분) | 길음 (7일) |
| 역할 | API 요청 헤더에 수동 주입 | AT 만료 시 갱신 전용 |
| 전송 방식 | `Authorization: Bearer {AT}` (수동) | Cookie 헤더 자동 포함 (브라우저) |
| JS 접근 | ✅ 가능 (메모리) | ❌ 불가 (httpOnly) |

---

## 인증 흐름

### 로그인

```
클라이언트                        서버
  │                                │
  ├─ POST /sessions (email+pw) ───►│
  │                                ├─ bcrypt.compare() — 타이밍 공격 방지
  │                                ├─ JWT AT 발급 (15m)
  │                                ├─ JWT RT 발급 (7d)
  │                                ├─ SHA256(RT) → DB upsert (1인 1세션)
  │◄─ { accessToken } ────────────┤
  │◄─ Set-Cookie: RT (httpOnly) ──┤
  │                                │
  ├─ AT → Zustand 메모리 저장       │
  └─ RT → 쿠키에 자동 저장 (브라우저)│
```

### 인증된 API 요청

```
클라이언트                        서버
  │                                │
  ├─ GET /users/me                 │
  │  Authorization: Bearer {AT} ──►│
  │                                ├─ JwtStrategy: JWT 서명 검증 (Stateless)
  │                                ├─ user 존재 확인 (DB 1회 조회)
  │◄─ 200 { user data } ──────────┤
```

### Silent Refresh (AT 만료 시 자동 처리)

```
클라이언트                        서버
  │                                │
  ├─ API 요청 → 401 응답            │
  │                                │
  ├─ POST /sessions/refresh ──────►│
  │  Cookie: guide_app_rt={RT}     ├─ RT 쿠키 파싱
  │  (자동 전송)                    ├─ JWT 서명 검증
  │                                ├─ DB에서 세션 조회
  │                                ├─ SHA256(RT) == DB hash 비교
  │                                ├─ Rotation: 새 RT 발급 + DB 갱신
  │◄─ { accessToken: 새 AT } ─────┤
  │◄─ Set-Cookie: 새 RT ──────────┤
  │                                │
  ├─ 새 AT → Zustand 업데이트       │
  └─ 실패한 원래 요청 재시도         │
```

### 로그아웃

```
클라이언트                        서버
  │                                │
  ├─ DELETE /sessions ────────────►│
  │  Authorization: Bearer {AT}    ├─ DB 세션 삭제
  │                                ├─ res.clearCookie(RT 쿠키)
  │◄─ 204 No Content ─────────────┤
  │                                │
  └─ Zustand clearAuth()           │
```

---

## 보안 설계

### XSS 방어

```
공격자가 악성 JS 실행 시:
  - document.cookie → httpOnly라 RT 접근 불가
  - localStorage/sessionStorage → persist 제거로 AT 없음
  - Zustand 메모리 → 탈취 불가 (메모리 접근 = 코드 실행 = XSS 이미 성공한 시점)

∴ 토큰 탈취 경로 차단
```

### CSRF 방어

```
낚시 사이트에서 서버로 요청 시:
  - 쿠키(RT)는 SameSite=Strict으로 외부 도메인 전송 차단
  - 설령 전달돼도 /refresh만 가능 (비즈니스 API에는 AT가 필요)
  - AT는 메모리 → 낚시 사이트에서 가져올 수 없음

∴ 의미 있는 공격 불가
```

### Refresh Token Rotation (RTR)

```
/refresh 호출 시마다 RT 교체:
  OLD_RT → 새 AT + 새 RT 발급 + DB 갱신

이전 RT 재사용 감지:
  DB에 새 RT hash가 있는데 이전 RT로 접근
  → 해시 불일치 감지
  → 세션 즉시 삭제
  → TOKEN_REUSE_DETECTED 에러
  → 사용자 강제 로그아웃 (공격자 + 원래 사용자 모두)
```

### Stateless vs 강제 로그아웃

```
현재 구조: Stateless AT 검증 (DB 조회 없음)
  → AT 수명(15분) 동안은 서버가 무효화 불가
  → 허용 가능한 트레이드오프 (수명이 짧음)

강제 즉시 무효화가 필요한 경우:
  1. Blacklist 방식: Redis에 무효 AT JTI 저장 → JwtStrategy에서 확인
  2. 세션 기반: 모든 요청에 DB 세션 확인 (Stateful, 확장성 감소)
  가이드앱은 1번 Redis Blacklist 방식 권장 (필요 시 추가)
```

---

## 서버 구현 (NestJS)

### Guard 전략: Whitelist Default

```typescript
// APP_GUARD로 전역 등록 — 모든 라우트 기본 "인증 필요"
// 신규 엔드포인트 인증 누락 사고 방지

// 인증 불필요한 라우트만 명시적으로 해제
@Public()
@Post()
async login() { ... }
```

### ValidationPipe 설정

```typescript
app.useGlobalPipes(new ValidationPipe({
  whitelist: true,            // DTO에 없는 필드 자동 제거
  forbidNonWhitelisted: true, // 없는 필드 있으면 400 에러
  transform: true,            // 타입 자동 변환 (string → number 등)
}));
```

### httpOnly Cookie 설정

```typescript
const RT_COOKIE_OPTIONS = {
  httpOnly: true,          // JS 접근 불가 (XSS 방어)
  sameSite: 'strict',      // 외부 도메인 전송 차단 (CSRF 방어)
  secure: NODE_ENV === 'production', // HTTPS에서만 전송
  path: '/',               // 모든 경로 접근 가능
  maxAge: 7 * 24 * 60 * 60 * 1000,  // 7일
};
```

---

## 클라이언트 구현 (Next.js)

### Middleware: Protected Routes

```typescript
// src/middleware.ts
// Edge Runtime에서 httpOnly 쿠키 유무로 인증 상태 판단
const hasRefreshToken = request.cookies.has('guide_app_rt');

if (!hasRefreshToken) {
  return NextResponse.redirect(new URL('/login', request.url));
}
```

### Silent Refresh: 페이지 진입 시 AT 복원

```typescript
// AuthInitializer — layout.tsx에 마운트
// AT는 메모리에만 있어 새로고침 시 소멸
// RT 쿠키로 /refresh 호출 → 새 AT 메모리에 저장
useEffect(() => {
  authService.refresh()
    .then(({ accessToken }) => setAccessToken(accessToken))
    .catch(() => { /* RT 없으면 무시, Middleware가 차단 */ });
}, []);
```

### Axios withCredentials

```typescript
createApiClient({
  withCredentials: true,  // cross-origin 요청에도 쿠키 전송
  // ...
});
```

---

## 폴더 구조

```
features/auth/
  schemas/
    auth.schema.ts        # Zod 스키마 + 타입 추출
  services/
    auth.service.ts       # 순수 API 호출 (React 없음)
  stores/
    useAuthStore.ts       # AT 메모리 상태 (Zustand)
  hooks/
    queries/
      useAuthMutation.ts  # Data Hook (useMutation 래핑)
    useLoginForm.ts       # Logic Hook (폼 + 뮤테이션)
    useSignupForm.ts
  components/
    LoginFormContainer.tsx  # Logic Hook → View 연결
    LoginFormView.tsx       # 순수 UI (props만)
    SignupFormContainer.tsx
    SignupFormView.tsx
```

---

## 환경별 쿠키 설정 주의사항

| 환경 | Secure | SameSite | HTTPS |
|------|--------|----------|-------|
| 개발 | false | Strict | 불필요 |
| 프로덕션 | true | Strict | 필수 |

CORS 설정 시 `credentials: true` + `origin` 와일드카드 금지:
```typescript
app.enableCors({
  origin: 'https://your-domain.com', // * 금지
  credentials: true,
});
```
