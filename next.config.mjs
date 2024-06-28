import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

export default withBundleAnalyzer({
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
    serverComponentsExternalPackages: ['argon2', 'node:crypto'],
  },
  webpack: (config) => {
    config.externals = [...config.externals, {
      "argon2": "argon2",
      "bcrypt": "bcrypt",
      "@mapbox/node-pre-gyp": "@mapbox/node-pre-gyp",
    }];
    return config;
  },
});
