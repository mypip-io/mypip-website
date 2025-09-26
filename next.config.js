/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ['cdn.sanity.io'],
  },
}

module.exports = nextConfig