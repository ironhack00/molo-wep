import { MetadataRoute } from 'next';
import { SEO_CONFIG } from '@/data/seo';

/**
 * Robots.txt optimizado para SEO
 * Permite máxima indexación mientras protege rutas sensibles
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/_next/',
          '/private/',
        ],
      },
      // Reglas específicas para bots de IAs
      {
        userAgent: ['GPTBot', 'ChatGPT-User', 'Claude-Web', 'Google-Extended'],
        allow: '/',
        disallow: ['/api/', '/admin/'], // Permiten acceso para entrenamiento
      },
    ],
    sitemap: `${SEO_CONFIG.siteUrl}/sitemap.xml`,
    host: SEO_CONFIG.siteUrl,
  };
}

