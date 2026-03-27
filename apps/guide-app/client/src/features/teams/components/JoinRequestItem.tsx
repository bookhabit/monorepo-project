'use client';

import { Button, colors, Flex, Spacing } from '@mono/ui';
import type { JoinRequest } from '../schemas/team.schema';

const POSITION_LABEL: Record<string, string> = { FW: '공격수', MF: '미드필더', DF: '수비수', GK: '골키퍼' };

type Props = {
  request: JoinRequest;
  onAccept: (requestId: string) => void;
  onReject: (requestId: string) => void;
  isPending: boolean;
};

export function JoinRequestItem({ request, onAccept, onReject, isPending }: Props) {
  return (
    <div
      style={{
        background: colors.background,
        border: `1px solid ${colors.grey100}`,
        borderRadius: 12,
        padding: '16px',
      }}
    >
      <Flex justify="space-between" align="center">
        <div>
          <p style={{ fontSize: 16, fontWeight: 600, color: colors.grey900, margin: 0 }}>
            {request.user.nickname}
          </p>
          <Spacing size={1} />
          <p style={{ fontSize: 12, color: colors.grey500, margin: 0 }}>
            {request.user.position ? POSITION_LABEL[request.user.position] : '포지션 미설정'} · 실력 {request.user.skillLevel}
          </p>
          {request.message && (
            <>
              <Spacing size={2} />
              <p style={{ fontSize: 14, color: colors.grey600, margin: 0 }}>
                "{request.message}"
              </p>
            </>
          )}
        </div>
        <Flex gap={8}>
          <Button size="small" variant="secondary" onClick={() => onReject(request.id)} disabled={isPending}>
            거절
          </Button>
          <Button size="small" variant="primary" onClick={() => onAccept(request.id)} disabled={isPending}>
            수락
          </Button>
        </Flex>
      </Flex>
    </div>
  );
}
