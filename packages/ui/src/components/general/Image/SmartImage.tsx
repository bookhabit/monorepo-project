/** @jsxImportSource @emotion/react */
'use client';

import { css } from '@emotion/react';
import { useEffect, useRef, useState } from 'react';
import { colors } from '../../../foundation/colors';
import type { SmartImageProps } from './Image.types';

type Status = 'idle' | 'loading' | 'loaded' | 'error';

// ─── 스켈레톤 shimmer ────────────────────────────────────────────────────────
const shimmer = css`
  @keyframes shimmer {
    0%   { background-position: -200% 0; }
    100% { background-position:  200% 0; }
  }
  background: linear-gradient(
    90deg,
    ${colors.grey100} 25%,
    ${colors.grey50}  50%,
    ${colors.grey100} 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.4s ease infinite;
`;

const wrapperStyle = (
  width: number | string | undefined,
  height: number | string | undefined,
  radius: number | string | undefined,
  clickable: boolean,
) => css`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${typeof width === 'number' ? `${width}px` : (width ?? '100%')};
  height: ${typeof height === 'number' ? `${height}px` : (height ?? '100%')};
  border-radius: ${typeof radius === 'number' ? `${radius}px` : (radius ?? '0')};
  overflow: hidden;
  background-color: ${colors.grey100};
  cursor: ${clickable ? 'pointer' : 'default'};
`;

const imgStyle = (fit: SmartImageProps['fit'], visible: boolean) => css`
  width: 100%;
  height: 100%;
  object-fit: ${fit ?? 'cover'};
  display: ${visible ? 'block' : 'none'};
`;

const skeletonStyle = css`
  position: absolute;
  inset: 0;
  ${shimmer};
`;

const fallbackStyle = css`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  color: ${colors.grey400};
`;

const fallbackIconStyle = css`
  width: 32px;
  height: 32px;
  color: ${colors.grey300};
`;

function DefaultFallback() {
  return (
    <div css={fallbackStyle}>
      <svg css={fallbackIconStyle} viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
        <path
          d="M3 15L8 10L12 14L16 11L21 15"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export function SmartImage({
  src,
  alt = '',
  width,
  height,
  fit = 'cover',
  fallback,
  borderRadius,
  onClick,
}: SmartImageProps) {
  const [status, setStatus] = useState<Status>('idle');
  const [objectUrl, setObjectUrl] = useState<string | null>(null);
  const prevUrlRef = useRef<string | null>(null);

  // File 객체 → objectURL 변환, 언마운트 시 해제
  useEffect(() => {
    if (src instanceof File) {
      const url = URL.createObjectURL(src);
      setObjectUrl(url);
      setStatus('loading');
      prevUrlRef.current = url;
      return () => {
        URL.revokeObjectURL(url);
        prevUrlRef.current = null;
      };
    } else {
      setObjectUrl(null);
      if (src) {
        setStatus('loading');
      } else {
        setStatus('idle');
      }
      return undefined;
    }
  }, [src]);

  const resolvedSrc = objectUrl ?? (typeof src === 'string' ? src : null);
  const showSkeleton = status === 'loading' || status === 'idle';
  const showImg = status === 'loading' || status === 'loaded';
  const showFallback = status === 'error' || (!src && status === 'idle');

  return (
    <div
      css={wrapperStyle(width, height, borderRadius, !!onClick)}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {showSkeleton && !showFallback && <div css={skeletonStyle} />}

      {resolvedSrc && showImg && (
        <img
          css={imgStyle(fit, status === 'loaded')}
          src={resolvedSrc}
          alt={alt}
          onLoad={() => setStatus('loaded')}
          onError={() => setStatus('error')}
        />
      )}

      {showFallback && (fallback ?? <DefaultFallback />)}
    </div>
  );
}
