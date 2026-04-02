# 실시간 호가창 (OrderBook)

> **⚠️ 구현 중 AI 사용 금지**

---

## 과제 개요

실시간 WebSocket 데이터를 기반으로 동작하는 **호가창(Order Book)** 과 **주문 패널**을 구현합니다.

금융 거래 UI 특성상 빠른 데이터 업데이트(500ms 주기)에서의 **렌더링 성능**과, 주문 제출 시 **즉각적인 UI 피드백**이 핵심 요구사항입니다.

---

## 참고 자료

| 자료               | 설명                                           |
| ------------------ | ---------------------------------------------- |
| 피그마 디자인      | 호가창, 주문 패널, 계좌 정보 레이아웃 참고     |
| `example-project/` | 기능이 완성된 레퍼런스 구현체 (구조·UX 참고용) |
| API 명세           | 아래 **API 명세** 섹션 참고                    |

> `example-project`의 코드를 그대로 복사하지 말고, 설계 의도와 UX 흐름을 파악하는 용도로만 참고하세요.

---

## 기술 스택

| 영역            | 기술                    |
| --------------- | ----------------------- |
| 프레임워크      | React 19 + TypeScript   |
| 빌드            | Vite                    |
| 스타일링        | Emotion (styled)        |
| 서버 상태       | TanStack React Query v5 |
| 클라이언트 상태 | Jotai                   |
| 폼 검증         | React Hook Form + Zod   |
| 실시간 통신     | socket.io-client        |

---

## API 명세

서버는 `http://localhost:4002` 에서 실행됩니다.
Swagger 문서: `http://localhost:4002/api-docs`

### WebSocket

소켓 연결 엔드포인트: `ws://localhost:4002`

서버가 **500ms 주기**로 모든 클라이언트에 broadcast합니다.

```ts
// 수신 이벤트: 'orderbook'
interface OrderBookLevel {
  price: number;
  quantity: number;
  total: number;
}

interface OrderBookData {
  symbol: string; // 'KOSPI200'
  timestamp: number;
  bids: OrderBookLevel[]; // 매수 호가 10단계 (높은 가격순)
  asks: OrderBookLevel[]; // 매도 호가 10단계 (낮은 가격순)
}
```

### REST

#### `GET /account` — 계좌 잔고 조회

```ts
// Response
{
  cash: number; // 보유 현금 (초기값: 10,000,000)
  stockQuantity: number; // 보유 주식 수량 (초기값: 0)
}
```

#### `POST /orders` — 주문 접수

```ts
// Request Body
{
  symbol: string;            // 'KOSPI200'
  side: 'buy' | 'sell';
  type: 'limit' | 'market';
  price?: number;            // 지정가일 때 필수
  quantity: number;
}

// Response
{
  id: string;
  symbol: string;
  side: 'buy' | 'sell';
  type: 'limit' | 'market';
  price: number;
  quantity: number;
  status: 'accepted';
  createdAt: string;
}
```

#### `GET /orders` — 주문 내역 조회

```ts
// Response: Order[]
```

---

## 구현 플로우

> AI 사용 금지. 아래 순서를 지키세요.

### 1단계 — 요구사항 분석

- 피그마 디자인을 보며 필요한 컴포넌트 목록 도출

헤더 - 제목,코스피,시간
테이블 - 가격,잔량,총액
계좌정보 공통 - 보유현금,보유주식,총평가액
주문 - 버튼, 인풋, 주문총액-매수가능

- API 명세를 읽고 데이터 흐름 파악
- 렌더링 성능 병목이 생길 수 있는 지점 미리 예측

### 2단계 — 아키텍처 설계

- 서버 상태(React Query)와 클라이언트 상태(Jotai)의 경계 결정
  - WebSocket 실시간 데이터 → 어디서 관리할 것인가?
  - 주문 폼 상태 → React Hook Form vs Jotai?
- 컴포넌트 트리 구조 설계 (어떤 컴포넌트가 어떤 상태를 소유할지)
- Zod 스키마 설계 (`schemas/index.ts` 참고)

### 3단계 — 기능 구현

아래 순서로 구현을 권장합니다.

1. **소켓 연결** — `socket.io-client`로 서버에 연결, `orderbook` 이벤트 수신
2. **호가창 UI** — bids/asks 테이블 렌더링, 실시간 업데이트 반영
3. **계좌 정보** — `GET /account` 조회 및 표시
4. **주문 패널** — 매수/매도 폼, 유효성 검증, `POST /orders` 연동
5. **주문 후 상태 반영** — 계좌 잔고 갱신, 토스트 피드백

### 4단계 — 리팩토링

- 뷰와 로직 분리 (커스텀 훅 추출)
- 불필요한 리렌더링 제거 (`memo`, `useCallback` 등 필요 시 적용)
- 성능 측정 후 병목 지점 최적화

### 5단계 — README 작성 (클라이언트)

`apps/orderbook/client/README.md` 에 아래 내용을 작성합니다.

| 항목                     | 내용                                                        |
| ------------------------ | ----------------------------------------------------------- |
| Architecture             | 상태 관리 전략 (서버 상태 vs UI 상태 분리 이유)             |
| Performance Optimization | 500ms 주기 업데이트에서 렌더링 성능을 잡기 위해 시도한 방법 |
| Troubleshooting          | 구현 중 마주친 기술적 한계와 해결 과정                      |
| Self-Evaluation          | 시간이 더 있었다면 보완하고 싶은 점                         |

---

## PR 가이드

```
feat: 호가창 실시간 데이터 수신 구현
feat: 주문 패널 매수/매도 폼 구현
feat: 계좌 잔고 조회 및 주문 후 갱신
refactor: 호가창 커스텀 훅 분리 (useOrderBook)
```

- **커밋**: 기능 단위로 쪼개서 `feat:` / `fix:` / `refactor:` 태그 사용
- **리팩토링 PR**: "기존 코드의 문제점 → 변경 이유 → 개선 결과" 형식으로 기술

---

## 개발 환경 실행

```bash
# 루트에서
yarn dev

# 서버만
cd apps/orderbook/server && yarn dev   # http://localhost:4002

# 클라이언트만
cd apps/orderbook/client && yarn dev   # http://localhost:3002
```

---

## 평가 기준 참고

과제 제출 후 다음 항목으로 평가합니다.

1. **기능 완성도** — 호가창 실시간 업데이트, 주문 제출, 잔고 반영
2. **아키텍처** — 상태 관리 설계의 논리적 일관성
3. **성능** — Lighthouse 점수, 불필요한 리렌더링 여부
4. **코드 품질** — 관심사 분리, 타입 안전성
5. **README** — 구현 의도와 트러블슈팅의 명확한 서술
