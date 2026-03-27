'use client';

import { useState } from 'react';
import { Button, ConfirmDialog, Spacing, useToast } from '@mono/ui';
import { isApiError } from '@mono/shared/api';
import { useMyTeamMatchesQuery, useCancelMatchMutation } from '../hooks/queries/useMatchQuery';
import { MatchCard } from '../components/MatchCard';
import { EmptyFallback } from '@/shared/components/EmptyFallback';
import type { Match } from '../schemas/match.schema';

export function MyTeamMatchesContainer() {
  const { data: matches = [] } = useMyTeamMatchesQuery();
  const [cancelTarget, setCancelTarget] = useState<Match | null>(null);
  const { mutate: cancel } = useCancelMatchMutation();
  const { toast } = useToast();

  const handleCancel = () => {
    if (!cancelTarget) return;
    cancel(cancelTarget.id, {
      onSuccess: () => toast.success('경기가 취소되었습니다.'),
      onError: (error) => {
        if (isApiError(error)) toast.error(error.message);
      },
    });
    setCancelTarget(null);
  };

  const hasNoMatches = matches.length === 0;

  if (hasNoMatches) {
    return (
      <EmptyFallback
        title="예정된 경기가 없습니다"
        description="경기 찾기 탭에서 경기를 신청해보세요"
      />
    );
  }

  return (
    <div style={{ padding: '16px 20px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {matches.map((match) => {
          const isCancellable = match.status === 'OPEN' || match.status === 'MATCHED';

          return (
            <div key={match.id}>
              <MatchCard match={match} />
              {isCancellable && (
                <>
                  <Spacing size={1} />
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button variant="secondary" size="small" onClick={() => setCancelTarget(match)}>
                      취소
                    </Button>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>

      <ConfirmDialog
        isOpen={!!cancelTarget}
        onCancel={() => setCancelTarget(null)}
        onConfirm={handleCancel}
        title="경기 취소"
        description="정말 경기를 취소하시겠습니까?"
        confirmLabel="취소하기"
        cancelLabel="닫기"
      />
    </div>
  );
}
