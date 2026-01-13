/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['three'],
  output: 'export',
  basePath: process.env.GITHUB_PAGES ? '/saylordamasceno' : '',
  assetPrefix: process.env.GITHUB_PAGES ? '/saylordamasceno/' : '',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
