/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ['cdn.sanity.io'],
  },
  // Use proper typedRoutes location
  typedRoutes: true,
  // Disable headers that might cause issues
  generateEtags: false,
  poweredByHeader: false,
}

module.exports = nextConfig