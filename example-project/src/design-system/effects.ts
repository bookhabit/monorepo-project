/**
 * Design System - Common Effects
 */

import { css } from '@emotion/react';
import { colors } from './tokens/colors';

// Transitions
export const transitions = {
  fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
  base: '200ms cubic-bezier(0.4, 0, 0.2, 1)',
  slow: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
  spring: '300ms cubic-bezier(0.34, 1.56, 0.64, 1)',
} as const;

// Hover Effects
export const hoverEffects = {
  lift: css`
    transition: transform ${transitions.base};
    
    &:hover {
      transform: translateY(-2px);
    }
  `,

  scale: css`
    transition: transform ${transitions.base};
    
    &:hover {
      transform: scale(1.02);
    }
  `,

  brightness: css`
    transition: filter ${transitions.base};
    
    &:hover {
      filter: brightness(1.1);
    }
  `,

  shadow: css`
    transition: box-shadow ${transitions.base};
    
    &:hover {
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
    }
  `,
};

// Focus Effects
export const focusEffects = {
  ring: css`
    outline: none;
    
    &:focus {
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
    }
  `,

  border: css`
    outline: none;
    transition: border-color ${transitions.base};
    
    &:focus {
      border-color: ${colors.primary500};
    }
  `,
};

// Active Effects
export const activeEffects = {
  scale: css`
    &:active {
      transform: scale(0.98);
    }
  `,

  brightness: css`
    &:active {
      filter: brightness(0.9);
    }
  `,
};

// Disabled State
export const disabledEffect = css`
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }
`;

// Error State
export const errorEffect = css`
  border-color: ${colors.error500};
  
  &:focus {
    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.2);
  }
`;

// Loading State
export const loadingEffect = css`
  position: relative;
  pointer-events: none;
  
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 16px;
    height: 16px;
    margin: -8px 0 0 -8px;
    border: 2px solid currentColor;
    border-radius: 50%;
    border-top-color: transparent;
    animation: spin 0.6s linear infinite;
  }
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

// Animations
export const animations = {
  fadeIn: css`
    animation: fadeIn ${transitions.base} ease-in;
    
    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  `,

  slideUp: css`
    animation: slideUp ${transitions.base} ease-out;
    
    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(8px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `,

  slideDown: css`
    animation: slideDown ${transitions.base} ease-out;
    
    @keyframes slideDown {
      from {
        opacity: 0;
        transform: translateY(-8px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `,

  pulse: css`
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    
    @keyframes pulse {
      0%, 100% {
        opacity: 1;
      }
      50% {
        opacity: 0.5;
      }
    }
  `,

  spin: css`
    animation: spin 1s linear infinite;
    
    @keyframes spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  `,
};
