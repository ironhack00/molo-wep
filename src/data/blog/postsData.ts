/**
 * Data: Blog Posts
 * Artículos del blog
 */

export interface BlogPost {
  id: string;
  title: string;
  description: string;
  date: string;
  coverImage: string;
  category: string;
  readTime: number; // en minutos
}

export const blogPosts: BlogPost[] = [
  {
    id: "introduccion-desarrollo-web-moderno",
    title: "Introducción al Desarrollo Web Moderno",
    description: "Explora las tecnologías y herramientas más importantes para el desarrollo web actual, desde React hasta Next.js.",
    date: "2024-01-15",
    coverImage: "https://images.unsplash.com/photo-1580130037666-564e0f29cbae?q=80&w=1169&auto=format&fit=crop",
    category: "Desarrollo",
    readTime: 5,
  },
  {
    id: "guia-completa-tailwind-css",
    title: "Guía Completa de Tailwind CSS",
    description: "Aprende a dominar Tailwind CSS, el framework de utilidades que está revolucionando el diseño web.",
    date: "2024-01-10",
    coverImage: "https://images.unsplash.com/photo-1565489030990-e211075fe11c?q=80&w=627&auto=format&fit=crop",
    category: "Diseño",
    readTime: 7,
  },
  {
    id: "mejores-practicas-react-2024",
    title: "Mejores Prácticas de React en 2024",
    description: "Descubre las mejores prácticas y patrones más actuales para desarrollar aplicaciones React eficientes y mantenibles.",
    date: "2024-01-05",
    coverImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1170&auto=format&fit=crop",
    category: "React",
    readTime: 8,
  },
  {
    id: "typescript-para-principiantes",
    title: "TypeScript para Principiantes",
    description: "Una introducción completa a TypeScript, desde los conceptos básicos hasta técnicas avanzadas para mejorar tu código JavaScript.",
    date: "2023-12-28",
    coverImage: "https://images.unsplash.com/photo-1579820010410-c10411aaaa88?q=80&w=1170&auto=format&fit=crop",
    category: "TypeScript",
    readTime: 6,
  },
  {
    id: "optimizacion-rendimiento-web",
    title: "Optimización de Rendimiento Web",
    description: "Técnicas esenciales para mejorar la velocidad de carga y el rendimiento general de tus aplicaciones web.",
    date: "2023-12-20",
    coverImage: "https://images.unsplash.com/photo-1689308271305-58e75832289b?q=80&w=1170&auto=format&fit=crop",
    category: "Performance",
    readTime: 10,
  },
  {
    id: "nextjs-app-router-guia",
    title: "Next.js App Router: Guía Completa",
    description: "Todo lo que necesitas saber sobre el nuevo App Router de Next.js 13+ y cómo migrar tus proyectos.",
    date: "2023-12-15",
    coverImage: "https://images.unsplash.com/photo-1618477247222-acbdb0e159b3?q=80&w=1170&auto=format&fit=crop",
    category: "Next.js",
    readTime: 12,
  },
  {
    id: "seo-para-desarrolladores",
    title: "SEO para Desarrolladores: Guía Práctica",
    description: "Aprende las técnicas esenciales de SEO que todo desarrollador web debe conocer para mejorar el posicionamiento.",
    date: "2023-12-10",
    coverImage: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=1174&auto=format&fit=crop",
    category: "Performance",
    readTime: 9,
  },
  {
    id: "ui-ux-tendencias-2024",
    title: "Tendencias UI/UX para 2024",
    description: "Descubre las últimas tendencias en diseño de interfaces y experiencia de usuario que dominarán este año.",
    date: "2023-12-05",
    coverImage: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1164&auto=format&fit=crop",
    category: "Diseño",
    readTime: 7,
  },
  {
    id: "testing-react-jest",
    title: "Testing en React con Jest y React Testing Library",
    description: "Una guía completa sobre cómo escribir tests efectivos para tus componentes React.",
    date: "2023-11-28",
    coverImage: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?q=80&w=1228&auto=format&fit=crop",
    category: "React",
    readTime: 11,
  },
  {
    id: "futuro-diseno-web-web-design-company",
    title: "El Futuro del Diseño Web: Más Allá de una Web Design Company Tradicional",
    description: "El futuro del diseño web trasciende a una simple web design company: integra innovación, experiencia de usuario, automatización y estrategias digitales que impulsan marcas en entornos competitivos.",
    date: "2024-01-20",
    coverImage: "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=1364&auto=format&fit=crop",
    category: "Diseño",
    readTime: 8,
  },
  {
    id: "google-advertising-services-ia",
    title: "Google Advertising Services + IA: La Nueva Era de la Publicidad Escalable",
    description: "Google Advertising Services y la inteligencia artificial están revolucionando la publicidad digital. Descubre cómo la IA está transformando las campañas publicitarias para hacerlas más efectivas y escalables.",
    date: "2024-01-18",
    coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1315&auto=format&fit=crop",
    category: "Marketing",
    readTime: 10,
  },
];

export const categories = [
  "Todos",
  "Desarrollo",
  "Diseño",
  "React",
  "TypeScript",
  "Performance",
  "Next.js",
  "Marketing",
];

