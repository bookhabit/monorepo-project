'use client';

import { Global, css } from '@emotion/react';

const globalStyles = css`
  * {
    -webkit-tap-highlight-color: transparent; /* 터치 시 파란 박스 제거 */
    -webkit-touch-callout: none;             /* 롱프레스 메뉴 방지 */
    user-select: none;                       /* 텍스트 선택 방지 */
    box-sizing: border-box;
  }
  input,
  textarea {
    user-select: auto;                       /* 입력창은 예외 */
  }
  body {
    overscroll-behavior-y: none;             /* 바운스 스크롤 방지 */
  }
`;

export function GlobalStyle() {
  return <Global styles={globalStyles} />;
}
