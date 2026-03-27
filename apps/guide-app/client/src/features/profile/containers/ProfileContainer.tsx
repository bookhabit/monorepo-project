'use client';

import { Button, colors, Flex, Select, Skeleton, Spacing, TextField } from '@mono/ui';
import { authService } from '@/features/auth/services/auth.service';
import { useProtectedQuery } from '@/shared/hooks/useProtectedQuery';
import { useProfileForm } from '../hooks/useProfileForm';

const POSITION_OPTIONS = [
  { value: '', label: '포지션 선택' },
  { value: 'FW', label: 'FW (공격수)' },
  { value: 'MF', label: 'MF (미드필더)' },
  { value: 'DF', label: 'DF (수비수)' },
  { value: 'GK', label: 'GK (골키퍼)' },
];

export function ProfileContainer() {
  const { data: user, isLoading } = useProtectedQuery({
    queryKey: ['me'],
    queryFn: authService.getMe,
  });

  const { form, isPending, handleSubmit } = useProfileForm(user);
  const { register, setValue, watch, formState: { errors } } = form;
  const position = watch('position');
  const skillLevel = watch('skillLevel');

  if (isLoading) {
    return (
      <div style={{ padding: '20px' }}>
        <Skeleton height={60} borderRadius={12} />
        <Spacing size={3} />
        <Skeleton height={56} borderRadius={8} />
        <Spacing size={3} />
        <Skeleton height={56} borderRadius={8} />
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      {/* 이메일 (읽기 전용) */}
      <div
        style={{
          background: colors.grey50,
          borderRadius: 12,
          padding: '16px',
          marginBottom: 24,
        }}
      >
        <p style={{ fontSize: 11, fontWeight: 600, color: colors.grey500, margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          이메일
        </p>
        <p style={{ fontSize: 16, color: colors.grey700, margin: 0 }}>{user?.email}</p>
      </div>

      <TextField
        title="닉네임"
        placeholder="닉네임을 입력하세요"
        {...register('nickname')}
        errorMessage={errors.nickname?.message}
      />
      <Spacing size={4} />

      <div>
        <p style={{ fontSize: 14, fontWeight: 600, color: colors.grey700, margin: '0 0 8px' }}>포지션</p>
        <Select
          options={POSITION_OPTIONS}
          value={position ?? ''}
          onChange={(e) => {
            const val = (e as React.ChangeEvent<HTMLSelectElement>).target.value;
            setValue('position', (val || undefined) as 'FW' | 'MF' | 'DF' | 'GK' | undefined);
          }}
          placeholder="포지션 선택"
        />
      </div>
      <Spacing size={4} />

      <div>
        <p style={{ fontSize: 14, fontWeight: 600, color: colors.grey700, margin: '0 0 8px' }}>실력 레벨 ({skillLevel})</p>
        <Flex gap={8}>
          {[1, 2, 3, 4, 5].map((level) => {
            const isSelected = skillLevel === level;

            return (
              <button
                key={level}
                type="button"
                onClick={() => setValue('skillLevel', level)}
                style={{
                  flex: 1,
                  padding: '10px 0',
                  borderRadius: 8,
                  border: `1.5px solid ${isSelected ? colors.primary : colors.grey200}`,
                  background: isSelected ? `${colors.primary}1a` : colors.background,
                  color: isSelected ? colors.primary : colors.grey600,
                  fontSize: 13,
                  fontWeight: isSelected ? 700 : 400,
                  cursor: 'pointer',
                }}
              >
                {level}
              </button>
            );
          })}
        </Flex>
      </div>

      <Spacing size={8} />
      <Button variant="primary" size="large" fullWidth onClick={handleSubmit} loading={isPending} disabled={isPending}>
        저장
      </Button>
    </div>
  );
}
