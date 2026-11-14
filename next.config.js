/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 604800,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'wmjfvijkgsjqlpfjcioy.supabase.co',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'xngflcegntxcipnwggcs.supabase.co',
        pathname: '/**',
      },
    ],
  },
  async headers() {
    const media = 'public, max-age=86400, stale-while-revalidate=604800'
    return [
      { source: '/images/:path*', headers: [{ key: 'Cache-Control', value: media }] },
      { source: '/videos/:path*', headers: [{ key: 'Cache-Control', value: media }] },
    ]
  },
  async redirects() {
    return [
      {
        source: '/:lang(en|ar)/certifications',
        destination: '/:lang/quality',
        permanent: true,
      },
      {
        source: '/:lang(en|ar)/products/sallam-egyptian-rice',
        destination: '/:lang/products/sallam-egyptian-rice-5kg',
        permanent: true,
      },
    ]
  },
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },
  webpack: (config, { dev }) => {
    if (dev && process.env.DISABLE_HMR === 'true') {
      config.watchOptions = {
        ignored: /.*/,
      }
    }
    return config
  },
}

module.exports = nextConfig
