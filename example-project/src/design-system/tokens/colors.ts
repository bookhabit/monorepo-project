/**
 * Design System - Color Tokens
 * Inspired by Toss Design System
 */

export const colors = {
  // Primary
  primary50: '#eff6ff',
  primary100: '#dbeafe',
  primary200: '#bfdbfe',
  primary300: '#93c5fd',
  primary400: '#60a5fa',
  primary500: '#3b82f6',
  primary600: '#2563eb',
  primary700: '#1d4ed8',
  primary800: '#1e40af',
  primary900: '#1e3a8a',

  // Secondary
  secondary50: '#faf5ff',
  secondary100: '#f3e8ff',
  secondary200: '#e9d5ff',
  secondary300: '#d8b4fe',
  secondary400: '#c084fc',
  secondary500: '#a855f7',
  secondary600: '#9333ea',
  secondary700: '#7e22ce',
  secondary800: '#6b21a8',
  secondary900: '#581c87',

  // Success
  success50: '#f0fdf4',
  success100: '#dcfce7',
  success200: '#bbf7d0',
  success300: '#86efac',
  success400: '#4ade80',
  success500: '#22c55e',
  success600: '#16a34a',
  success700: '#15803d',
  success800: '#166534',
  success900: '#14532d',

  // Error
  error50: '#fef2f2',
  error100: '#fee2e2',
  error200: '#fecaca',
  error300: '#fca5a5',
  error400: '#f87171',
  error500: '#ef4444',
  error600: '#dc2626',
  error700: '#b91c1c',
  error800: '#991b1b',
  error900: '#7f1d1d',

  // Warning
  warning50: '#fffbeb',
  warning100: '#fef3c7',
  warning200: '#fde68a',
  warning300: '#fcd34d',
  warning400: '#fbbf24',
  warning500: '#f59e0b',
  warning600: '#d97706',
  warning700: '#b45309',
  warning800: '#92400e',
  warning900: '#78350f',

  // Grayscale
  gray50: '#f9fafb',
  gray100: '#f3f4f6',
  gray200: '#e5e7eb',
  gray300: '#d1d5db',
  gray400: '#9ca3af',
  gray500: '#6b7280',
  gray600: '#4b5563',
  gray700: '#374151',
  gray800: '#1f2937',
  gray900: '#111827',

  // Dark mode
  dark50: '#18181b',
  dark100: '#27272a',
  dark200: '#3f3f46',
  dark300: '#52525b',
  dark400: '#71717a',
  dark500: '#a1a1aa',
  dark600: '#d4d4d8',
  dark700: '#e4e4e7',
  dark800: '#f4f4f5',
  dark900: '#fafafa',

  // Special
  white: '#ffffff',
  black: '#000000',
  transparent: 'transparent',
} as const;

export type ColorToken = keyof typeof colors;

// Semantic Colors
export const semantic = {
  // Background
  backgroundPrimary: colors.white,
  backgroundSecondary: colors.gray50,
  backgroundTertiary: colors.gray100,
  backgroundDark: colors.gray900,

  // Text
  textPrimary: colors.gray900,
  textSecondary: colors.gray700,
  textTertiary: colors.gray500,
  textMuted: colors.gray400,
  textInverse: colors.white,

  // Border
  border: colors.gray200,
  borderHover: colors.gray300,
  borderFocus: colors.primary500,
  borderError: colors.error500,

  // Interactive
  interactivePrimary: colors.primary600,
  interactiveHover: colors.primary700,
  interactiveActive: colors.primary800,
  interactiveDisabled: colors.gray300,

  // States
  success: colors.success500,
  error: colors.error500,
  warning: colors.warning500,
  info: colors.primary500,
} as const;

// Gradients
export const gradients = {
  primary: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
  secondary: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
  success: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
  error: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
  warning: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
  purple: 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)',
  ocean: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
  sunset: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
} as const;
