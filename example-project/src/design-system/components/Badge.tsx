/**
 * Design System - Badge Component
 * Toss-style badge with variants and sizes
 */

import styled from '@emotion/styled';
import { colors } from '../tokens/colors';
import { typography } from '../tokens/typography';
import { spacing, borderRadius } from '../tokens/spacing';
import { HTMLAttributes } from 'react';

type BadgeVariant = 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'neutral';
type BadgeSize = 'sm' | 'md' | 'lg';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
}

const getVariantStyles = (variant: BadgeVariant) => {
  switch (variant) {
    case 'primary':
      return `
        background: ${colors.primary100};
        color: ${colors.primary700};
      `;
    
    case 'secondary':
      return `
        background: ${colors.secondary100};
        color: ${colors.secondary700};
      `;
    
    case 'success':
      return `
        background: ${colors.success100};
        color: ${colors.success700};
      `;
    
    case 'error':
      return `
        background: ${colors.error100};
        color: ${colors.error700};
      `;
    
    case 'warning':
      return `
        background: ${colors.warning100};
        color: ${colors.warning700};
      `;
    
    case 'info':
      return `
        background: ${colors.primary100};
        color: ${colors.primary700};
      `;
    
    case 'neutral':
      return `
        background: ${colors.gray100};
        color: ${colors.gray700};
      `;
    
    default:
      return '';
  }
};

const getSizeStyles = (size: BadgeSize, dot: boolean) => {
  if (dot) {
    switch (size) {
      case 'sm':
        return `
          width: 6px;
          height: 6px;
          padding: 0;
        `;
      case 'md':
        return `
          width: 8px;
          height: 8px;
          padding: 0;
        `;
      case 'lg':
        return `
          width: 10px;
          height: 10px;
          padding: 0;
        `;
    }
  }
  
  switch (size) {
    case 'sm':
      return `
        height: 20px;
        padding: 0 ${spacing[2]};
        font-size: ${typography.fontSize.xs};
      `;
    
    case 'md':
      return `
        height: 24px;
        padding: 0 ${spacing[3]};
        font-size: ${typography.fontSize.sm};
      `;
    
    case 'lg':
      return `
        height: 28px;
        padding: 0 ${spacing[4]};
        font-size: ${typography.fontSize.base};
      `;
    
    default:
      return '';
  }
};

const StyledBadge = styled.span<BadgeProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: ${typography.fontFamily.primary};
  font-weight: ${typography.fontWeight.semibold};
  border-radius: ${borderRadius.full};
  line-height: 1;
  white-space: nowrap;
  
  ${props => getVariantStyles(props.variant || 'neutral')}
  ${props => getSizeStyles(props.size || 'md', !!props.dot)}
`;

export function Badge({ 
  children, 
  variant = 'neutral', 
  size = 'md',
  dot = false,
  ...props 
}: BadgeProps) {
  return (
    <StyledBadge variant={variant} size={size} dot={dot} {...props}>
      {!dot && children}
    </StyledBadge>
  );
}
