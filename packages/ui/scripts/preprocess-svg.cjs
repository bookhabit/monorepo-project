/**
 * SVG 전처리 스크립트
 *
 * 피그마에서 익스포트한 SVG의 하드코딩된 색상을 currentColor로 교체합니다.
 * icons:build 전에 실행되어야 합니다.
 *
 * 사용법: node scripts/preprocess-svg.cjs
 */
const fs = require('fs');
const path = require('path');

const SVG_DIR = path.join(__dirname, '../src/icons/svg');

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

const preprocess = () => {
  const files = getAllSvgFiles(SVG_DIR);

  if (files.length === 0) {
    console.warn('⚠️  SVG 파일이 없습니다. src/icons/svg/ 에 SVG 파일을 추가하세요.');
    process.exit(1);
  }

  files.forEach((filePath) => {
    let content = fs.readFileSync(filePath, 'utf8');

    // fill="색상코드" → fill="currentColor" (none, white, currentColor 제외)
    content = content.replace(/fill="(?!none|white|currentColor)[^"]+"/g, 'fill="currentColor"');

    // stroke="색상코드" → stroke="currentColor" (none, white, currentColor 제외)
    content = content.replace(/stroke="(?!none|white|currentColor)[^"]+"/g, 'stroke="currentColor"');

    fs.writeFileSync(filePath, content);
  });

  console.log(`✨ ${files.length}개 SVG 전처리 완료 (currentColor 적용)`);
};

preprocess();
