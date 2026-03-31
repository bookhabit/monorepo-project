# 인터랙티브 보유 자산 분석 대시보드 (모바일 웹뷰형)

> **⚠️ 구현 중 AI 사용 금지**

---

## 과제 개요

데스크탑 환경에서 많은 양의 자산 데이터를 한눈에 보여주는 **인터랙티브 대시보드**를 구현합니다.

`Vanilla-extract`를 활용해 **제로 런타임 CSS**의 이점을 살리고, 복잡한 차트 데이터 처리에 따른 **렌더링 성능 병목**을 해결하는 것이 핵심 목표입니다.

---

## 세부 요구사항

### 1. 자산 비중 차트
보유 종목별 비중(`weight`)을 **도넛 차트** 또는 **트리맵**으로 시각화합니다.

### 2. 기간별 수익률 전환
1일 / 1주 / 1개월 탭 클릭 시 `React-Query`로 데이터를 fetch하고 캐싱 처리합니다.
- 탭 전환 시 이미 fetch된 기간은 캐시에서 즉시 반환 (네트워크 요청 없음)

### 3. 고성능 테이블
보유 종목 리스트에 정렬 기능을 구현합니다.
- 정렬 기준: 수익률순, 평가금액순
- 데이터가 많아질 경우를 대비해 **가상 리스트(Virtual List)** 도입 고려

### 4. 테마 대응
`Vanilla-extract`의 `createTheme` / `createThemeContract`를 이용해 시스템 설정에 따른 **다크/라이트 모드**를 완벽히 구현합니다.

---

## 참고 자료

| 자료 | 설명 |
|------|------|
| 피그마 디자인 | 차트, 테이블, 테마 레이아웃 참고 |
| `example-project/` | 기능이 완성된 레퍼런스 구현체 (구조·UX 참고용) |
| API 명세 | 아래 **API 명세** 섹션 참고 |

---

## 기술 스택

| 영역 | 기술 |
|------|------|
| 프레임워크 | React 19 + TypeScript |
| 빌드 | Vite |
| 스타일링 | **Vanilla-extract** (제로 런타임 CSS) |
| 서버 상태 | TanStack React Query v5 |
| 클라이언트 상태 | Jotai |
| 차트 | 자유 선택 (Recharts / D3 / Victory 등) |

> `@emotion/styled`는 이미 설치되어 있으나 이 과제에서는 **Vanilla-extract 사용이 필수**입니다.

---

## API 명세

서버는 `http://localhost:4003` 에서 실행됩니다.
Swagger 문서: `http://localhost:4003/api-docs`

### `GET /assets` — 보유 종목 목록

```ts
// Response: AssetItem[]
interface AssetItem {
  id: string;
  symbol: string;       // 'AAPL', 'MSFT', ...
  name: string;
  quantity: number;     // 보유 수량
  avgPrice: number;     // 평균 매입가 (원)
  currentPrice: number; // 현재가 (원)
  value: number;        // 평가금액
  profit: number;       // 수익금 (음수 가능)
  profitRate: number;   // 수익률 % (음수 가능)
  weight: number;       // 포트폴리오 비중 %
}
```

### `GET /assets/summary` — 총 자산 요약

```ts
// Response
interface AssetSummary {
  totalValue: number;      // 총평가금액 (주식 + 현금)
  totalProfit: number;     // 총수익금
  totalProfitRate: number; // 총수익률 %
  cash: number;            // 보유 현금
  stockValue: number;      // 주식 평가금액
}
```

### `GET /performance?period=1D|1W|1M` — 기간별 수익률 데이터

```ts
// Query: period = '1D' | '1W' | '1M'
// Response: PerformanceData[]
interface PerformanceData {
  date: string;   // 1D: "오전 09:00", 1W/1M: "3월 15일"
  value: number;  // 해당 시점 평가금액
  profit: number; // 해당 시점 수익금 (기준 대비)
}

// 데이터 포인트 수
// 1D: 25개 (1시간 간격)
// 1W: 8개  (1일 간격)
// 1M: 31개 (1일 간격)
```

---

## 구현 플로우

> AI 사용 금지. 아래 순서를 지키세요.

### 1단계 — 요구사항 분석

- 피그마 디자인을 보며 필요한 컴포넌트 목록 도출
- `Vanilla-extract` 테마 계약(`createThemeContract`) 구조 설계
- 차트 라이브러리 선택 및 도넛/트리맵 구현 방식 결정
- 가상 리스트 도입 기준 결정 (몇 건 이상부터?)

### 2단계 — 아키텍처 설계

- `Vanilla-extract` 테마 파일 구조 설계
  ```
  src/styles/
  ├── theme.css.ts       ← createThemeContract
  ├── light.css.ts       ← createTheme (light)
  └── dark.css.ts        ← createTheme (dark)
  ```
- 서버 상태(React Query)와 클라이언트 상태(Jotai) 경계 결정
  - 자산 목록, 수익률 데이터 → React Query
  - 정렬 기준, 선택된 기간 탭 → Jotai or local state
- 컴포넌트 트리 구조 설계

### 3단계 — 기능 구현

권장 구현 순서:

1. **Vanilla-extract 테마 셋업** — 다크/라이트 변수 계약 정의
2. **자산 요약 카드** — `GET /assets/summary` 연동
3. **기간별 수익률 차트** — `GET /performance?period=` + React Query 캐싱
4. **자산 비중 차트** — `GET /assets`의 `weight` 필드로 도넛/트리맵
5. **보유 종목 테이블** — 정렬 기능 + (선택) 가상 리스트

### 4단계 — 리팩토링

- 뷰와 로직 분리 (커스텀 훅 추출)
- 차트 데이터 가공 로직 메모이제이션 (`useMemo`)
- Vanilla-extract 스타일 정리 및 토큰화

### 5단계 — README 작성

`apps/dashboard/client/README.md` 에 아래 내용을 작성합니다.

| 항목 | 내용 |
|------|------|
| Architecture | Vanilla-extract 테마 구조, 상태 관리 전략 |
| Performance Optimization | 차트 데이터 메모이제이션, 가상 리스트 적용 여부와 이유 |
| Troubleshooting | Vanilla-extract 빌드 설정, 차트 렌더링 이슈 등 |
| Self-Evaluation | 시간이 더 있었다면 보완하고 싶은 점 |

---

## PR 가이드

```
feat: Vanilla-extract 테마 시스템 구축 (다크/라이트)
feat: 기간별 수익률 차트 구현 (React Query 캐싱)
feat: 자산 비중 도넛/트리맵 차트 구현
feat: 보유 종목 테이블 정렬 기능 구현
refactor: 차트 데이터 훅 분리 및 메모이제이션
```

- **커밋**: 기능 단위로 `feat:` / `fix:` / `refactor:` 태그 사용
- **리팩토링 PR**: 변경 전/후 렌더링 성능 지표 함께 첨부

---

## 개발 환경 실행

```bash
# 루트에서
yarn dev

# 서버만
cd apps/dashboard/server && yarn dev   # http://localhost:4003

# 클라이언트만
cd apps/dashboard/client && yarn dev   # http://localhost:3003
```

---

## 평가 기준 참고

1. **Vanilla-extract 활용도** — 제로 런타임 CSS 이점을 실제로 살렸는가
2. **React Query 캐싱 전략** — 탭 전환 시 불필요한 네트워크 요청 없는가
3. **렌더링 성능** — 차트/테이블에서 병목 없는가 (Lighthouse, React DevTools)
4. **테마 완성도** — 시스템 설정 연동, 모든 컴포넌트에 다크/라이트 적용
5. **코드 품질** — 관심사 분리, 타입 안전성
