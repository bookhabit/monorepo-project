/** @jsxImportSource @emotion/react */
'use client';

import { css } from '@emotion/react';
import Link from 'next/link';
import { colors, typography, spacing } from '@mono/ui';
import type { UseFormRegister, FieldErrors } from 'react-hook-form';
import type { LoginInput } from '../schemas/auth.schema';

interface Props {
  register: UseFormRegister<LoginInput>;
  errors: FieldErrors<LoginInput> & { root?: { serverError?: { message?: string } } };
  onSubmit: React.FormEventHandler;
  isPending: boolean;
}

const containerStyle = css`
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
`;

const titleStyle = css`
  ${typography.heading1};
  color: ${colors.grey900};
  margin: 0 0 ${spacing[2]};
`;

const subtitleStyle = css`
  ${typography.body2};
  color: ${colors.grey500};
  margin: 0 0 ${spacing[8]};
`;

const formStyle = css`
  display: flex;
  flex-direction: column;
  gap: ${spacing[5]};
`;

const fieldStyle = css`
  display: flex;
  flex-direction: column;
  gap: ${spacing[1]};
`;

const labelStyle = css`
  ${typography.captionBold};
  color: ${colors.grey700};
`;

const inputStyle = (hasError: boolean) => css`
  width: 100%;
  height: 48px;
  padding: 0 ${spacing[4]};
  border: 1.5px solid ${hasError ? colors.error : colors.grey200};
  border-radius: 10px;
  ${typography.body2};
  color: ${colors.grey900};
  background: ${colors.background};
  outline: none;
  box-sizing: border-box;
  transition: border-color 0.15s;

  &:focus {
    border-color: ${hasError ? colors.error : colors.blue500};
  }

  &::placeholder {
    color: ${colors.grey400};
  }
`;

const errorStyle = css`
  ${typography.caption};
  color: ${colors.error};
`;

const submitButtonStyle = (isPending: boolean) => css`
  height: 52px;
  background: ${isPending ? colors.blue300 : colors.blue500};
  color: #fff;
  border: none;
  border-radius: 12px;
  ${typography.body1};
  font-weight: 600;
  cursor: ${isPending ? 'not-allowed' : 'pointer'};
  transition: background 0.15s;

  &:hover:not(:disabled) {
    background: ${colors.blue600};
  }
`;

const footerStyle = css`
  text-align: center;
  margin-top: ${spacing[4]};
  ${typography.body2};
  color: ${colors.grey500};

  a {
    color: ${colors.blue500};
    font-weight: 600;
    text-decoration: none;
  }
`;

/** View — props만 받아 렌더링. 로직 없음. */
export function LoginFormView({ register, errors, onSubmit, isPending }: Props) {
  return (
    <div css={containerStyle}>
      <h1 css={titleStyle}>로그인</h1>
      <p css={subtitleStyle}>팀 관리 앱에 오신 것을 환영합니다.</p>

      <form css={formStyle} onSubmit={onSubmit} noValidate>
        <div css={fieldStyle}>
          <label css={labelStyle} htmlFor="email">이메일</label>
          <input
            css={inputStyle(!!errors.email)}
            id="email"
            type="email"
            placeholder="example@email.com"
            {...register('email')}
          />
          {errors.email && <span css={errorStyle} role="alert">{errors.email.message}</span>}
        </div>

        <div css={fieldStyle}>
          <label css={labelStyle} htmlFor="password">비밀번호</label>
          <input
            css={inputStyle(!!errors.password)}
            id="password"
            type="password"
            placeholder="8자 이상 입력"
            {...register('password')}
          />
          {errors.password && <span css={errorStyle} role="alert">{errors.password.message}</span>}
        </div>

        {errors.root?.serverError && (
          <p css={errorStyle} role="alert">{errors.root.serverError.message}</p>
        )}

        <button css={submitButtonStyle(isPending)} type="submit" disabled={isPending}>
          {isPending ? '로그인 중...' : '로그인'}
        </button>
      </form>

      <p css={footerStyle}>
        계정이 없으신가요? <Link href="/signup">회원가입</Link>
      </p>
    </div>
  );
}
