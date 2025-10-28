/**
 * Data: Web Development Services
 * Servicios de diseño web
 * Los textos se obtienen de messages/[locale].json usando development.services.[id]
 */

export interface DevelopmentService {
  id: string;
  icon: string;
  iconAlt: string;
}

export const developmentServices: DevelopmentService[] = [
  {
    id: "corporate",
    icon: "/icons/development/corporate.webp",
    iconAlt: "Corporate Websites",
  },
  {
    id: "ecommerce",
    icon: "/icons/development/ecommerce.webp",
    iconAlt: "Ecommerce Platform",
  },
  {
    id: "landing",
    icon: "/icons/development/landing.webp",
    iconAlt: "Landing Pages",
  },
  {
    id: "redesign",
    icon: "/icons/development/redesign.webp",
    iconAlt: "Website Redesign",
  },
];

