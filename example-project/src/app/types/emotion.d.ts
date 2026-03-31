import '@emotion/react';
import { Theme } from '../styles/theme';

declare module '@emotion/react' {
  export interface Theme {
    color: {
      background: string;
      backgroundSecondary: string;
      backgroundTertiary: string;
      text: string;
      textSecondary: string;
      textMuted: string;
      border: string;
      borderHover: string;
      primary: string;
      primaryHover: string;
      success: string;
      successLight: string;
      error: string;
      errorLight: string;
      warning: string;
      warningLight: string;
      info: string;
      infoLight: string;
    };
    spacing: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    borderRadius: {
      sm: string;
      md: string;
      lg: string;
      full: string;
    };
    shadow: {
      sm: string;
      md: string;
      lg: string;
    };
  }
}
