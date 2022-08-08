/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['http2.mlstatic.com']
  },
  output: 'standalone',
}

module.exports = nextConfig
