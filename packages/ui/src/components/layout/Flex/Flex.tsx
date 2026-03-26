/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import type { CSSProperties } from 'react';

type FlexProps = {
  direction?: CSSProperties['flexDirection'];
  align?: CSSProperties['alignItems'];
  justify?: CSSProperties['justifyContent'];
  gap?: number | string;
  wrap?: CSSProperties['flexWrap'];
  flex?: CSSProperties['flex'];
};

export const Flex = styled.div<FlexProps>`
  display: flex;
  flex-direction: ${({ direction = 'row' }) => direction};
  align-items: ${({ align = 'stretch' }) => align};
  justify-content: ${({ justify = 'flex-start' }) => justify};
  gap: ${({ gap = 0 }) => (typeof gap === 'number' ? `${gap * 4}px` : gap)};
  flex-wrap: ${({ wrap = 'nowrap' }) => wrap};
  flex: ${({ flex }) => flex ?? 'initial'};
`;
