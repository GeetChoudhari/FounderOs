/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimize for Vercel deployment and prize criteria
  experimental: {
    // Server components for better performance
    serverComponentsExternalPackages: ['langchain', 'tavily'],
  },
  
  // Performance optimizations for Vercel prize
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Image optimization for Canadian startup logos/content
  images: {
    domains: [
      'images.unsplash.com',
      'cdn.canada.ca',
      'innovation.canada.ca',
      'bdc.ca'
    ],
    formats: ['image/webp', 'image/avif'],
  },
  
  // Headers for security and performance
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
  
  // Environment variables for our APIs
  env: {
    ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY,
    TAVILY_API_KEY: process.env.TAVILY_API_KEY,
    VERCEL_ANALYTICS_ID: process.env.VERCEL_ANALYTICS_ID,
  },
}

module.exports = nextConfig