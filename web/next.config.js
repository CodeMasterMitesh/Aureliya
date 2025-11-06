/** @type {import('next').NextConfig} */
const backendOrigin = process.env.BACKEND_ORIGIN || 'http://localhost:4100'

const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      { source: '/api/:path*', destination: `${backendOrigin}/api/:path*` },
      { source: '/uploads/:path*', destination: `${backendOrigin}/uploads/:path*` }
    ]
  }
}

module.exports = nextConfig
