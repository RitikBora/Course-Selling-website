/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["ui" , "store" , "db"],
  basePath: '/coursera/admin',
  assetPrefix:'/coursera/admin'
}

module.exports = nextConfig
