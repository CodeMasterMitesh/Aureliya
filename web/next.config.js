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
      // Backend API & uploads passthrough
      { source: '/api/:path*', destination: `${backendOrigin}/api/:path*` },
      { source: '/uploads/:path*', destination: `${backendOrigin}/uploads/:path*` },

      // Make login the homepage (render admin login at /)
      { source: '/', destination: '/admin/login' },

      // Clean admin URLs without /admin prefix
      { source: '/login', destination: '/admin/login' },
      { source: '/dashboard', destination: '/admin/dashboard' },
      { source: '/branches', destination: '/admin/branches' },
      { source: '/companies', destination: '/admin/companies' },
      { source: '/main-menus', destination: '/admin/main-menus' },
      { source: '/sub-menus', destination: '/admin/sub-menus' },
      { source: '/setup', destination: '/admin/setup' },
    ]
  },
  async redirects() {
    return [
      // Redirect legacy admin URLs to new clean paths
      { source: '/admin/login', destination: '/login', permanent: false },
      { source: '/admin/dashboard', destination: '/dashboard', permanent: false },
      { source: '/admin/masters/:path*', destination: '/masters/:path*', permanent: false },
      // Generic catch-all to drop the /admin prefix for any other pages
      { source: '/admin/:path*', destination: '/:path*', permanent: false },

      // Remove ecommerce storefront: send to dashboard
      { source: '/products', destination: '/dashboard', permanent: false },
      { source: '/products/:path*', destination: '/dashboard', permanent: false },
      { source: '/product/:path*', destination: '/dashboard', permanent: false },
      { source: '/cart', destination: '/dashboard', permanent: false },
      { source: '/checkout', destination: '/dashboard', permanent: false },
      { source: '/orders/:path*', destination: '/dashboard', permanent: false },
      { source: '/invoice/:path*', destination: '/dashboard', permanent: false },
    ]
  }
}

module.exports = nextConfig
