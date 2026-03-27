import { Skeleton, Spacing } from '@mono/ui';

export function PageSkeleton() {
  return (
    <div style={{ padding: '20px' }}>
      <Skeleton height={100} borderRadius={12} />
      <Spacing size={3} />
      <Skeleton height={72} borderRadius={12} />
      <Spacing size={2} />
      <Skeleton height={72} borderRadius={12} />
      <Spacing size={2} />
      <Skeleton height={72} borderRadius={12} />
    </div>
  );
}
