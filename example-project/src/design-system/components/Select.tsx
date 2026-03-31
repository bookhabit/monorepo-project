/**
 * Design System - Select Component
 */

import styled from '@emotion/styled';
import { colors } from '../tokens/colors';
import { typography } from '../tokens/typography';
import { spacing, borderRadius } from '../tokens/spacing';
import { transitions } from '../effects';
import { SelectHTMLAttributes, forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

const SelectWrapper = styled.div<{ fullWidth?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: ${spacing[2]};
  ${props => props.fullWidth && 'width: 100%;'}
`;

const Label = styled.label`
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.semibold};
  color: ${colors.gray900};
`;

const SelectContainer = styled.div`
  position: relative;
`;

const StyledSelect = styled.select<{ hasError?: boolean }>`
  width: 100%;
  height: 48px;
  padding: 0 ${spacing[10]} 0 ${spacing[4]};
  font-family: ${typography.fontFamily.primary};
  font-size: ${typography.fontSize.base};
  color: ${colors.gray900};
  background: ${colors.white};
  border: 2px solid ${colors.gray200};
  border-radius: ${borderRadius.lg};
  transition: all ${transitions.base};
  cursor: pointer;
  appearance: none;
  
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

const IconWrapper = styled.div`
  position: absolute;
  right: ${spacing[4]};
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: ${colors.gray400};
`;

const ErrorText = styled.div`
  font-size: ${typography.fontSize.sm};
  color: ${colors.error500};
`;

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, fullWidth, children, ...props }, ref) => {
    return (
      <SelectWrapper fullWidth={fullWidth}>
        {label && <Label>{label}</Label>}
        
        <SelectContainer>
          <StyledSelect ref={ref} hasError={!!error} {...props}>
            {children}
          </StyledSelect>
          
          <IconWrapper>
            <ChevronDown size={18} />
          </IconWrapper>
        </SelectContainer>
        
        {error && <ErrorText>{error}</ErrorText>}
      </SelectWrapper>
    );
  }
);

Select.displayName = 'Select';
