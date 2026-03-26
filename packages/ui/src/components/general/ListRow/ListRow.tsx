/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { colors } from '../../../foundation/colors';
import { typography } from '../../../foundation/typography';
import { spacing } from '../../../foundation/spacing';
import type { ListRowProps } from './ListRow.types';

const baseRowStyle = css`
  display: flex;
  align-items: center;
  gap: ${spacing[3]};
  padding: ${spacing[4]};
  background-color: ${colors.background};
  width: 100%;
  text-align: left;
  border: none;
  font-family: inherit;
`;

const clickableRowStyle = css`
  cursor: pointer;
  transition: background-color 0.1s ease;

  &:hover {
    background-color: ${colors.grey50};
  }

  &:active {
    background-color: ${colors.grey100};
  }
`;

const leftSlotStyle = css`
  flex-shrink: 0;
`;

const contentStyle = css`
  flex: 1;
  min-width: 0;
`;

const titleStyle = css`
  ${typography.body1};
  color: ${colors.grey900};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const descriptionStyle = css`
  ${typography.body2};
  color: ${colors.grey500};
  margin-top: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const rightSlotStyle = css`
  flex-shrink: 0;
  color: ${colors.grey400};
`;

export function ListRow({ left, title, description, right, onClick }: ListRowProps) {
  const isClickable = onClick !== undefined;

  if (isClickable) {
    return (
      <button css={[baseRowStyle, clickableRowStyle]} onClick={onClick} type="button">
        {left !== undefined && <span css={leftSlotStyle}>{left}</span>}
        <span css={contentStyle}>
          <span css={[titleStyle, css`display: block;`]}>{title}</span>
          {description !== undefined && <span css={[descriptionStyle, css`display: block;`]}>{description}</span>}
        </span>
        {right !== undefined && <span css={rightSlotStyle}>{right}</span>}
      </button>
    );
  }

  return (
    <div css={baseRowStyle}>
      {left !== undefined && <span css={leftSlotStyle}>{left}</span>}
      <span css={contentStyle}>
        <span css={[titleStyle, css`display: block;`]}>{title}</span>
        {description !== undefined && <span css={[descriptionStyle, css`display: block;`]}>{description}</span>}
      </span>
      {right !== undefined && <span css={rightSlotStyle}>{right}</span>}
    </div>
  );
}
