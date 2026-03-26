export type ImageSource =
  | string        // 서버 URL
  | File          // 로컬 파일 (아직 업로드 전)
  | null
  | undefined;

export type SmartImageProps = {
  /** URL 문자열 또는 File 객체 */
  src: ImageSource;
  alt?: string;
  width?: number | string;
  height?: number | string;
  /** object-fit (기본: cover) */
  fit?: 'cover' | 'contain' | 'fill' | 'none';
  /** 로딩 실패 시 보여줄 커스텀 폴백 */
  fallback?: React.ReactNode;
  /** 추가 className */
  className?: string;
  borderRadius?: number | string;
  onClick?: () => void;
};

import type React from 'react';
