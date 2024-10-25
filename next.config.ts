/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/squared-computing', // Add this if you're not using a custom domain
}

module.exports = nextConfig