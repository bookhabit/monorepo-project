'use client';

import { useState } from 'react';
import { Button, colors, Drawer, Spacing, TextField, useModal, useToast } from '@mono/ui';
import { isApiError } from '@mono/shared/api';
import { useOpenMatchesQuery, useApplyMatchMutation } from '../hooks/queries/useMatchQuery';
import { useCreateMatchForm } from '../hooks/useCreateMatchForm';
import { MatchCard } from '../components/MatchCard';
import { EmptyFallback } from '@/shared/components/EmptyFallback';
import type { Match } from '../schemas/match.schema';

export function OpenMatchesContainer() {
  const { data: matches = [] } = useOpenMatchesQuery();
  const { isOpen: isCreateOpen, open: openCreate, close: closeCreate } = useModal();
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);

  const hasNoMatches = matches.length === 0;

  return (
    <div style={{ padding: '16px 20px' }}>
      {hasNoMatches && (
        <EmptyFallback
          title="모집 중인 경기가 없습니다"
          description="팀 캡틴이라면 경기를 등록해보세요"
        />
      )}

      {!hasNoMatches && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {matches.map((match) => (
            <MatchCard key={match.id} match={match} onPress={setSelectedMatch} />
          ))}
        </div>
      )}

      <Spacing size={5} />
      <Button variant="secondary" size="medium" fullWidth onClick={openCreate}>
        경기 등록
      </Button>

      <CreateMatchDrawer isOpen={isCreateOpen} onClose={closeCreate} />
      {selectedMatch && (
        <ApplyMatchDrawer match={selectedMatch} onClose={() => setSelectedMatch(null)} />
      )}
    </div>
  );
}

function CreateMatchDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { form, isPending, handleSubmit } = useCreateMatchForm(onClose);
  const { register, formState: { errors } } = form;

  return (
    <Drawer isOpen={isOpen} onClose={onClose} title="경기 등록">
      <div style={{ padding: '0 20px 20px' }}>
        <TextField
          title="경기 날짜/시간 *"
          type="datetime-local"
          {...register('matchDate')}
          errorMessage={errors.matchDate?.message}
        />
        <Spacing size={4} />
        <TextField
          title="장소 *"
          placeholder="경기 장소를 입력하세요"
          {...register('location')}
          errorMessage={errors.location?.message}
        />
        <Spacing size={4} />
        <TextField
          title="메모"
          placeholder="추가 안내 사항 (선택)"
          {...register('note')}
          errorMessage={errors.note?.message}
        />
        <Spacing size={6} />
        <Button variant="primary" size="large" fullWidth onClick={handleSubmit} loading={isPending} disabled={isPending}>
          경기 등록
        </Button>
      </div>
    </Drawer>
  );
}

function ApplyMatchDrawer({ match, onClose }: { match: Match; onClose: () => void }) {
  const { mutate: apply, isPending } = useApplyMatchMutation();
  const { toast } = useToast();

  const date = new Date(match.matchDate);
  const dateStr = `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;

  const handleApply = () => {
    apply(match.id, {
      onSuccess: () => {
        toast.success('경기 신청이 완료되었습니다.');
        onClose();
      },
      onError: (error) => {
        if (isApiError(error)) toast.error(error.message);
      },
    });
  };

  return (
    <Drawer isOpen onClose={onClose} title="경기 신청">
      <div style={{ padding: '0 20px 20px' }}>
        <div style={{ background: colors.grey50, borderRadius: 12, padding: '16px', marginBottom: 24 }}>
          <p style={{ fontSize: 16, fontWeight: 600, color: colors.grey900, margin: '0 0 8px' }}>{match.homeTeam.name}</p>
          <p style={{ fontSize: 14, color: colors.grey600, margin: '0 0 4px' }}>{dateStr}</p>
          <p style={{ fontSize: 14, color: colors.grey600, margin: 0 }}>{match.location}</p>
          {match.note && <p style={{ fontSize: 12, color: colors.grey400, margin: '8px 0 0' }}>{match.note}</p>}
        </div>
        <Button variant="primary" size="large" fullWidth onClick={handleApply} loading={isPending} disabled={isPending}>
          신청하기
        </Button>
      </div>
    </Drawer>
  );
}
