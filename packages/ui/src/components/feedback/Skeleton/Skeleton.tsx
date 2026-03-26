/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react';
import { colors } from '../../../foundation/colors';

const shimmer = keyframes`
  0%   { background-position: -468px 0; }
  100% { background-position:  468px 0; }
`;

const skeletonBase = css`
  background: linear-gradient(
    to right,
    ${colors.grey100} 8%,
    ${colors.grey200} 18%,
    ${colors.grey100} 33%
  );
  background-size: 800px 104px;
  animation: ${shimmer} 1.5s infinite linear;
`;

type SkeletonProps = {
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
};

const toPixel = (v: string | number) => (typeof v === 'number' ? `${v}px` : v);

export function Skeleton({ width = '100%', height = 16, borderRadius = 6 }: SkeletonProps) {
  return (
    <div
      css={[
        skeletonBase,
        css`
          width: ${toPixel(width)};
          height: ${toPixel(height)};
          border-radius: ${toPixel(borderRadius)};
        `,
      ]}
      aria-hidden="true"
    />
  );
}
