'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { isApiError } from '@mono/shared/api';
import { ErrorCode } from '@/shared/constants/error-codes';
import { useToast } from '@mono/ui';
import { createTeamSchema, type CreateTeamInput } from '../schemas/team.schema';
import { useCreateTeamMutation } from './queries/useTeamQuery';

export function useCreateTeamForm(onSuccess: () => void) {
  const form = useForm<CreateTeamInput>({
    resolver: zodResolver(createTeamSchema),
    defaultValues: { name: '', description: '', logoUrl: '' },
  });

  const { toast } = useToast();

  const { mutate, isPending } = useCreateTeamMutation(() => {
    toast.success('팀이 생성되었습니다.');
    form.reset();
    onSuccess();
  });

  const handleSubmit = form.handleSubmit((data) => {
    const payload = {
      ...data,
      logoUrl: data.logoUrl || undefined,
      description: data.description || undefined,
    };
    mutate(payload, {
      onError: (error) => {
        if (isApiError(error) && error.code === ErrorCode.NAME_ALREADY_EXISTS) {
          form.setError('name', { message: '이미 사용 중인 팀 이름입니다.' });
        } else if (isApiError(error)) {
          toast.error(error.message);
        }
      },
    });
  });

  return { form, isPending, handleSubmit };
}
