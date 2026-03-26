'use client';

import Link from 'next/link';
import { Button, TextField, Flex, Spacing, colors } from '@mono/ui';
import type { UseFormRegister, FieldErrors } from 'react-hook-form';
import type { SignupInput } from '../schemas/auth.schema';

interface Props {
  register: UseFormRegister<SignupInput>;
  errors: FieldErrors<SignupInput> & { root?: { serverError?: { message?: string } } };
  onSubmit: React.FormEventHandler;
  isPending: boolean;
}

export function SignupFormView({ register, errors, onSubmit, isPending }: Props) {
  return (
    <div style={{ width: '100%', maxWidth: 400, margin: '0 auto' }}>
      <h1 style={{ fontSize: 22, fontWeight: 700, lineHeight: '31px', color: colors.grey900, margin: 0 }}>
        회원가입
      </h1>
      <Spacing size={2} />
      <p style={{ fontSize: 14, fontWeight: 400, lineHeight: '21px', color: colors.grey500, margin: 0 }}>
        팀을 만들고 경기를 등록해보세요.
      </p>
      <Spacing size={8} />

      <form onSubmit={onSubmit} noValidate>
        <Flex direction="column" gap={5}>
          <TextField
            title="이메일"
            type="email"
            placeholder="example@email.com"
            errorMessage={errors.email?.message}
            {...register('email')}
          />

          <TextField
            title="닉네임"
            type="text"
            placeholder="2~20자"
            errorMessage={errors.nickname?.message}
            {...register('nickname')}
          />

          <TextField
            title="비밀번호"
            type="password"
            placeholder="8자 이상 입력"
            errorMessage={errors.password?.message}
            {...register('password')}
          />

          <TextField
            title="비밀번호 확인"
            type="password"
            placeholder="비밀번호 재입력"
            errorMessage={errors.confirmPassword?.message}
            {...register('confirmPassword')}
          />

          {errors.root?.serverError && (
            <p role="alert" style={{ fontSize: 12, color: colors.error, margin: 0 }}>
              {errors.root.serverError.message}
            </p>
          )}

          <Button type="submit" fullWidth size="large" loading={isPending}>
            계정 만들기
          </Button>
        </Flex>
      </form>

      <Spacing size={4} />
      <p style={{ fontSize: 14, color: colors.grey500, textAlign: 'center', margin: 0 }}>
        이미 계정이 있으신가요?{' '}
        <Link href="/login" style={{ color: colors.blue500, fontWeight: 600, textDecoration: 'none' }}>
          로그인
        </Link>
      </p>
    </div>
  );
}
