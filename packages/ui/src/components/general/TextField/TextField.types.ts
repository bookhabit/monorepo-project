import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

export type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  title?: string;
  description?: string;
  errorMessage?: string;
  clearButton?: boolean;
  fullWidth?: boolean;
  onClear?: () => void;
};

export type SplitTextFieldProps = {
  length?: number;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  errorMessage?: string;
  autoFocus?: boolean;
};

export type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  title?: string;
  description?: string;
  errorMessage?: string;
  maxLength?: number;
  fullWidth?: boolean;
  autoResize?: boolean;
};
