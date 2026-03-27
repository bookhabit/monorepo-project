'use client';

import { useState } from 'react';
import { Button, colors, Drawer, SearchField, Skeleton, Spacing, TextField, useModal, useToast } from '@mono/ui';
import { isApiError } from '@mono/shared/api';
import { useTeamSearch } from '../hooks/useTeamSearch';
import { useCreateTeamForm } from '../hooks/useCreateTeamForm';
import { useSendJoinRequestMutation } from '../hooks/queries/useTeamQuery';
import { TeamCard } from '../components/TeamCard';
import { EmptyFallback } from '@/shared/components/EmptyFallback';
import { ErrorFallback } from '@/shared/components/ErrorFallback';
import type { Team } from '../schemas/team.schema';

export function TeamSearchContainer() {
  const { query, handleSearch, teams, isLoading, isError } = useTeamSearch();
  const { isOpen: isCreateOpen, open: openCreate, close: closeCreate } = useModal();
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);

  return (
    <div style={{ padding: '16px 20px' }}>
      <SearchField
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        onDeleteClick={() => handleSearch('')}
        placeholder="팀 이름으로 검색"
      />
      <Spacing size={4} />

      <TeamSearchResults
        isLoading={isLoading}
        isError={isError}
        teams={teams}
        onCreateTeam={openCreate}
        onSelectTeam={setSelectedTeam}
      />

      <CreateTeamDrawer isOpen={isCreateOpen} onClose={closeCreate} />
      {selectedTeam && (
        <JoinRequestDrawer team={selectedTeam} onClose={() => setSelectedTeam(null)} />
      )}
    </div>
  );
}

type TeamSearchResultsProps = {
  isLoading: boolean;
  isError: boolean;
  teams: Team[] | undefined;
  onCreateTeam: () => void;
  onSelectTeam: (team: Team) => void;
};

function TeamSearchResults({ isLoading, isError, teams, onCreateTeam, onSelectTeam }: TeamSearchResultsProps) {
  if (isLoading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {[1, 2, 3].map((i) => <Skeleton key={i} height={72} borderRadius={12} />)}
      </div>
    );
  }

  if (isError) {
    return <ErrorFallback message="팀 목록을 불러오지 못했습니다." />;
  }

  const isEmptyTeams = !teams || teams.length === 0;

  if (isEmptyTeams) {
    return (
      <EmptyFallback
        title="팀을 찾을 수 없습니다"
        description="직접 팀을 만들어보세요"
        action={{ label: '팀 만들기', onClick: onCreateTeam }}
      />
    );
  }

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {teams.map((team) => (
          <TeamCard key={team.id} team={team} onPress={onSelectTeam} />
        ))}
      </div>
      <Spacing size={5} />
      <Button variant="secondary" size="medium" fullWidth onClick={onCreateTeam}>
        팀 만들기
      </Button>
    </>
  );
}

function CreateTeamDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { form, isPending, handleSubmit } = useCreateTeamForm(onClose);
  const { register, formState: { errors } } = form;

  return (
    <Drawer isOpen={isOpen} onClose={onClose} title="팀 만들기">
      <div style={{ padding: '0 20px 20px' }}>
        <TextField
          title="팀 이름 *"
          placeholder="팀 이름을 입력하세요"
          {...register('name')}
          errorMessage={errors.name?.message}
        />
        <Spacing size={4} />
        <TextField
          title="팀 소개"
          placeholder="팀을 소개해주세요 (선택)"
          {...register('description')}
          errorMessage={errors.description?.message}
        />
        <Spacing size={4} />
        <TextField
          title="로고 URL"
          placeholder="https://... (선택)"
          {...register('logoUrl')}
          errorMessage={errors.logoUrl?.message}
        />
        <Spacing size={6} />
        <Button variant="primary" size="large" fullWidth onClick={handleSubmit} loading={isPending} disabled={isPending}>
          팀 만들기
        </Button>
      </div>
    </Drawer>
  );
}

function JoinRequestDrawer({ team, onClose }: { team: Team; onClose: () => void }) {
  const [message, setMessage] = useState('');
  const { mutate: sendRequest, isPending } = useSendJoinRequestMutation(team.id);
  const { toast } = useToast();

  const handleSend = () => {
    sendRequest(
      { ...(message ? { message } : {}) },
      {
        onSuccess: () => {
          toast.success('가입 신청을 보냈습니다.');
          onClose();
        },
        onError: (error) => {
          if (isApiError(error)) toast.error(error.message);
        },
      },
    );
  };

  return (
    <Drawer isOpen onClose={onClose} title={`${team.name}에 가입 신청`}>
      <div style={{ padding: '0 20px 20px' }}>
        <p style={{ fontSize: 14, color: colors.grey600, margin: '0 0 16px' }}>
          팀원 {team._count?.members ?? 0}명
          {team.description && ` · ${team.description}`}
        </p>
        <TextField
          title="가입 메시지"
          placeholder="자기소개 또는 메시지 (선택)"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Spacing size={6} />
        <Button variant="primary" size="large" fullWidth onClick={handleSend} loading={isPending} disabled={isPending}>
          가입 신청
        </Button>
      </div>
    </Drawer>
  );
}
