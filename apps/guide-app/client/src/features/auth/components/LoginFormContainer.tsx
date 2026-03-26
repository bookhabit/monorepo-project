'use client';

import { useLoginForm } from '../hooks/useLoginForm';
import { LoginFormView } from './LoginFormView';

/** Container — Logic Hook 연결 후 View에 props 전달 */
export function LoginFormContainer() {
  const { register, errors, onSubmit, isPending } = useLoginForm();

  return (
    <LoginFormView
      register={register}
      errors={errors}
      onSubmit={onSubmit}
      isPending={isPending}
    />
  );
}
