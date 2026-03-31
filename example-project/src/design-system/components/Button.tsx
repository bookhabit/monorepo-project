/**
 * Design System - Button Component
 * Toss-style button with variants and sizes
 */

import styled from '@emotion/styled';
import { colors, gradients } from '../tokens/colors';
import { typography } from '../tokens/typography';
import { spacing, borderRadius } from '../tokens/spacing';
import { transitions, activeEffects, disabledEffect } from '../effects';
import { ButtonHTMLAttributes, forwardRef } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'gradient';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  isLoading?: boolean;
}

const getVariantStyles = (variant: ButtonVariant) => {
  switch (variant) {
    case 'primary':
      return `
        background: ${colors.primary600};
        color: ${colors.white};
        border: none;
        
        &:hover:not(:disabled) {
          background: ${colors.primary700};
        }
        
        &:active:not(:disabled) {
          background: ${colors.primary800};
        }
      `;
    
    case 'secondary':
      return `
        background: ${colors.gray100};
        color: ${colors.gray900};
        border: none;
        
        &:hover:not(:disabled) {
          background: ${colors.gray200};
        }
        
        &:active:not(:disabled) {
          background: ${colors.gray300};
        }
      `;
    
    case 'outline':
      return `
        background: transparent;
        color: ${colors.primary600};
        border: 2px solid ${colors.primary600};
        
        &:hover:not(:disabled) {
          background: ${colors.primary50};
        }
        
        &:active:not(:disabled) {
          background: ${colors.primary100};
        }
      `;
    
    case 'ghost':
      return `
        background: transparent;
        color: ${colors.gray700};
        border: none;
        
        &:hover:not(:disabled) {
          background: ${colors.gray100};
        }
        
        &:active:not(:disabled) {
          background: ${colors.gray200};
        }
      `;
    
    case 'danger':
      return `
        background: ${colors.error500};
        color: ${colors.white};
        border: none;
        
        &:hover:not(:disabled) {
          background: ${colors.error600};
        }
        
        &:active:not(:disabled) {
          background: ${colors.error700};
        }
      `;
    
    case 'gradient':
      return `
        background: ${gradients.purple};
        color: ${colors.white};
        border: none;
        
        &:hover:not(:disabled) {
          filter: brightness(1.1);
        }
        
        &:active:not(:disabled) {
          filter: brightness(0.9);
        }
      `;
    
    default:
      return '';
  }
};

const getSizeStyles = (size: ButtonSize) => {
  switch (size) {
    case 'sm':
      return `
        height: 36px;
        padding: 0 ${spacing[3]};
        font-size: ${typography.fontSize.sm};
        border-radius: ${borderRadius.md};
      `;
    
    case 'md':
      return `
        height: 44px;
        padding: 0 ${spacing[5]};
        font-size: ${typography.fontSize.base};
        border-radius: ${borderRadius.lg};
      `;
    
    case 'lg':
      return `
        height: 52px;
        padding: 0 ${spacing[6]};
        font-size: ${typography.fontSize.md};
        border-radius: ${borderRadius.xl};
      `;
    
    default:
      return '';
  }
};

const StyledButton = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${spacing[2]};
  font-family: ${typography.fontFamily.primary};
  font-weight: ${typography.fontWeight.semibold};
  cursor: pointer;
  transition: all ${transitions.base};
  position: relative;
  
  ${props => getVariantStyles(props.variant || 'primary')}
  ${props => getSizeStyles(props.size || 'md')}
  ${props => props.fullWidth && 'width: 100%;'}
  ${disabledEffect}
  ${activeEffects.scale}
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
  }
  
  ${props => props.isLoading && `
    color: transparent;
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
      color: ${props.variant === 'outline' || props.variant === 'ghost' ? colors.primary600 : colors.white};
    }
    
    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }
  `}
`;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <StyledButton ref={ref} variant={variant} size={size} {...props}>
        {children}
      </StyledButton>
    );
  }
);

Button.displayName = 'Button';
