/**
 * Configuración centralizada de SEO
 * Reutilizable en toda la aplicación
 */

export const SEO_CONFIG = {
  // Información básica
  siteName: "Molokaih",
  siteUrl: "https://molokaih.com",
  defaultTitle: "Molokaih - Ecosistema de Soluciones Digitales",
  defaultDescription: "Transformamos ideas en resultados. Desarrollo web, marketing inteligente y automatización que impulsan tu crecimiento.",
  
  // Keywords principales
  keywords: [
    // Desarrollo
    "desarrollo web profesional",
    "desarrollo de software a medida",
    "empresa de desarrollo de software",
    "aplicaciones web personalizadas",
    "desarrollo frontend y backend",
    
    // Diseño
    "diseño web profesional",
    "diseño UI/UX",
    "empresa de diseño web",
    
    // Marketing
    "agencia de marketing digital",
    "agencia de marketing de rendimiento",
    "estrategias de marketing digital",
    "agencia de gestión de Google Ads",
    "campañas de Google Ads efectivas",
    "publicidad en redes sociales",
    
    // Automatización
    "automatización de procesos empresariales",
    "automatización de marketing",
    "automatización de flujos de trabajo",
    
    // Generales
    "soluciones digitales integrales",
    "transformación digital empresarial",
    "agencia digital full-service",
    "consultoría tecnológica",
  ],
  
  // Información de contacto y social
  contact: {
    email: "contacto@molokaih.com",
    phone: "+54 9 11 1234 5678",
    whatsapp: "5491112345678",
    address: {
      street: "Av. Ejemplo 123",
      city: "Buenos Aires",
      state: "CABA",
      country: "Argentina",
      zipCode: "1234",
    },
  },
  
  social: {
    facebook: "https://facebook.com/molokaih",
    instagram: "https://instagram.com/molokaih",
    linkedin: "https://linkedin.com/company/molokaih",
    twitter: "https://twitter.com/molokaih",
    youtube: "https://youtube.com/@molokaih",
  },
  
  // Imágenes para Open Graph
  ogImage: "/og-image.jpg",
  ogImageWidth: 1200,
  ogImageHeight: 630,
  
  // Configuración para IAs
  aiOptimization: {
    includeStructuredData: true,
    includeFAQSchema: true,
    includeOrganizationSchema: true,
    includeServiceSchema: true,
    includeReviewSchema: true,
  },
} as const;

/**
 * URLs de servicios
 */
export const SERVICE_URLS = {
  development: "/servicios/desarrollo-web",
  design: "/servicios/diseno-web",
  marketing: "/servicios/marketing-digital",
  automation: "/servicios/automatizacion",
  googleAds: "/servicios/google-ads",
} as const;

/**
 * Preguntas frecuentes para schema
 */
export const FAQ_DATA = [
  {
    question: "¿Qué servicios ofrece Molokaih?",
    answer: "Ofrecemos desarrollo web profesional, diseño UI/UX, marketing digital de rendimiento, gestión de campañas de Google Ads y automatización de procesos empresariales.",
  },
  {
    question: "¿Cuánto tiempo toma desarrollar un sitio web?",
    answer: "El tiempo varía según la complejidad del proyecto. Un sitio web básico puede tomar 2-4 semanas, mientras que proyectos más complejos pueden requerir 2-3 meses.",
  },
  {
    question: "¿Trabajan con empresas de cualquier tamaño?",
    answer: "Sí, trabajamos con startups, PyMEs y grandes empresas, adaptando nuestras soluciones a las necesidades específicas de cada cliente.",
  },
  {
    question: "¿Ofrecen soporte post-lanzamiento?",
    answer: "Sí, ofrecemos planes de soporte y mantenimiento continuo para asegurar que tu proyecto siempre esté actualizado y funcionando óptimamente.",
  },
  {
    question: "¿Qué tecnologías utilizan?",
    answer: "Utilizamos tecnologías modernas y probadas como React, Next.js, Node.js, TypeScript, Tailwind CSS, PostgreSQL, y herramientas de automatización líderes en la industria.",
  },
] as const;

