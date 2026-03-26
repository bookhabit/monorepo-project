import { colors } from './colors';
import { spacing } from './spacing';
import { typographyCssVariables } from './typography';

export const theme = {
  colors,
  spacing,
} as const;

export type Theme = typeof theme;

declare module '@emotion/react' {
  export interface Theme {
    colors: typeof colors;
    spacing: typeof spacing;
  }
}

// ─── 글로벌 CSS 변수 (GlobalStyle에서 :root에 주입) ──────────────────────────
// 사용 예시:
//   import { Global, css } from '@emotion/react';
//   import { globalStyles } from '@mono/ui';
//   <Global styles={globalStyles} />
export const globalStyles = `
  *, *::before, *::after { box-sizing: border-box; }
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    -webkit-font-smoothing: antialiased;
    background-color: ${colors.background};
    color: ${colors.grey900};
  }
  :root {
    ${typographyCssVariables}
  }
`;
