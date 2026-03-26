import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@mono/ui', '@mono/shared'],
  // emotion: true를 제거 — RSC 컨텍스트에서 @emotion/react JSX 런타임 주입 방지
  // 각 'use client' 파일에서 /** @jsxImportSource @emotion/react */ pragma 사용
};

export default nextConfig;
