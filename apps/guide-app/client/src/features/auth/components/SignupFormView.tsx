/** @jsxImportSource @emotion/react */
'use client';

import { css } from '@emotion/react';
import Link from 'next/link';
import { colors, typography, spacing } from '@mono/ui';
import type { UseFormRegister, FieldErrors } from 'react-hook-form';
import type { SignupInput } from '../schemas/auth.schema';

interface Props {
  register: UseFormRegister<SignupInput>;
  errors: FieldErrors<SignupInput> & { root?: { serverError?: { message?: string } } };
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

export function SignupFormView({ register, errors, onSubmit, isPending }: Props) {
  return (
    <div css={containerStyle}>
      <h1 css={titleStyle}>회원가입</h1>
      <p css={subtitleStyle}>팀을 만들고 경기를 등록해보세요.</p>

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
          <label css={labelStyle} htmlFor="nickname">닉네임</label>
          <input
            css={inputStyle(!!errors.nickname)}
            id="nickname"
            type="text"
            placeholder="2~20자"
            {...register('nickname')}
          />
          {errors.nickname && <span css={errorStyle} role="alert">{errors.nickname.message}</span>}
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

        <div css={fieldStyle}>
          <label css={labelStyle} htmlFor="confirmPassword">비밀번호 확인</label>
          <input
            css={inputStyle(!!errors.confirmPassword)}
            id="confirmPassword"
            type="password"
            placeholder="비밀번호 재입력"
            {...register('confirmPassword')}
          />
          {errors.confirmPassword && (
            <span css={errorStyle} role="alert">{errors.confirmPassword.message}</span>
          )}
        </div>

        {errors.root?.serverError && (
          <p css={errorStyle} role="alert">{errors.root.serverError.message}</p>
        )}

        <button css={submitButtonStyle(isPending)} type="submit" disabled={isPending}>
          {isPending ? '가입 중...' : '계정 만들기'}
        </button>
      </form>

      <p css={footerStyle}>
        이미 계정이 있으신가요? <Link href="/login">로그인</Link>
      </p>
    </div>
  );
}
