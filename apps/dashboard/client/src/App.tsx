/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { colors } from '@mono/ui';

export default function App() {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        background-color: ${colors.background};
      `}
    >
      <h1
        css={css`
          font-size: 24px;
          font-weight: 700;
          color: ${colors.grey900};
          margin-bottom: 8px;
        `}
      >
        보유 자산 분석
      </h1>
      <p
        css={css`
          font-size: 14px;
          color: ${colors.grey500};
        `}
      >
        인터랙티브 보유 자산 분석 대시보드
      </p>
    </div>
  );
}
