/**
 * Design System - Card Component
 */

import styled from '@emotion/styled';
import { colors } from '../tokens/colors';
import { spacing, borderRadius, shadows } from '../tokens/spacing';
import { transitions } from '../effects';
import { HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  interactive?: boolean;
  padding?: keyof typeof spacing;
  noPadding?: boolean;
}

export const Card = styled.div<CardProps>`
  background: ${colors.white};
  border: 1px solid ${colors.gray200};
  border-radius: ${borderRadius.xl};
  box-shadow: ${shadows.sm};
  padding: ${props => props.noPadding ? 0 : spacing[props.padding || 6]};
  transition: all ${transitions.base};
  
  ${props => props.interactive && `
    cursor: pointer;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: ${shadows.md};
      border-color: ${colors.gray300};
    }
    
    &:active {
      transform: translateY(0);
    }
  `}
`;

export const CardHeader = styled.div`
  padding: ${spacing[6]};
  border-bottom: 1px solid ${colors.gray200};
`;

export const CardTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: ${colors.gray900};
  margin: 0;
`;

export const CardDescription = styled.p`
  font-size: 14px;
  color: ${colors.gray500};
  margin: 8px 0 0 0;
`;

export const CardBody = styled.div`
  padding: ${spacing[6]};
`;

export const CardFooter = styled.div`
  padding: ${spacing[6]};
  border-top: 1px solid ${colors.gray200};
  display: flex;
  align-items: center;
  gap: ${spacing[3]};
`;
