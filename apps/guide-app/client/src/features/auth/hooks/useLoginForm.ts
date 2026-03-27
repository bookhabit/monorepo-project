import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { isApiError, getErrorMessage, ErrorCode } from '@mono/shared/api';
import { loginSchema, type LoginInput } from '../schemas/auth.schema';
import { useLoginMutation } from './queries/useAuthMutation';
import { useAuthStore } from '../stores/useAuthStore';

export function useLoginForm() {
  const router = useRouter();
  const setAccessToken = useAuthStore((s) => s.setAccessToken);

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
  });

  const { mutate, isPending } = useLoginMutation();

  const onSubmit = form.handleSubmit((data) => {
    mutate(data, {
      onSuccess: ({ accessToken }) => {
        // AT만 메모리에 저장. RT는 서버가 httpOnly 쿠키로 설정.
        setAccessToken(accessToken);
        router.replace('/dashboard');
      },
      onError: (error) => {
        if (isApiError(error) && error.code === ErrorCode.INVALID_CREDENTIALS) {
          form.setError('password', {
            message: '이메일 또는 비밀번호가 올바르지 않습니다.',
          });
        } else {
          form.setError('root.serverError', { message: getErrorMessage(error) });
        }
      },
    });
  });

  return { register: form.register, errors: form.formState.errors, onSubmit, isPending };
}
