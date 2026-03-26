import { colors } from './colors';
import { spacing } from './spacing';

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
