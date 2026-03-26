'use client';

import { useSignupForm } from '../hooks/useSignupForm';
import { SignupFormView } from './SignupFormView';

export function SignupFormContainer() {
  const { register, errors, onSubmit, isPending } = useSignupForm();

  return (
    <SignupFormView
      register={register}
      errors={errors}
      onSubmit={onSubmit}
      isPending={isPending}
    />
  );
}
