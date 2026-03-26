/**
 * 아이콘 index.ts 자동 생성 스크립트
 *
 * icons:build 실행 후 generated/ 폴더를 읽어 index.ts 를 재생성합니다.
 * 직접 편집하지 마세요 — yarn workspace @mono/ui icons 를 통해 갱신됩니다.
 */
const fs = require('fs');
const path = require('path');

const GEN_DIR = path.join(__dirname, '../src/icons/generated');
const INDEX_FILE = path.join(GEN_DIR, 'index.ts');

const files = fs
  .readdirSync(GEN_DIR)
  .filter((f) => f.endsWith('.tsx'))
  .map((f) => f.replace('.tsx', ''))
  .sort();

if (files.length === 0) {
  console.warn('⚠️  generated/ 폴더가 비어 있습니다. icons:build 를 먼저 실행하세요.');
  process.exit(1);
}

const timestamp = new Date().toISOString().replace('T', ' ').slice(0, 19);

const content = [
  `// ⚠️ 자동 생성된 파일입니다. 수동으로 수정하지 마세요!`,
  `// 생성일시: ${timestamp}`,
  `// 재생성: yarn workspace @mono/ui icons`,
  ``,
  ...files.map((name) => `export * from './${name}';`),
  ``,
].join('\n');

fs.writeFileSync(INDEX_FILE, content, 'utf-8');
console.log(`✅ icons/generated/index.ts 재생성 완료 (${files.length}개 아이콘)`);
