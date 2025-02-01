/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    domains: ['tile.openstreetmap.org'],
  },
}

module.exports = nextConfig