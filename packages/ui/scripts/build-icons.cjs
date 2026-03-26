/**
 * 아이콘 빌드 스크립트
 *
 * src/icons/svg/{category}/*.svg → src/icons/generated/*.tsx 자동 변환
 *
 * 변환 규칙:
 * 1. SVG 내부 요소의 stroke/strokeWidth/strokeLinecap/strokeLinejoin 제거
 *    → 부모 <svg>에서 color/strokeWidth props로 일괄 적용 (상속)
 * 2. fill="currentColor"는 유지 (명시적 채움 아이콘: MoreVertical 등)
 * 3. SVG 속성 → JSX 카멜케이스 변환
 * 4. IconProps 인터페이스 주입
 *
 * 피그마 익스포트 → preprocess-svg.cjs → build-icons.cjs
 */
const fs = require('fs');
const path = require('path');

const SVG_DIR = path.join(__dirname, '../src/icons/svg');
const GEN_DIR = path.join(__dirname, '../src/icons/generated');

// ─── 유틸 ────────────────────────────────────────────────────────────────────

/** kebab-case → PascalCase (home → Home, chevron-left → ChevronLeft) */
function toPascalCase(str) {
  return str.replace(/(^\w|-\w)/g, (c) => c.replace('-', '').toUpperCase());
}

/** SVG 속성 → JSX 카멜케이스 */
function svgAttrToJsx(content) {
  return content
    .replace(/stroke-width=/g, 'strokeWidth=')
    .replace(/stroke-linecap=/g, 'strokeLinecap=')
    .replace(/stroke-linejoin=/g, 'strokeLinejoin=')
    .replace(/fill-rule=/g, 'fillRule=')
    .replace(/clip-rule=/g, 'clipRule=')
    .replace(/xlink:href=/g, 'xlinkHref=')
    .replace(/class=/g, 'className=');
}

/**
 * 자식 요소에서 부모 <svg>가 담당할 속성 제거
 * fill="currentColor"는 명시적 채움이므로 유지
 */
function stripInheritedAttrs(content) {
  return content
    // stroke="..." 제거 (부모 svg에서 상속)
    .replace(/\s+stroke="[^"]*"/g, '')
    // stroke-width / strokeWidth 제거 (부모 svg에서 상속)
    .replace(/\s+stroke-width="[^"]*"/g, '')
    .replace(/\s+strokeWidth=\{[^}]*\}/g, '')
    .replace(/\s+strokeWidth="[^"]*"/g, '')
    // stroke-linecap / strokeLinecap 제거
    .replace(/\s+stroke-linecap="[^"]*"/g, '')
    .replace(/\s+strokeLinecap="[^"]*"/g, '')
    // stroke-linejoin / strokeLinejoin 제거
    .replace(/\s+stroke-linejoin="[^"]*"/g, '')
    .replace(/\s+strokeLinejoin="[^"]*"/g, '');
}

/** SVG 파일에서 inner content 추출 */
function extractInner(svgContent) {
  const match = svgContent.match(/<svg[^>]*>([\s\S]*?)<\/svg>/);
  if (!match) throw new Error('Invalid SVG: no <svg> tag found');
  return match[1].trim();
}

/** TSX 컴포넌트 코드 생성 */
function generateComponent(name, innerJsx) {
  return `/** @jsxImportSource @emotion/react */
// ⚠️ 자동 생성된 파일입니다. 수동으로 수정하지 마세요!
// 재생성: yarn workspace @mono/ui icons
'use client';

import type { IconProps } from '../types';

export function ${name}Icon({
  size = 24,
  color = 'currentColor',
  strokeWidth = 1.8,
  className,
  'aria-label': ariaLabel,
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ color }}
      className={className}
      aria-label={ariaLabel}
      aria-hidden={!ariaLabel}
    >
      ${innerJsx}
    </svg>
  );
}
`;
}

// ─── 메인 ────────────────────────────────────────────────────────────────────

const getAllSvgFiles = (dir) => {
  const results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...getAllSvgFiles(fullPath));
    } else if (entry.name.endsWith('.svg')) {
      results.push(fullPath);
    }
  }
  return results;
};

const build = () => {
  const files = getAllSvgFiles(SVG_DIR);

  if (files.length === 0) {
    console.warn('⚠️  SVG 파일이 없습니다. icons:pre 를 먼저 실행했는지 확인하세요.');
    process.exit(1);
  }

  // generated/ 디렉토리 초기화
  if (fs.existsSync(GEN_DIR)) {
    fs.readdirSync(GEN_DIR)
      .filter((f) => f.endsWith('.tsx'))
      .forEach((f) => fs.unlinkSync(path.join(GEN_DIR, f)));
  } else {
    fs.mkdirSync(GEN_DIR, { recursive: true });
  }

  const generated = [];

  files.forEach((filePath) => {
    const filename = path.basename(filePath, '.svg'); // e.g. "chevron-left"
    const componentName = toPascalCase(filename);     // e.g. "ChevronLeft"

    let svgContent = fs.readFileSync(filePath, 'utf8');

    // 1. inner content 추출
    let inner = extractInner(svgContent);

    // 2. 부모에서 상속될 stroke 관련 속성 제거
    inner = stripInheritedAttrs(inner);

    // 3. SVG 속성 → JSX 카멜케이스
    inner = svgAttrToJsx(inner);

    // 4. 컴포넌트 생성
    const code = generateComponent(componentName, inner);
    const outPath = path.join(GEN_DIR, `${componentName}.tsx`);
    fs.writeFileSync(outPath, code, 'utf-8');
    generated.push(componentName);
  });

  console.log(`✅ ${generated.length}개 아이콘 컴포넌트 생성: ${generated.join(', ')}`);
};

build();
