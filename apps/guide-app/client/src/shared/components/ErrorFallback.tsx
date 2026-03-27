'use client';

import { Button, colors, Flex, Spacing } from '@mono/ui';

type Props = {
  message?: string;
  onReset?: () => void;
};

export function ErrorFallback({ message = '데이터를 불러오지 못했습니다.', onReset }: Props) {
  return (
    <Flex direction="column" align="center" style={{ padding: '60px 20px', textAlign: 'center' }}>
      <p style={{ fontSize: 16, fontWeight: 600, color: colors.grey700, margin: 0 }}>{message}</p>
      {onReset && (
        <>
          <Spacing size={4} />
          <Button variant="secondary" size="medium" onClick={onReset}>
            다시 시도
          </Button>
        </>
      )}
    </Flex>
  );
}
