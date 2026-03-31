/**
 * Design System - Input Component
 * Toss-style input with error states and labels
 */

import styled from '@emotion/styled';
import { colors } from '../tokens/colors';
import { typography } from '../tokens/typography';
import { spacing, borderRadius } from '../tokens/spacing';
import { transitions, focusEffects, errorEffect } from '../effects';
import { InputHTMLAttributes, forwardRef, ReactNode } from 'react';
import { AlertCircle } from 'lucide-react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
}

const InputWrapper = styled.div<{ fullWidth?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: ${spacing[2]};
  ${props => props.fullWidth && 'width: 100%;'}
`;

const Label = styled.label`
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.semibold};
  color: ${colors.gray900};
  display: flex;
  align-items: center;
  gap: ${spacing[1]};
`;

const InputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const StyledInput = styled.input<{ hasError?: boolean; hasLeftIcon?: boolean; hasRightIcon?: boolean }>`
  width: 100%;
  height: 48px;
  padding: 0 ${spacing[4]};
  font-family: ${typography.fontFamily.primary};
  font-size: ${typography.fontSize.base};
  color: ${colors.gray900};
  background: ${colors.white};
  border: 2px solid ${colors.gray200};
  border-radius: ${borderRadius.lg};
  transition: all ${transitions.base};
  
  ${props => props.hasLeftIcon && `padding-left: ${spacing[10]};`}
  ${props => props.hasRightIcon && `padding-right: ${spacing[10]};`}
  
  &::placeholder {
    color: ${colors.gray400};
  }
  
  &:hover:not(:disabled) {
    border-color: ${colors.gray300};
  }
  
  &:focus {
    outline: none;
    border-color: ${colors.primary500};
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
  
  &:disabled {
    background: ${colors.gray100};
    color: ${colors.gray500};
    cursor: not-allowed;
  }
  
  ${props => props.hasError && `
    border-color: ${colors.error500};
    
    &:focus {
      border-color: ${colors.error500};
      box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
    }
  `}
`;

const IconWrapper = styled.div<{ position: 'left' | 'right' }>`
  position: absolute;
  ${props => props.position}: ${spacing[4]};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.gray400};
  pointer-events: none;
`;

const HelperText = styled.div<{ isError?: boolean }>`
  font-size: ${typography.fontSize.sm};
  color: ${props => props.isError ? colors.error500 : colors.gray500};
  display: flex;
  align-items: center;
  gap: ${spacing[1]};
`;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, leftIcon, rightIcon, fullWidth, ...props }, ref) => {
    return (
      <InputWrapper fullWidth={fullWidth}>
        {label && <Label>{label}</Label>}
        
        <InputContainer>
          {leftIcon && <IconWrapper position="left">{leftIcon}</IconWrapper>}
          
          <StyledInput
            ref={ref}
            hasError={!!error}
            hasLeftIcon={!!leftIcon}
            hasRightIcon={!!rightIcon || !!error}
            {...props}
          />
          
          {error ? (
            <IconWrapper position="right">
              <AlertCircle size={18} color={colors.error500} />
            </IconWrapper>
          ) : (
            rightIcon && <IconWrapper position="right">{rightIcon}</IconWrapper>
          )}
        </InputContainer>
        
        {(error || helperText) && (
          <HelperText isError={!!error}>
            {error || helperText}
          </HelperText>
        )}
      </InputWrapper>
    );
  }
);

Input.displayName = 'Input';
