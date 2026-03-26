/** @jsxImportSource @emotion/react */
'use client';

import { css } from '@emotion/react';
import { useRef, useState } from 'react';
import { SmartImage, Button, colors, typography, spacing } from '@mono/ui';
import { PreviewBox } from '@/components/PreviewBox';
import { CodeBlock } from '@/components/CodeBlock';

const pageStyle = css`
  padding: ${spacing[8]};
`;

const headingStyle = css`
  ${typography.heading1};
  color: ${colors.grey900};
  margin: 0 0 ${spacing[2]};
`;

const subheadingStyle = css`
  ${typography.body1};
  color: ${colors.grey500};
  margin: 0 0 ${spacing[8]};
`;

const rowStyle = css`
  display: flex;
  gap: ${spacing[4]};
  flex-wrap: wrap;
  align-items: flex-start;
`;

const labelStyle = css`
  ${typography.captionBold};
  color: ${colors.grey500};
  text-align: center;
  margin-top: ${spacing[2]};
`;

const captionBoxStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const fileUploadAreaStyle = css`
  border: 2px dashed ${colors.grey200};
  border-radius: 12px;
  padding: ${spacing[6]};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${spacing[3]};
  cursor: pointer;
  transition: border-color 0.15s ease, background-color 0.15s ease;

  &:hover {
    border-color: ${colors.blue300};
    background-color: ${colors.blue50};
  }
`;

const fileInputStyle = css`
  display: none;
`;

const uploadTextStyle = css`
  ${typography.body2};
  color: ${colors.grey500};
  text-align: center;
`;

function LocalFileDemo() {
  const [file, setFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) setFile(f);
  };

  return (
    <div css={css`display: flex; flex-direction: column; gap: ${spacing[4]};`}>
      {file ? (
        <div css={captionBoxStyle}>
          <SmartImage src={file} width={200} height={200} borderRadius={12} alt="로컬 미리보기" />
          <p css={labelStyle}>{file.name}</p>
          <Button variant="ghost" size="small" onClick={() => setFile(null)}>
            초기화
          </Button>
        </div>
      ) : (
        <div css={fileUploadAreaStyle} onClick={() => inputRef.current?.click()}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" color={colors.grey400}>
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            <polyline points="17 8 12 3 7 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="12" y1="3" x2="12" y2="15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          <p css={uploadTextStyle}>클릭하여 이미지 선택<br />(아직 업로드 전 로컬 미리보기)</p>
        </div>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        css={fileInputStyle}
        onChange={handleChange}
      />
    </div>
  );
}

const SERVER_IMAGES = [
  {
    url: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=300&q=80',
    label: '서버 이미지',
  },
  {
    url: 'https://this-url-does-not-exist.invalid/broken.jpg',
    label: '에러 폴백',
  },
];

export function ImageSection() {
  return (
    <div css={pageStyle}>
      <h1 css={headingStyle}>SmartImage</h1>
      <p css={subheadingStyle}>
        로컬 파일(File), 서버 URL, 로딩 스켈레톤, 에러 폴백을 하나의 컴포넌트로 처리합니다.
      </p>

      <PreviewBox title="로컬 파일 미리보기" description="파일 선택 시 URL.createObjectURL로 즉시 렌더링">
        <LocalFileDemo />
      </PreviewBox>

      <CodeBlock code={`// 로컬 파일 (업로드 전 미리보기)
const [file, setFile] = useState<File | null>(null);

<SmartImage src={file} width={200} height={200} borderRadius={12} />`} />

      <PreviewBox title="서버 이미지 & 에러 폴백" description="로딩 중 스켈레톤, 실패 시 기본 폴백 표시">
        <div css={rowStyle}>
          {SERVER_IMAGES.map(({ url, label }) => (
            <div key={url} css={captionBoxStyle}>
              <SmartImage src={url} width={160} height={120} borderRadius={8} alt={label} />
              <p css={labelStyle}>{label}</p>
            </div>
          ))}
        </div>
      </PreviewBox>

      <CodeBlock code={`// 서버 URL
<SmartImage src="https://cdn.example.com/photo.jpg" width={160} height={120} />

// 커스텀 에러 폴백
<SmartImage
  src={brokenUrl}
  fallback={<div>이미지를 불러올 수 없습니다</div>}
/>`} />

      <PreviewBox title="fit 옵션" description="object-fit 제어">
        <div css={rowStyle}>
          {(['cover', 'contain'] as const).map((fit) => (
            <div key={fit} css={captionBoxStyle}>
              <SmartImage
                src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=300&q=80"
                width={120}
                height={120}
                borderRadius={8}
                fit={fit}
                alt={fit}
              />
              <p css={labelStyle}>{fit}</p>
            </div>
          ))}
          <div css={captionBoxStyle}>
            <SmartImage src={null} width={120} height={120} borderRadius={8} alt="빈 src" />
            <p css={labelStyle}>src 없음</p>
          </div>
        </div>
      </PreviewBox>

      <CodeBlock code={`<SmartImage src={url} fit="cover"   width={120} height={120} />
<SmartImage src={url} fit="contain" width={120} height={120} />

// borderRadius
<SmartImage src={url} borderRadius={50} width={80} height={80} /> // 원형`} />
    </div>
  );
}
