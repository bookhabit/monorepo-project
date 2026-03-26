# 관심사 분리 규칙

## 핵심 원칙

뷰(View), 서버 상태(Server State), 클라이언트 상태(Client State)를 명확히 분리합니다.

```
Component (View)
    ↓ 읽기
useXxxQuery (Server State - React Query)
useXxxStore (Client State - Jotai/Zustand)
    ↓ 호출
api/xxx.ts (API Layer)
```

## 서버 상태 vs 클라이언트 상태

| 구분               | 도구            | 예시                             |
| ------------------ | --------------- | -------------------------------- |
| 서버 상태          | React Query     | 호가 데이터, 대출 목록, 알림     |
| 전역 UI 상태       | Jotai (atom)    | 모달 open/close, 선택된 탭       |
| 복잡한 도메인 상태 | Zustand         | Drawer 선택 고객, RBAC 유저 정보 |
| 로컬 폼 상태       | react-hook-form | 입력값, 유효성 에러              |

## 디렉토리 구조 규칙

```
src/
  features/
    {도메인}/
      components/    # 순수 뷰 컴포넌트 (props만 받음)
      hooks/         # 비즈니스 로직 (useQuery, 상태, 계산)
      api/           # API 호출 함수
      stores/        # Jotai atoms / Zustand stores
      types.ts       # 해당 도메인 타입
  pages/             # 라우트 진입점 (조립만)
  shared/            # 앱 전체 공용 유틸/컴포넌트
```

## 규칙

- 컴포넌트에서 직접 `fetch`/`axios` 호출 금지 → `api/` 레이어 경유
- 컴포넌트에서 직접 `useAtom`/`useStore` 남용 금지 → `hooks/`로 래핑
- `Page` 컴포넌트는 조립만, 로직 없음
