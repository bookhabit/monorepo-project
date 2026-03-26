'use client';

import Link from 'next/link';
import { Button, TextField, Flex, Spacing, colors } from '@mono/ui';
import type { UseFormRegister, FieldErrors } from 'react-hook-form';
import type { LoginInput } from '../schemas/auth.schema';

interface Props {
  register: UseFormRegister<LoginInput>;
  errors: FieldErrors<LoginInput> & { root?: { serverError?: { message?: string } } };
  onSubmit: React.FormEventHandler;
  isPending: boolean;
}

/** View — props만 받아 렌더링. 로직 없음. */
export function LoginFormView({ register, errors, onSubmit, isPending }: Props) {
  return (
    <div style={{ width: '100%', maxWidth: 400, margin: '0 auto' }}>
      <h1 style={{ fontSize: 22, fontWeight: 700, lineHeight: '31px', color: colors.grey900, margin: 0 }}>
        로그인
      </h1>
      <Spacing size={2} />
      <p style={{ fontSize: 14, fontWeight: 400, lineHeight: '21px', color: colors.grey500, margin: 0 }}>
        팀 관리 앱에 오신 것을 환영합니다.
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
            title="비밀번호"
            type="password"
            placeholder="8자 이상 입력"
            errorMessage={errors.password?.message}
            {...register('password')}
          />

          {errors.root?.serverError && (
            <p role="alert" style={{ fontSize: 12, color: colors.error, margin: 0 }}>
              {errors.root.serverError.message}
            </p>
          )}

          <Button type="submit" fullWidth size="large" loading={isPending}>
            로그인
          </Button>
        </Flex>
      </form>

      <Spacing size={4} />
      <p style={{ fontSize: 14, color: colors.grey500, textAlign: 'center', margin: 0 }}>
        계정이 없으신가요?{' '}
        <Link href="/signup" style={{ color: colors.blue500, fontWeight: 600, textDecoration: 'none' }}>
          회원가입
        </Link>
      </p>
    </div>
  );
}
