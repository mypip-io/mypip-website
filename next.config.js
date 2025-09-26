/** @type {import('next').NextConfig} */
const nextConfig = {
  // Essential for Railway deployment
  output: 'standalone',

  // Image optimization
  images: {
    domains: ['cdn.sanity.io'],
  },

  // Clean minimal configuration
  generateEtags: true,
  poweredByHeader: false,
  compress: true,
  trailingSlash: false,
}

module.exports = nextConfig