/** @type {import('next').NextConfig} */
// Default to 5000 for local dev since docker-compose maps backend to 5000
const backendOrigin = process.env.BACKEND_ORIGIN || 'http://localhost:5000'

const nextConfig = {
  reactStrictMode: true,
  // Enable polling for file changes in Docker
  webpackDevMiddleware: (config) => {
    config.watchOptions = {
      poll: 1000, // Check for changes every second
      aggregateTimeout: 300, // Delay before rebuilding
    }
    return config
  },
  async rewrites() {
    return [
      { source: '/api/:path*', destination: `${backendOrigin}/api/:path*` },
      { source: '/uploads/:path*', destination: `${backendOrigin}/uploads/:path*` }
    ]
  }
}

module.exports = nextConfig
