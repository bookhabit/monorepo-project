/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

type SpacingProps = {
  size: number;
  direction?: 'vertical' | 'horizontal';
};

export function Spacing({ size, direction = 'vertical' }: SpacingProps) {
  return (
    <div
      css={
        direction === 'vertical'
          ? css`
              height: ${size * 4}px;
              width: 100%;
              flex-shrink: 0;
            `
          : css`
              width: ${size * 4}px;
              height: 1px;
              flex-shrink: 0;
            `
      }
      aria-hidden="true"
    />
  );
}
