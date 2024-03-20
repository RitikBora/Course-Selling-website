/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['ui' , 'store' , 'db'],
  assetPrefix: '/coursera/users',
  basePath: '/coursera/users'
}

module.exports = nextConfig
