// @ts-check
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import reactHooks from 'eslint-plugin-react-hooks';

/** @type {import('eslint').Linter.Config[]} */
export default [
  // ── 전역 무시 패턴 ────────────────────────────────────────
  {
    ignores: [
      '**/node_modules/**',
      '**/.yarn/**',
      '**/dist/**',
      '**/.next/**',
      '**/.turbo/**',
      '**/*.tsbuildinfo',
    ],
  },

  // ── 공통 TypeScript 규칙 (모든 .ts/.tsx) ─────────────────
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      '@typescript-eslint': tseslint,
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
      '@typescript-eslint/no-non-null-assertion': 'warn',
      'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
      'no-debugger': 'error',
      'prefer-const': 'error',
      'no-var': 'error',
    },
  },

  // ── React 앱 규칙 (Vite React + packages/ui) ──────────────
  {
    files: [
      'apps/funnel/client/**/*.{ts,tsx}',
      'apps/orderbook/client/**/*.{ts,tsx}',
      'apps/dashboard/client/**/*.{ts,tsx}',
      'apps/notification/client/**/*.{ts,tsx}',
      'packages/ui/**/*.{ts,tsx}',
    ],
    plugins: {
      'react-hooks': reactHooks,
    },
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },

  // ── Next.js 앱 규칙 (next lint가 별도 처리, hooks만 추가) ──
  {
    files: [
      'apps/loan-admin/client/**/*.{ts,tsx}',
      'apps/fds/client/**/*.{ts,tsx}',
      'apps/console/client/**/*.{ts,tsx}',
      'apps/report/client/**/*.{ts,tsx}',
    ],
    plugins: {
      'react-hooks': reactHooks,
    },
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'no-console': ['warn', { allow: ['warn', 'error', 'info', 'log'] }],
    },
  },

  // ── NestJS 서버 규칙 ──────────────────────────────────────
  {
    files: ['apps/*/server/**/*.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      'no-console': 'off',
    },
  },

  // ── packages/shared (타입 안전 강화) ──────────────────────
  {
    files: ['packages/shared/**/*.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
    },
  },
];
