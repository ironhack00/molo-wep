/**
 * Data: Featured Projects
 * Proyectos destacados de desarrollo web
 * Los títulos se usan solo para alt text de imágenes
 */

export interface FeaturedProject {
  id: string;
  image: string;
  imageAlt: string;
  link: string;
}

export const featuredProjects: FeaturedProject[] = [
  {
    id: "project-1",
    image: "/images/development/project-1.webp",
    imageAlt: "Pro Paint Designers - Sitio Web Profesional",
    link: "https://www.propaintdesigners.com",
  },
  {
    id: "project-2",
    image: "/images/development/project-2.webp",
    imageAlt: "Odevelyn Carmona - Sitio Web Profesional",
    link: "https://www.odevelyncarmona.com",
  },
  {
    id: "project-3",
    image: "/images/development/project-3.webp",
    imageAlt: "Missim Accounting - Sitio Web Profesional",
    link: "https://www.missimaccounting.com",
  },
  {
    id: "project-4",
    image: "/images/development/project-4.webp",
    imageAlt: "Xavier - Sitio Web Profesional",
    link: "https://sitio-web-xavier.vercel.app",
  },
  {
    id: "project-5",
    image: "/images/development/project-5.webp",
    imageAlt: "P&A - Sitio Web Profesional",
    link: "https://p-a-web.vercel.app",
  },
];

