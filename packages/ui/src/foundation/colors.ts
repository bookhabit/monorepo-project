export const colors = {
  // Primary - 토스 블루
  blue50: '#EBF3FF',
  blue100: '#C7DFFF',
  blue200: '#A3CBFF',
  blue300: '#7FB7FF',
  blue400: '#5BA3FF',
  blue500: '#3182F6',
  blue600: '#2272EB',
  blue700: '#1862DB',
  blue800: '#0E52C1',
  blue900: '#0A3D9A',

  // Neutral
  grey0: '#FFFFFF',
  grey50: '#F9FAFB',
  grey100: '#F2F4F6',
  grey200: '#E5E8EB',
  grey300: '#D1D6DB',
  grey400: '#B0B8C1',
  grey500: '#8B95A1',
  grey600: '#6B7684',
  grey700: '#4E5968',
  grey800: '#333D4B',
  grey900: '#191F28',

  // Semantic
  success: '#0BB8A9',
  warning: '#FF8F0E',
  error: '#F04452',
  info: '#3182F6',

  // Background
  background: '#F2F4F6',
  surface: '#FFFFFF',
} as const;

export type ColorToken = keyof typeof colors;
