# 예외처리 규칙

## 4가지 상태

모든 비동기 UI는 아래 4가지 상태를 반드시 처리한다.

```
에러 → 로딩 → 빈 데이터 → 정상 데이터
```

---

## 처리 패턴 선택 기준

두 가지 패턴이 있다. 상황에 맞게 선택한다.

| 패턴 | 언제 사용 | 특징 |
| ---- | --------- | ---- |
| **Suspense + ErrorBoundary** | 페이지 단위 전체 로딩/에러 | 선언적, View를 순수하게 유지 |
| **Container isLoading 분기** | 부분 UI, 에러 복구 UX 필요 | 명령적, 세밀한 제어 가능 |

---

## 패턴 A: Suspense + ErrorBoundary (페이지 레벨 권장)

페이지 진입 시 전체 데이터 로딩이 필요한 경우.
View 컴포넌트 내부에 로딩/에러 분기가 없으므로 View를 순수하게 유지할 수 있다.

```tsx
// app/matches/page.tsx
export default function MatchesPage() {
  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      <Suspense fallback={<MatchListSkeleton />}>
        <MatchListContainer />
      </Suspense>
    </ErrorBoundary>
  );
}
```

```tsx
// ErrorFallback — 재시도 버튼 포함
function ErrorFallback({ resetErrorBoundary }: FallbackProps) {
  return (
    <div>
      <p>데이터를 불러오지 못했습니다.</p>
      <Button onClick={resetErrorBoundary}>다시 시도</Button>
    </div>
  );
}
```

```typescript
// Suspense와 연동하려면 throwOnError: true 필요
export function useMatchList(filters: MatchFilters) {
  return useQuery({
    queryKey: matchQueryKeys.list(filters),
    queryFn: () => matchService.getList(filters),
    throwOnError: true, // ErrorBoundary로 에러 전파
  });
}
```

---

## 패턴 B: Container 직접 분기 (부분 UI, 세밀한 제어)

페이지 일부만 로딩되거나, 에러 시 재시도 버튼을 인라인으로 보여줄 때.
또는 Suspense를 적용하기 어려운 중첩 구조일 때.

```tsx
// features/matches/components/MatchListContainer.tsx
export function MatchListContainer() {
  const { data, isLoading, isError, refetch } = useMatchList(filters);

  // 1. 에러
  if (isError) {
    return (
      <div>
        <p>경기 목록을 불러오지 못했습니다.</p>
        <Button onClick={() => refetch()}>다시 시도</Button>
      </div>
    );
  }

  // 2. 로딩
  if (isLoading) return <MatchListSkeleton />;

  // 3. 빈 데이터 → View 내부에서 처리
  // 4. 정상 데이터
  return <MatchListView matches={data ?? []} />;
}
```

---

## Empty 상태 처리

빈 데이터는 View 컴포넌트 내부에서 처리한다.
Container에서 처리하면 View 재사용성이 떨어진다.

```tsx
// features/matches/components/MatchListView.tsx
export function MatchListView({ matches }: { matches: Match[] }) {
  if (matches.length === 0) {
    return <EmptyState message="등록된 경기가 없습니다." />;
  }
  return <ul>{matches.map((m) => <MatchItem key={m.id} match={m} />)}</ul>;
}
```

---

## ApiError 분기 처리

`@mono/shared/api`의 `isApiError`로 서버 도메인 에러를 분기한다.
네트워크 에러와 서버 에러를 구분해 사용자에게 적절한 메시지를 보여준다.

```typescript
import { isApiError, getErrorMessage } from '@mono/shared/api';

useMutation({
  mutationFn: matchService.create,
  onError: (error) => {
    if (isApiError(error)) {
      // 서버가 내려준 도메인 에러
      switch (error.code) {
        case 'MATCH_ALREADY_EXISTS':
          toast.error('이미 해당 시간대에 경기가 있습니다.');
          break;
        case 'NOT_TEAM_CAPTAIN':
          toast.error('주장만 경기를 등록할 수 있습니다.');
          break;
        default:
          toast.error(error.message);
      }
    } else {
      // 네트워크 단절, 타임아웃 등
      toast.error(getErrorMessage(error));
    }
  },
});
```

---

## 폼 서버 에러 반영

뮤테이션 에러를 React Hook Form의 특정 필드에 반영한다.

```typescript
onError: (error) => {
  if (isApiError(error) && error.code === 'EMAIL_ALREADY_EXISTS') {
    form.setError('email', { message: '이미 사용 중인 이메일입니다.' });
  } else {
    // 필드 특정 불가한 서버 에러
    form.setError('root.serverError', { message: getErrorMessage(error) });
  }
}
```

```tsx
// View에서 표시
{errors.root?.serverError && (
  <p role="alert">{errors.root.serverError.message}</p>
)}
```

---

## 예외 상태 (권한/세션)

```tsx
// 권한 없음
if (!hasPermission) return <NoPermission />;

// 인증 필요 → Next.js Middleware에서 처리 (컴포넌트에서 분기 금지)
```
