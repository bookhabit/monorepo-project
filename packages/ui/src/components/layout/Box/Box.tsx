/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import type { CSSProperties } from 'react';

type BoxProps = {
  padding?: number | string;
  paddingX?: number | string;
  paddingY?: number | string;
  margin?: number | string;
  width?: CSSProperties['width'];
  height?: CSSProperties['height'];
  borderRadius?: number | string;
  overflow?: CSSProperties['overflow'];
  position?: CSSProperties['position'];
  backgroundColor?: string;
};

const toPixel = (val: number | string) => (typeof val === 'number' ? `${val * 4}px` : val);

export const Box = styled.div<BoxProps>`
  ${({ padding }) => padding !== undefined && `padding: ${toPixel(padding)};`}
  ${({ paddingX }) =>
    paddingX !== undefined &&
    `padding-left: ${toPixel(paddingX)}; padding-right: ${toPixel(paddingX)};`}
  ${({ paddingY }) =>
    paddingY !== undefined &&
    `padding-top: ${toPixel(paddingY)}; padding-bottom: ${toPixel(paddingY)};`}
  ${({ margin }) => margin !== undefined && `margin: ${toPixel(margin)};`}
  ${({ width }) => width !== undefined && `width: ${width};`}
  ${({ height }) => height !== undefined && `height: ${height};`}
  ${({ borderRadius }) => borderRadius !== undefined && `border-radius: ${toPixel(borderRadius)};`}
  ${({ overflow }) => overflow !== undefined && `overflow: ${overflow};`}
  ${({ position }) => position !== undefined && `position: ${position};`}
  ${({ backgroundColor }) =>
    backgroundColor !== undefined && `background-color: ${backgroundColor};`}
`;
