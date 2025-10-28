/**
 * Utilidades para generar Schema.org JSON-LD
 * Nivel Senior - Reutilizable y tipado
 */

import { SEO_CONFIG, FAQ_DATA } from "@/data/seo";

/**
 * Schema de Organization para toda la empresa
 */
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SEO_CONFIG.siteUrl}#organization`,
    "name": SEO_CONFIG.siteName,
    "url": SEO_CONFIG.siteUrl,
    "logo": `${SEO_CONFIG.siteUrl}/logo.png`,
    "image": `${SEO_CONFIG.siteUrl}${SEO_CONFIG.ogImage}`,
    "description": SEO_CONFIG.defaultDescription,
    "email": SEO_CONFIG.contact.email,
    "telephone": SEO_CONFIG.contact.phone,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": SEO_CONFIG.contact.address.street,
      "addressLocality": SEO_CONFIG.contact.address.city,
      "addressRegion": SEO_CONFIG.contact.address.state,
      "postalCode": SEO_CONFIG.contact.address.zipCode,
      "addressCountry": "AR",
    },
    "sameAs": [
      SEO_CONFIG.social.facebook,
      SEO_CONFIG.social.instagram,
      SEO_CONFIG.social.linkedin,
      SEO_CONFIG.social.twitter,
      SEO_CONFIG.social.youtube,
    ],
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": SEO_CONFIG.contact.phone,
        "contactType": "customer service",
        "availableLanguage": ["es", "en"],
        "areaServed": "AR",
      },
    ],
  };
}

/**
 * Schema de WebSite para la página principal
 */
export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SEO_CONFIG.siteUrl}#website`,
    "url": SEO_CONFIG.siteUrl,
    "name": SEO_CONFIG.siteName,
    "description": SEO_CONFIG.defaultDescription,
    "publisher": {
      "@id": `${SEO_CONFIG.siteUrl}#organization`,
    },
    "potentialAction": [
      {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": `${SEO_CONFIG.siteUrl}/search?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    ],
    "inLanguage": "es-ES",
  };
}

/**
 * Schema de BreadcrumbList para navegación
 */
// (Eliminado export sin uso: generateBreadcrumbSchema)
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `${SEO_CONFIG.siteUrl}${item.url}`,
    })),
  };
}

/**
 * Schema de Service para servicios específicos
 */
// (Eliminado export sin uso: generateServiceSchema)
export function generateServiceSchema(params: {
  name: string;
  description: string;
  url: string;
  image?: string;
  priceRange?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": params.name,
    "provider": {
      "@id": `${SEO_CONFIG.siteUrl}#organization`,
    },
    "name": params.name,
    "description": params.description,
    "url": `${SEO_CONFIG.siteUrl}${params.url}`,
    "image": params.image ? `${SEO_CONFIG.siteUrl}${params.image}` : undefined,
    "areaServed": {
      "@type": "Country",
      "name": "Argentina",
    },
    "availableChannel": {
      "@type": "ServiceChannel",
      "serviceUrl": `${SEO_CONFIG.siteUrl}${params.url}`,
    },
    "offers": {
      "@type": "Offer",
      "priceRange": params.priceRange || "$$",
      "priceCurrency": "USD",
    },
  };
}

/**
 * Schema de FAQPage para preguntas frecuentes
 */
export function generateFAQSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQ_DATA.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };
}

/**
 * Schema de AggregateRating para reseñas
 */
// (Eliminado export sin uso: generateAggregateRatingSchema)
export function generateAggregateRatingSchema(params: {
  ratingValue: number;
  reviewCount: number;
  bestRating?: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "AggregateRating",
    "ratingValue": params.ratingValue,
    "reviewCount": params.reviewCount,
    "bestRating": params.bestRating || 5,
    "worstRating": 1,
  };
}

/**
 * Schema de LocalBusiness para búsquedas locales
 */
export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SEO_CONFIG.siteUrl}#localbusiness`,
    "name": SEO_CONFIG.siteName,
    "image": `${SEO_CONFIG.siteUrl}${SEO_CONFIG.ogImage}`,
    "url": SEO_CONFIG.siteUrl,
    "telephone": SEO_CONFIG.contact.phone,
    "email": SEO_CONFIG.contact.email,
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": SEO_CONFIG.contact.address.street,
      "addressLocality": SEO_CONFIG.contact.address.city,
      "addressRegion": SEO_CONFIG.contact.address.state,
      "postalCode": SEO_CONFIG.contact.address.zipCode,
      "addressCountry": "AR",
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -34.6037,
      "longitude": -58.3816,
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "18:00",
      },
    ],
    "sameAs": [
      SEO_CONFIG.social.facebook,
      SEO_CONFIG.social.instagram,
      SEO_CONFIG.social.linkedin,
    ],
  };
}

/**
 * Schema combinado para la página principal
 */
export function generateHomePageSchemas() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      generateOrganizationSchema(),
      generateWebsiteSchema(),
      generateLocalBusinessSchema(),
    ],
  };
}

