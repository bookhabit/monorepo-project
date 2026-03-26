import { css } from '@emotion/react';

export const typography = {
  Heading1: css`
    font-size: 28px;
    font-weight: 700;
    line-height: 1.4;
    letter-spacing: -0.02em;
  `,
  Heading2: css`
    font-size: 22px;
    font-weight: 700;
    line-height: 1.4;
    letter-spacing: -0.01em;
  `,
  Heading3: css`
    font-size: 18px;
    font-weight: 700;
    line-height: 1.5;
  `,
  Body1: css`
    font-size: 16px;
    font-weight: 400;
    line-height: 1.6;
  `,
  Body1Bold: css`
    font-size: 16px;
    font-weight: 600;
    line-height: 1.6;
  `,
  Body2: css`
    font-size: 14px;
    font-weight: 400;
    line-height: 1.6;
  `,
  Body2Bold: css`
    font-size: 14px;
    font-weight: 600;
    line-height: 1.6;
  `,
  Caption: css`
    font-size: 12px;
    font-weight: 400;
    line-height: 1.5;
  `,
} as const;
