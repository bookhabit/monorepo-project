'use client';

import { Button, colors, Flex, Spacing } from '@mono/ui';

type Props = {
  title: string;
  description?: string;
  action?: { label: string; onClick: () => void };
};

export function EmptyFallback({ title, description, action }: Props) {
  return (
    <Flex direction="column" align="center" style={{ padding: '60px 20px', textAlign: 'center' }}>
      <p style={{ fontSize: 16, fontWeight: 600, color: colors.grey700, margin: 0 }}>{title}</p>
      {description && (
        <>
          <Spacing size={2} />
          <p style={{ fontSize: 14, color: colors.grey500, margin: 0 }}>{description}</p>
        </>
      )}
      {action && (
        <>
          <Spacing size={5} />
          <Button variant="primary" size="medium" onClick={action.onClick}>
            {action.label}
          </Button>
        </>
      )}
    </Flex>
  );
}
