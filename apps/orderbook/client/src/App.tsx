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
        background-color: ${colors.grey900};
      `}
    >
      <h1
        css={css`
          font-size: 24px;
          font-weight: 700;
          color: ${colors.grey0};
          margin-bottom: 8px;
        `}
      >
        실시간 호가창
      </h1>
      <p
        css={css`
          font-size: 14px;
          color: ${colors.grey500};
        `}
      >
        실시간 시세 호가창 & 미니 주문 보드
      </p>
    </div>
  );
}
