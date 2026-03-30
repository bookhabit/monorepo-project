const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const projectRoot = __dirname;
const monorepoRoot = path.resolve(projectRoot, '../../..');

const config = getDefaultConfig(projectRoot);

// 모노레포 루트까지 감시 — packages/* 공유 모듈 변경 사항 반영
config.watchFolders = [monorepoRoot];

// 모듈 해석 순서: 앱 자체 node_modules → 모노레포 루트 node_modules
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(monorepoRoot, 'node_modules'),
];

module.exports = config;
