/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    domains: ['tile.openstreetmap.org'],
  },
  // basePath: '/learnqtkenya', // Add this if you're not using a custom domain
}

module.exports = nextConfig