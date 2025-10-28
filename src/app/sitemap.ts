import { MetadataRoute } from 'next';
import { SEO_CONFIG, SERVICE_URLS } from '@/data/seo';
import axios from 'axios';

/**
 * Sitemap dinámico optimizado para SEO
 * Actualizado automáticamente con cada deploy
 * Incluye posts del blog desde la API
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SEO_CONFIG.siteUrl;
  const now = new Date();

  // Obtener posts del blog
  let blogPosts: Array<{ id: string; fecha_publicacion: string }> = [];
  try {
    const { data } = await axios.get('https://blog-molokaih.onrender.com/api/posteos?page=1&sort=latest');
    blogPosts = data.data || [];
  } catch {
    // Si falla la API, continuar sin posts del blog
    blogPosts = [];
  }

  return [
    // Página principal - Máxima prioridad
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    
    // Páginas de servicios - Alta prioridad
    {
      url: `${baseUrl}${SERVICE_URLS.development}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}${SERVICE_URLS.design}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}${SERVICE_URLS.marketing}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}${SERVICE_URLS.automation}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}${SERVICE_URLS.googleAds}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    
    // Otras páginas importantes
    {
      url: `${baseUrl}/nosotros`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/casos-de-exito`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contacto`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.7,
    },
    
    // Páginas legales
    {
      url: `${baseUrl}/terminos-y-condiciones`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/politica-de-privacidad`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    
    // Posts del blog - dinámicamente desde la API
    ...blogPosts.map((post) => ({
      url: `${baseUrl}/blog/${post.id}`,
      lastModified: new Date(post.fecha_publicacion),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ];
}

