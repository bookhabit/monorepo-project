import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { isApiError, getErrorMessage } from '@mono/shared/api';
import { ErrorCode } from '@/shared/constants/error-codes';
import { signupSchema, type SignupInput } from '../schemas/auth.schema';
import { useSignupMutation } from './queries/useAuthMutation';

export function useSignupForm() {
  const router = useRouter();

  const form = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
    mode: 'onBlur',
  });

  const { mutate, isPending } = useSignupMutation();

  const onSubmit = form.handleSubmit(({ email, password, nickname }) => {
    mutate(
      { email, password, nickname },
      {
        onSuccess: () => {
          router.replace('/login?registered=true');
        },
        onError: (error) => {
          if (isApiError(error) && error.code === ErrorCode.EMAIL_ALREADY_EXISTS) {
            form.setError('email', { message: '이미 사용 중인 이메일입니다.' });
          } else {
            form.setError('root.serverError', { message: getErrorMessage(error) });
          }
        },
      },
    );
  });

  return {
    register: form.register,
    errors: form.formState.errors,
    onSubmit,
    isPending,
  };
}
