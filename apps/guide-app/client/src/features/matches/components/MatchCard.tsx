'use client';

import { colors, Flex, Spacing } from '@mono/ui';
import type { Match } from '../schemas/match.schema';

const STATUS_INFO: Record<string, { label: string; color: string }> = {
  OPEN: { label: '모집중', color: colors.primary },
  MATCHED: { label: '매칭완료', color: '#22c55e' },
  COMPLETED: { label: '종료', color: colors.grey400 },
  CANCELLED: { label: '취소', color: colors.error },
};

type Props = {
  match: Match;
  onPress?: (match: Match) => void;
};

export function MatchCard({ match, onPress }: Props) {
  const statusInfo = STATUS_INFO[match.status] ?? { label: match.status, color: colors.grey500 };
  const date = new Date(match.matchDate);
  const dateStr = `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;

  return (
    <div
      onClick={() => onPress?.(match)}
      style={{
        background: colors.background,
        border: `1px solid ${colors.grey100}`,
        borderRadius: 12,
        padding: '16px',
        cursor: onPress ? 'pointer' : 'default',
      }}
    >
      <Flex justify="space-between" align="flex-start">
        <div style={{ flex: 1 }}>
          <Flex align="center" gap={8}>
            <p style={{ fontSize: 16, fontWeight: 600, color: colors.grey900, margin: 0 }}>
              {match.homeTeam.name}
            </p>
            {match.awayTeam && (
              <>
                <span style={{ fontSize: 14, color: colors.grey400 }}>vs</span>
                <p style={{ fontSize: 16, fontWeight: 600, color: colors.grey900, margin: 0 }}>
                  {match.awayTeam.name}
                </p>
              </>
            )}
            {!match.awayTeam && (
              <span style={{ fontSize: 12, color: colors.grey400 }}>상대팀 모집중</span>
            )}
          </Flex>
          <Spacing size={1} />
          <p style={{ fontSize: 12, color: colors.grey500, margin: 0 }}>
            {dateStr} · {match.location}
          </p>
          {match.note && (
            <p style={{ fontSize: 12, color: colors.grey400, margin: '4px 0 0' }}>
              {match.note}
            </p>
          )}
        </div>
        <span
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: statusInfo.color,
            background: `${statusInfo.color}1a`,
            padding: '4px 8px',
            borderRadius: 6,
            flexShrink: 0,
          }}
        >
          {statusInfo.label}
        </span>
      </Flex>
    </div>
  );
}
