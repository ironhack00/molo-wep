import type { NextConfig } from "next";

/**
 * Configuración de Next.js optimizada para SEO y rendimiento
 * Nivel Senior - Mejores prácticas
 */
const nextConfig: NextConfig = {
  // Optimización de imágenes
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.pixabay.com',
      },
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 año
  },

  // Compresión
  compress: true,

  // Headers de seguridad y rendimiento
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
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
        ],
      },
      // Cache estático agresivo
      {
        source: '/assets/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // Cache para videos
      {
        source: '/videos/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  // React strict mode
  reactStrictMode: true,

  // PoweredBy header removido (seguridad)
  poweredByHeader: false,

  // Experimental features para mejor rendimiento
  experimental: {
    optimizePackageImports: [
      'framer-motion',
      '@radix-ui/react-icons',
      '@tabler/icons-react',
      'gsap',
      'swiper',
      'react-hook-form',
      '@hookform/resolvers',
    ],
    esmExternals: true,
  },

  // Optimización de webpack para reducir JavaScript
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      // Optimización de chunks más agresiva
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          // Vendors principales
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
            priority: 10,
            maxSize: 200000, // 200KB máximo
          },
          // Framer Motion separado
          framerMotion: {
            test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
            name: 'framer-motion',
            chunks: 'all',
            priority: 20,
            maxSize: 100000, // 100KB máximo
          },
          // GSAP separado
          gsap: {
            test: /[\\/]node_modules[\\/]gsap[\\/]/,
            name: 'gsap',
            chunks: 'all',
            priority: 20,
            maxSize: 150000, // 150KB máximo
          },
          // Swiper separado
          swiper: {
            test: /[\\/]node_modules[\\/]swiper[\\/]/,
            name: 'swiper',
            chunks: 'all',
            priority: 20,
            maxSize: 100000, // 100KB máximo
          },
          // React Hook Form separado
          reactHookForm: {
            test: /[\\/]node_modules[\\/](react-hook-form|@hookform)[\\/]/,
            name: 'react-hook-form',
            chunks: 'all',
            priority: 20,
            maxSize: 50000, // 50KB máximo
          },
          // Chunks comunes más pequeños
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            priority: 5,
            maxSize: 100000, // 100KB máximo
          },
        },
      };

      // Optimización de módulos
      config.optimization.usedExports = true;
      config.optimization.sideEffects = false;
    }

    return config;
  },
};

export default nextConfig;
