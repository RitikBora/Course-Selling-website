/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["ui" , "store" , "db"],
  basePath: '/admin',
  assetPrefix:'/admin'
}

module.exports = nextConfig
