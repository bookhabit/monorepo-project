'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { isApiError } from '@mono/shared/api';
import { useToast } from '@mono/ui';
import { createMatchSchema, type CreateMatchInput } from '../schemas/match.schema';
import { useCreateMatchMutation } from './queries/useMatchQuery';

export function useCreateMatchForm(onSuccess: () => void) {
  const form = useForm<CreateMatchInput>({
    resolver: zodResolver(createMatchSchema),
    defaultValues: { matchDate: '', location: '', note: '' },
  });

  const { mutate, isPending } = useCreateMatchMutation();
  const { toast } = useToast();

  const handleSubmit = form.handleSubmit((data) => {
    mutate(
      { ...data, note: data.note || undefined },
      {
        onSuccess: () => {
          toast.success('경기가 등록되었습니다.');
          form.reset();
          onSuccess();
        },
        onError: (error) => {
          if (isApiError(error)) toast.error(error.message);
        },
      },
    );
  });

  return { form, isPending, handleSubmit };
}
