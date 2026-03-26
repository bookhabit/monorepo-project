/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Modal } from '../Modal/Modal';
import { Button } from '../../general/Button/Button';
import { colors } from '../../../foundation/colors';
import { typography } from '../../../foundation/typography';
import { spacing } from '../../../foundation/spacing';
import type { AlertDialogProps, ConfirmDialogProps } from './Dialog.types';

const descriptionStyle = css`
  ${typography.body2};
  color: ${colors.grey600};
  margin: 0 0 ${spacing[5]};
  line-height: 1.6;
`;

const buttonRowStyle = css`
  display: flex;
  gap: ${spacing[3]};
  justify-content: flex-end;
`;

const singleButtonRowStyle = css`
  display: flex;
  justify-content: flex-end;
`;

export function AlertDialog({
  isOpen,
  onClose,
  title,
  description,
  confirmLabel = '확인',
}: AlertDialogProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} width="400px">
      {description !== undefined && <p css={descriptionStyle}>{description}</p>}
      <div css={singleButtonRowStyle}>
        <Button variant="primary" size="medium" onClick={onClose}>
          {confirmLabel}
        </Button>
      </div>
    </Modal>
  );
}

export function ConfirmDialog({
  isOpen,
  onConfirm,
  onCancel,
  title,
  description,
  confirmLabel = '확인',
  cancelLabel = '취소',
  destructive = false,
}: ConfirmDialogProps) {
  return (
    <Modal isOpen={isOpen} onClose={onCancel} title={title} width="400px">
      {description !== undefined && <p css={descriptionStyle}>{description}</p>}
      <div css={buttonRowStyle}>
        <Button variant="secondary" size="medium" onClick={onCancel}>
          {cancelLabel}
        </Button>
        <Button variant={destructive ? 'danger' : 'primary'} size="medium" onClick={onConfirm}>
          {confirmLabel}
        </Button>
      </div>
    </Modal>
  );
}
