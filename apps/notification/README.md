# 실시간 알림 센터 및 피드 시스템 (모바일 웹뷰형)

> **⚠️ 구현 중 AI 사용 금지**

---

## 과제 개요

SSE(Server-Sent Events)를 통해 내려오는 실시간 알림을 **끊김 없이** 사용자에게 전달하고, 읽음 처리/삭제 시 **낙관적 업데이트(Optimistic Update)** 로 슬릭한 UX를 구현하는 것이 목표입니다.

---

## 세부 요구사항

### 1. 실시간 푸시 리스트
SSE 스트림으로 들어오는 알림을 **상단 토스트**와 **알림 리스트 상단**에 즉시 반영합니다.

### 2. 무한 스크롤
`React-Query`의 `useInfiniteQuery`로 과거 알림 내역을 **커서 기반 페이지네이션**으로 불러옵니다.
- 한 페이지: 10개
- 초기 데이터: 50개 (5페이지)

### 3. 낙관적 업데이트 (Optimistic Update)
읽음 처리 / 삭제 시 서버 응답 전 UI를 먼저 변경합니다.
- 서버 실패(5% 확률) 시 이전 상태로 **롤백**

### 4. 애니메이션
`Emotion`의 `keyframes`를 활용해 신규 알림 진입 시 자연스러운 애니메이션을 추가합니다.

---

## 참고 자료

| 자료 | 설명 |
|------|------|
| 피그마 디자인 | 토스트, 알림 리스트, 읽음 상태 UI 참고 |
| `example-project/` | 기능이 완성된 레퍼런스 구현체 (구조·UX 참고용) |
| API 명세 | 아래 **API 명세** 섹션 참고 |

---

## 기술 스택

| 영역 | 기술 |
|------|------|
| 프레임워크 | React 19 + TypeScript |
| 빌드 | Vite |
| 스타일링 | **Emotion** (`keyframes` 애니메이션 필수) |
| 서버 상태 | TanStack React Query v5 (`useInfiniteQuery`) |
| 클라이언트 상태 | Jotai |
| 실시간 | **SSE** (`EventSource` API) |

---

## API 명세

서버는 `http://localhost:4004` 에서 실행됩니다.
Swagger 문서: `http://localhost:4004/api-docs`

---

### `GET /notifications/stream` — SSE 실시간 스트림

```
EventSource 연결 엔드포인트
```

```ts
const es = new EventSource('http://localhost:4004/notifications/stream');

es.onmessage = (event) => {
  const notification: Notification = JSON.parse(event.data);
  // 토스트 표시 + 리스트 상단 추가
};
```

- 서버가 **5~15초 랜덤 주기**로 신규 알림을 push
- 알림 타입: `price_alert` | `execution` | `news` | `system`
- 클라이언트 연결 종료 시 자동으로 재연결 (`EventSource` 기본 동작)

---

### `GET /notifications?cursor=` — 알림 목록 조회

```ts
// Query: cursor?: string (없으면 첫 페이지)

// Response
interface NotificationPage {
  notifications: Notification[];
  nextCursor: string | null; // null이면 마지막 페이지
  hasMore: boolean;
}

interface Notification {
  id: string;
  type: 'price_alert' | 'execution' | 'news' | 'system';
  title: string;
  message: string;
  timestamp: string; // ISO 8601
  isRead: boolean;
  metadata?: {
    stockSymbol?: string;
    price?: number;
    quantity?: number;
    changeRate?: number;
  };
}
```

**`useInfiniteQuery` 연동 예시:**
```ts
useInfiniteQuery({
  queryKey: ['notifications'],
  queryFn: ({ pageParam }) =>
    fetch(`/notifications?cursor=${pageParam ?? ''}`).then(r => r.json()),
  getNextPageParam: (lastPage) => lastPage.nextCursor,
  initialPageParam: undefined,
})
```

---

### `PATCH /notifications/:id/read` — 읽음 처리

```ts
// Response 200: Notification (isRead: true로 업데이트된 객체)
// Response 500: 5% 확률 실패 → 롤백 필요
```

---

### `PATCH /notifications/read-all` — 전체 읽음 처리

```ts
// Response 200: { message: '전체 읽음 처리되었습니다.' }
// Response 500: 5% 확률 실패 → 롤백 필요
```

> ⚠️ `/notifications/:id/read` 와 라우트 충돌 주의 — `read-all`을 먼저 등록하세요.

---

### `DELETE /notifications/:id` — 알림 삭제

```ts
// Response 200: { message: '삭제되었습니다.' }
// Response 500: 5% 확률 실패 → 롤백 필요
```

---

## 구현 플로우

> AI 사용 금지. 아래 순서를 지키세요.

### 1단계 — 요구사항 분석

- SSE 연결 생명주기 관리 위치 결정 (커스텀 훅 / Context / Jotai)
- Optimistic Update 롤백 전략 설계
- `useInfiniteQuery` + SSE 신규 알림 병합 방식 결정

### 2단계 — 아키텍처 설계

**상태 경계:**
```
SSE 실시간 알림 → Jotai (realtimeNotificationsAtom)
                → 토스트 큐 자동 표시
                → useInfiniteQuery 캐시에 prepend

과거 알림 목록  → React Query (useInfiniteQuery)
                → Optimistic Update (markAsRead, delete)
```

**컴포넌트 구조 제안:**
```
NotificationPage
├── NotificationToast          ← SSE 신규 알림 토스트 (5초 자동 닫힘)
├── NotificationHeader         ← 전체 읽음 버튼 + 미읽음 카운트
└── NotificationList (무한스크롤)
    └── NotificationItem       ← 읽음/삭제, Emotion keyframes 애니메이션
```

### 3단계 — 기능 구현

권장 순서:

1. **SSE 훅** — `useNotificationSSE()`: EventSource 연결, Jotai atom에 push
2. **무한 스크롤** — `useInfiniteQuery` + Intersection Observer
3. **토스트** — SSE 수신 시 자동 표시, 5초 후 사라짐
4. **읽음 처리** — Optimistic Update + 실패 시 롤백
5. **삭제** — Optimistic Update + 실패 시 롤백
6. **전체 읽음** — 일괄 처리
7. **Emotion keyframes** — 신규 알림 슬라이드인 애니메이션

### 4단계 — 리팩토링

- SSE 연결/해제 로직 훅으로 분리
- Optimistic Update 패턴 재사용 가능하게 추상화
- 컴포넌트 메모이제이션 (`React.memo`, `useCallback`)

### 5단계 — README 작성

`apps/notification/client/README.md` 에 아래 내용을 작성합니다.

| 항목 | 내용 |
|------|------|
| Architecture | SSE vs WebSocket 선택 이유, 상태 경계 설계 |
| Performance Optimization | 무한 스크롤 최적화, 불필요한 리렌더링 방지 |
| Troubleshooting | SSE CORS 처리, Optimistic Update 롤백 이슈 등 |
| Self-Evaluation | 시간이 더 있었다면 보완하고 싶은 점 |

---

## PR 가이드

```
feat: SSE 실시간 알림 스트림 연결 구현 (useNotificationSSE)
feat: 무한 스크롤 알림 목록 구현 (useInfiniteQuery)
feat: 알림 읽음/삭제 Optimistic Update 구현
feat: Emotion keyframes 알림 진입 애니메이션 추가
feat: 토스트 알림 자동 표시/닫힘 구현
refactor: 알림 상태 관리 Jotai atom 정리
```

---

## 개발 환경 실행

```bash
# 루트에서
yarn dev

# 서버만
cd apps/notification/server && yarn dev   # http://localhost:4004

# 클라이언트만
cd apps/notification/client && yarn dev   # http://localhost:3004
```

---

## 평가 기준 참고

1. **SSE 연결 관리** — 컴포넌트 언마운트 시 연결 해제, 재연결 처리
2. **Optimistic Update** — 실패 롤백이 자연스러운가
3. **무한 스크롤 UX** — 로딩 상태, 끝 도달 처리
4. **애니메이션 품질** — keyframes 활용, 성능에 영향 없는가
5. **상태 동기화** — SSE 신규 알림이 기존 목록과 자연스럽게 합쳐지는가
