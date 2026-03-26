# 예외처리 규칙

## 4가지 예외 케이스

### 1. 로딩 (Loading)

```tsx
// Suspense + Skeleton 패턴
<Suspense fallback={<LoanListSkeleton />}>
  <LoanList />
</Suspense>
```

### 2. 에러 (Error)

```tsx
// ErrorBoundary + 재시도 패턴
<ErrorBoundary fallback={<ErrorFallback />}>
  <Suspense fallback={<Skeleton />}>
    <LoanList />
  </Suspense>
</ErrorBoundary>
```

```tsx
function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div>
      <p>데이터를 불러오지 못했습니다.</p>
      <Button onClick={resetErrorBoundary}>다시 시도</Button>
    </div>
  );
}
```

### 3. Empty (데이터 없음)

```tsx
// 컴포넌트 내부에서 처리
function LoanList({ items }: { items: LoanApplication[] }) {
  if (items.length === 0) {
    return <EmptyState message="심사할 대출 건이 없습니다." />;
  }
  return <>{items.map(...)}</>;
}
```

### 4. 예외 상태 (특수 케이스)

```tsx
// 권한 없음, 만료된 세션 등
if (!hasPermission) {
  return <NoPermission />;
}
```

## React Query + Suspense 연동

```typescript
// throwOnError: true 설정 시 ErrorBoundary가 자동으로 잡음
useQuery({
  queryKey: [...],
  queryFn: fetchData,
  throwOnError: true,  // ErrorBoundary로 에러 전파
});
```

## 우선순위

```
에러 → 로딩 → 빈 데이터 → 정상 데이터
```
