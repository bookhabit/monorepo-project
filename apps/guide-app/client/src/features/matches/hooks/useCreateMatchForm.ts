'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createMatchSchema, type CreateMatchInput } from '../schemas/match.schema';
import { useCreateMatchMutation } from './queries/useMatchQuery';

export function useCreateMatchForm(onSuccess: () => void) {
  const form = useForm<CreateMatchInput>({
    resolver: zodResolver(createMatchSchema),
    defaultValues: { matchDate: '', location: '', note: '' },
  });

  const { mutate, isPending } = useCreateMatchMutation();

  const handleSubmit = form.handleSubmit((data) => {
    mutate(
      { ...data, note: data.note || undefined },
      {
        onSuccess: () => {
          form.reset();
          onSuccess();
        },
      },
    );
  });

  return { form, isPending, handleSubmit };
}
