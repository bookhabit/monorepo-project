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
        알림 센터
      </h1>
      <p
        css={css`
          font-size: 14px;
          color: ${colors.grey500};
        `}
      >
        실시간 알림 센터 및 피드 시스템
      </p>
    </div>
  );
}
