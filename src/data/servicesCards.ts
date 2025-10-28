/**
 * Datos de las cards de servicios
 * Centraliza contenido y colores
 * Los textos se obtienen de messages/[locale].json usando servicesCards.[id]
 */

export interface ServiceCard {
  id: string;
  bgColor: string;
  image: string;
  imageAlt: string;
}

export const servicesCardsData: ServiceCard[] = [
  {
    id: "webDev",
    bgColor: "#007bff", // Azul - Development
    image: "/images/services/software-development.webp",
    imageAlt: "Software Development"
  },
  {
    id: "design",
    bgColor: "#ff6b00", // Naranja - Custom Software
    image: "/images/services/softw.webp",
    imageAlt: "UX/UI Design"
  },
  {
    id: "marketing",
    bgColor: "#6c63ff", // Morado - Marketing
    image: "/images/services/digital-marketing.webp",
    imageAlt: "Digital Marketing"
  },
  {
    id: "automation",
    bgColor: "#00d4aa", // Turquesa - Automation
    image: "/images/services/automation.webp",
    imageAlt: "Automation"
  },
];

