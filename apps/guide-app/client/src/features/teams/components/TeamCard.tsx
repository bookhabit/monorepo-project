'use client';

import { colors, Flex, Spacing } from '@mono/ui';
import type { Team } from '../schemas/team.schema';

type Props = {
  team: Team;
  onPress?: (team: Team) => void;
};

export function TeamCard({ team, onPress }: Props) {
  return (
    <div
      onClick={() => onPress?.(team)}
      style={{
        background: colors.background,
        border: `1px solid ${colors.grey100}`,
        borderRadius: 12,
        padding: '16px',
        cursor: onPress ? 'pointer' : 'default',
      }}
    >
      <Flex align="center" gap={12}>
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: '50%',
            background: colors.grey100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 20,
            flexShrink: 0,
          }}
        >
          {team.logoUrl ? (
            <img src={team.logoUrl} alt={team.name} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
          ) : (
            '⚽'
          )}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontSize: 16, fontWeight: 600, color: colors.grey900, margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {team.name}
          </p>
          {team.description && (
            <>
              <Spacing size={1} />
              <p style={{ fontSize: 12, fontWeight: 400, color: colors.grey500, margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {team.description}
              </p>
            </>
          )}
        </div>
        {team._count && (
          <span style={{ fontSize: 12, color: colors.grey400, flexShrink: 0 }}>
            {team._count.members}명
          </span>
        )}
      </Flex>
    </div>
  );
}
