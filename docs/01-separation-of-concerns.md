# 관심사 분리 규칙

## 핵심 원칙

각 레이어는 자신의 역할 외의 일을 절대 수행하지 않는다.

| 레이어 | 책임 | 도구 |
| ------ | ---- | ---- |
| Schema | 데이터 구조 정의 + 런타임 검증 | Zod |
| Service | 네트워크 통신만 (순수 함수) | axios (`http`) |
| Data Hook | 서버 상태 관리 (캐싱, 로딩, 에러) | TanStack Query |
| Logic Hook | 비즈니스 로직, 폼 상태 + 뮤테이션 연결 | react-hook-form + custom |
| Container | 상태 분기 → View에 props 전달 | React Component |
| View | props 받아 화면 표현만 | React Component |
| Page | 레이아웃 조립만, 로직 없음 | Next.js page |

## 전체 데이터 흐름

```
[Schema]       — 타입 + 런타임 검증 정의
    ↓
[Service]      — 순수 네트워크 호출 (React 모름)
    ↓
[Data Hook]    — useQuery / useMutation 래핑
    ↓
[Logic Hook]   — 비즈니스 가공 / 폼 연결 (필요 시)
    ↓
[Container]    — 로딩·에러·빈 데이터 분기
    ↓
[View]         — props만 받아 렌더링
```

## 서버 상태 vs 클라이언트 상태

| 구분 | 도구 | 예시 |
| ---- | ---- | ---- |
| 서버 상태 | React Query | 경기 목록, 팀원 명단, 프로필 |
| 전역 UI 상태 | Jotai (atom) | 모달 open/close, 선택된 탭 |
| 복잡한 도메인 상태 | Zustand | 인증 유저 정보 (토큰 포함) |
| 로컬 폼 상태 | react-hook-form | 입력값, 유효성 에러 |

## 디렉토리 구조 규칙

feature-based 구조를 사용한다.
도메인 하나를 삭제할 때 `features/{도메인}/` 폴더 하나만 지운다.

```
src/
  features/
    {도메인}/
      schemas/       # Zod 스키마 + 추출 타입
      services/      # 순수 API 호출 함수
      hooks/
        queries/     # useXxxQuery, useXxxMutation (Data Hook)
        useXxxForm.ts  # 폼 로직 + 뮤테이션 연결 (Logic Hook)
      components/
        {Name}Container.tsx  # 상태 분기, View에 props 전달
        {Name}View.tsx       # 순수 UI (props만 받음)
      stores/        # Jotai atoms / Zustand stores (필요 시)
      types.ts       # 도메인 전용 타입 (Zod 외 추가 타입)
  app/               # Next.js App Router 진입점 (조립만)
  shared/            # 앱 전체 공용 유틸/컴포넌트
```

## Data Hook vs Logic Hook 구분

```typescript
// ✅ Data Hook — useQuery/useMutation 래핑만
// features/matches/hooks/queries/useMatchList.ts
export function useMatchList(filters: MatchFilters) {
  return useQuery({
    queryKey: queryKeys.matches.list(filters),
    queryFn: () => matchService.getList(filters),
  });
}

// ✅ Logic Hook — 비즈니스 가공 또는 폼 + 서버 연결
// features/auth/hooks/useLoginForm.ts
export function useLoginForm() {
  const form = useForm<LoginInput>({ resolver: zodResolver(loginSchema) });
  const { mutate, isPending } = useLoginMutation();
  const onSubmit = form.handleSubmit((data) => mutate(data));
  return { ...form, onSubmit, isPending };
}
```

Logic Hook이 필요 없는 단순 조회 화면은 Data Hook → Container로 바로 연결한다.

## Container / View 분리

```tsx
// ✅ Container — 상태 분기 담당
export function MatchListContainer() {
  const { data, isLoading, isError } = useMatchList(filters);
  if (isLoading) return <MatchListSkeleton />;
  if (isError) return <ErrorFallback />;
  return <MatchListView matches={data ?? []} />;
}

// ✅ View — props만 받아 렌더링, 상태 로직 없음
export function MatchListView({ matches }: { matches: Match[] }) {
  if (matches.length === 0) return <EmptyState message="등록된 경기가 없습니다." />;
  return <ul>{matches.map((m) => <MatchItem key={m.id} match={m} />)}</ul>;
}
```

## 절대 금지 규칙

- 컴포넌트에서 직접 `fetch`/`axios` 호출 금지 → `services/` 경유
- `Service` 내부에서 React Hook 사용 금지 → 순수 TS 함수
- `View` 컴포넌트에서 상태 로직 작성 금지 → Container에서 처리
- Zod 없이 서버 응답 사용 금지 → Schema 검증 필수
- `Page` 컴포넌트는 조립만, 로직 없음
