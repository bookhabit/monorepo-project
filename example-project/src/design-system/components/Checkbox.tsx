/**
 * Design System - Checkbox Component
 */

import styled from '@emotion/styled';
import { colors } from '../tokens/colors';
import { spacing, borderRadius } from '../tokens/spacing';
import { transitions } from '../effects';
import { InputHTMLAttributes, forwardRef } from 'react';
import { Check } from 'lucide-react';

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
}

const CheckboxWrapper = styled.label`
  display: inline-flex;
  align-items: center;
  gap: ${spacing[2]};
  cursor: pointer;
  user-select: none;
`;

const HiddenCheckbox = styled.input`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
`;

const StyledCheckbox = styled.div<{ checked?: boolean; disabled?: boolean }>`
  width: 20px;
  height: 20px;
  border: 2px solid ${props => props.checked ? colors.primary600 : colors.gray300};
  border-radius: ${borderRadius.sm};
  background: ${props => props.checked ? colors.primary600 : colors.white};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all ${transitions.base};
  
  svg {
    color: white;
    opacity: ${props => props.checked ? 1 : 0};
    transform: scale(${props => props.checked ? 1 : 0.5});
    transition: all ${transitions.base};
  }
  
  ${props => !props.disabled && `
    &:hover {
      border-color: ${props.checked ? colors.primary700 : colors.gray400};
    }
  `}
  
  ${props => props.disabled && `
    opacity: 0.5;
    cursor: not-allowed;
  `}
`;

const Label = styled.span<{ disabled?: boolean }>`
  font-size: 15px;
  color: ${colors.gray900};
  
  ${props => props.disabled && `
    opacity: 0.5;
  `}
`;

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, checked, disabled, ...props }, ref) => {
    return (
      <CheckboxWrapper>
        <HiddenCheckbox
          ref={ref}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          {...props}
        />
        <StyledCheckbox checked={checked} disabled={disabled}>
          <Check size={14} strokeWidth={3} />
        </StyledCheckbox>
        {label && <Label disabled={disabled}>{label}</Label>}
      </CheckboxWrapper>
    );
  }
);

Checkbox.displayName = 'Checkbox';
