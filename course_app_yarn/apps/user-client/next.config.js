/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['ui' , 'store' , 'db'],
  assetPrefix: '/users',
  basePath: '/users'
}

module.exports = nextConfig
