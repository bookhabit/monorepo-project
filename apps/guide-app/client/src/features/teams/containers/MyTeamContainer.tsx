'use client';

import { Button, colors, ConfirmDialog, Flex, Spacing, useModal, useToast } from '@mono/ui';
import { isApiError } from '@mono/shared/api';
import {
  useMyTeamQuery,
  useJoinRequestsQuery,
  useRespondJoinRequestMutation,
  useLeaveTeamMutation,
} from '../hooks/queries/useTeamQuery';
import { JoinRequestItem } from '../components/JoinRequestItem';
import { EmptyFallback } from '@/shared/components/EmptyFallback';
import type { MyTeam } from '../schemas/team.schema';

const POSITION_LABEL: Record<string, string> = { FW: '공격수', MF: '미드필더', DF: '수비수', GK: '골키퍼' };

export function MyTeamContainer() {
  const { data: myTeam } = useMyTeamQuery();

  if (!myTeam) {
    return (
      <EmptyFallback
        title="소속 팀이 없습니다"
        description="팀 찾기 탭에서 팀에 가입하거나 새 팀을 만드세요"
      />
    );
  }

  return <MyTeamView myTeam={myTeam} />;
}

function MyTeamView({ myTeam }: { myTeam: NonNullable<MyTeam> }) {
  const isCaptain = myTeam.role === 'CAPTAIN';
  const { data: joinRequests } = useJoinRequestsQuery(isCaptain ? myTeam.team.id : '');
  const { mutate: respond, isPending: isResponding } = useRespondJoinRequestMutation(myTeam.team.id);
  const { mutate: leave, isPending: isLeaving } = useLeaveTeamMutation(myTeam.team.id);
  const { toast } = useToast();
  const { isOpen, open, close } = useModal();

  const hasPendingJoinRequests = isCaptain && !!joinRequests?.length;

  const handleRespond = (requestId: string, status: 'ACCEPTED' | 'REJECTED') => {
    respond(
      { requestId, status },
      {
        onSuccess: () => toast.success(status === 'ACCEPTED' ? '수락했습니다.' : '거절했습니다.'),
        onError: (error) => {
          if (isApiError(error)) toast.error(error.message);
        },
      },
    );
  };

  const handleLeave = () => {
    leave(undefined, {
      onSuccess: () => toast.success('팀을 탈퇴했습니다.'),
      onError: (error) => {
        if (isApiError(error)) toast.error(error.message);
      },
    });
    close();
  };

  return (
    <div style={{ padding: '20px' }}>
      {/* 팀 정보 */}
      <div
        style={{
          background: colors.background,
          border: `1px solid ${colors.grey100}`,
          borderRadius: 12,
          padding: '20px',
        }}
      >
        <Flex align="center" gap={12}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: '50%',
              background: colors.grey100,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 24,
              flexShrink: 0,
            }}
          >
            ⚽
          </div>
          <div>
            <p style={{ fontSize: 18, fontWeight: 700, color: colors.grey900, margin: 0 }}>{myTeam.team.name}</p>
            {myTeam.team.description && (
              <p style={{ fontSize: 12, color: colors.grey500, margin: '4px 0 0' }}>{myTeam.team.description}</p>
            )}
            <p style={{ fontSize: 12, color: colors.primary, margin: '4px 0 0' }}>
              {isCaptain ? '캡틴' : '멤버'} · {myTeam.team.members.length}명
            </p>
          </div>
        </Flex>
      </div>

      <Spacing size={5} />

      {/* 팀원 목록 */}
      <p style={{ fontSize: 16, fontWeight: 600, color: colors.grey800, margin: '0 0 12px' }}>팀원</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {myTeam.team.members.map((member) => {
          const isMemberCaptain = member.role === 'CAPTAIN';
          const positionLabel = member.user.position ? POSITION_LABEL[member.user.position] : '포지션 미설정';

          return (
            <div
              key={member.user.id}
              style={{
                background: colors.background,
                border: `1px solid ${colors.grey100}`,
                borderRadius: 10,
                padding: '12px 16px',
              }}
            >
              <Flex justify="space-between" align="center">
                <div>
                  <p style={{ fontSize: 14, fontWeight: 600, color: colors.grey900, margin: 0 }}>
                    {member.user.nickname}
                    {isMemberCaptain && (
                      <span style={{ fontSize: 12, color: colors.primary, marginLeft: 6 }}>캡틴</span>
                    )}
                  </p>
                  <p style={{ fontSize: 12, color: colors.grey500, margin: '2px 0 0' }}>
                    {positionLabel} · 실력 {member.user.skillLevel}
                  </p>
                </div>
              </Flex>
            </div>
          );
        })}
      </div>

      {/* 가입 신청 목록 (캡틴) */}
      {hasPendingJoinRequests && (
        <>
          <Spacing size={6} />
          <p style={{ fontSize: 16, fontWeight: 600, color: colors.grey800, margin: '0 0 12px' }}>
            가입 신청 ({joinRequests.length})
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {joinRequests.map((req) => (
              <JoinRequestItem
                key={req.id}
                request={req}
                onAccept={(id) => handleRespond(id, 'ACCEPTED')}
                onReject={(id) => handleRespond(id, 'REJECTED')}
                isPending={isResponding}
              />
            ))}
          </div>
        </>
      )}

      {/* 탈퇴 버튼 (비캡틴) */}
      {!isCaptain && (
        <>
          <Spacing size={8} />
          <Button variant="secondary" size="medium" fullWidth onClick={open} disabled={isLeaving}>
            팀 탈퇴
          </Button>
        </>
      )}

      <ConfirmDialog
        isOpen={isOpen}
        onCancel={close}
        onConfirm={handleLeave}
        title="팀 탈퇴"
        description="정말 팀에서 탈퇴하시겠습니까?"
        confirmLabel="탈퇴"
        cancelLabel="취소"
      />
    </div>
  );
}
