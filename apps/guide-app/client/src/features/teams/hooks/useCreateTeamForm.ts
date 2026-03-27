'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { isApiError } from '@mono/shared/api';
import { createTeamSchema, type CreateTeamInput } from '../schemas/team.schema';
import { useCreateTeamMutation } from './queries/useTeamQuery';

export function useCreateTeamForm(onSuccess: () => void) {
  const form = useForm<CreateTeamInput>({
    resolver: zodResolver(createTeamSchema),
    defaultValues: { name: '', description: '', logoUrl: '' },
  });

  const { mutate, isPending } = useCreateTeamMutation();

  const handleSubmit = form.handleSubmit((data) => {
    const payload = {
      ...data,
      logoUrl: data.logoUrl || undefined,
      description: data.description || undefined,
    };
    mutate(payload, {
      onSuccess: () => {
        form.reset();
        onSuccess();
      },
      onError: (error) => {
        if (isApiError(error) && error.code === 'NAME_ALREADY_EXISTS') {
          form.setError('name', { message: '이미 사용 중인 팀 이름입니다.' });
        }
      },
    });
  });

  return { form, isPending, handleSubmit };
}
