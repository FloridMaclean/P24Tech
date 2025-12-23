/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Enable standalone output for better Hostinger deployment
  // This creates a minimal server with only necessary files
  // TEMPORARILY DISABLED: Uncomment to enable standalone mode
  // NOTE: When using standalone, use .next/standalone/server.js as startup file
  // output: 'standalone',
  
  // Ensure static files are properly served
  distDir: '.next',
  // Optimize images
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Disable image optimization if not using Next.js Image Optimization API
    // unoptimized: false, // Keep enabled for best performance
  },
  // Compression
  compress: true,
  // Production optimizations
  poweredByHeader: false,
  // Optimize for production
  swcMinify: true,
  // Ensure proper port handling for Hostinger
  experimental: {
    // Enable if needed for better performance
    // serverActions: true,
  },
  // Ensure static files are properly served
  // This helps with chunk loading issues
  assetPrefix: process.env.NODE_ENV === 'production' ? '' : undefined,
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig

