'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useToast } from '@mono/ui';
import { isApiError } from '@mono/shared/api';
import { http } from '@/shared/api/client';
import { updateProfileSchema, userSchema } from '@/features/auth/schemas/auth.schema';
import type { User } from '@/features/auth/schemas/auth.schema';
import type { z } from 'zod';

type UpdateProfileInput = z.infer<typeof updateProfileSchema>;

function useUpdateProfileMutation() {
  return useMutation({
    mutationFn: async (data: UpdateProfileInput) => {
      const res = await http.patch('/api/v1/users/me', data);
      return userSchema.parse(res);
    },
  });
}

export function useProfileForm(initialUser?: User | null) {
  const form = useForm<UpdateProfileInput>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      nickname: initialUser?.nickname ?? '',
      position: (initialUser?.position as UpdateProfileInput['position']) ?? undefined,
      skillLevel: initialUser?.skillLevel ?? 3,
    },
  });

  useEffect(() => {
    if (initialUser) {
      form.reset({
        nickname: initialUser.nickname,
        position: (initialUser.position as UpdateProfileInput['position']) ?? undefined,
        skillLevel: initialUser.skillLevel ?? 3,
      });
    }
  }, [initialUser?.id]);

  const { mutate, isPending } = useUpdateProfileMutation();
  const { toast } = useToast();

  const handleSubmit = form.handleSubmit((data) => {
    mutate(data, {
      onSuccess: () => toast.success('프로필이 저장되었습니다.'),
      onError: (error) => {
        if (isApiError(error)) toast.error(error.message);
      },
    });
  });

  return { form, isPending, handleSubmit };
}
