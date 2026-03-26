import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@mono/ui', '@mono/shared'],
  compiler: {
    emotion: true,
  },
};

export default nextConfig;
