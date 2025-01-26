/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_HOST}/api/:path*`, 
      },
    ]
  }, 
  images: {
    unoptimized: true,
    domains: ['tile.openstreetmap.org'],
  },
}

module.exports = nextConfig