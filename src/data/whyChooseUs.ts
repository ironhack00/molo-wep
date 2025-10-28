/**
 * Datos de la sección "Por qué elegirnos"
 * Centraliza el contenido para fácil mantenimiento
 * Los textos se obtienen de messages/[locale].json usando whyChooseUs.item[id]
 */

export interface WhyChooseUsItem {
  id: string;
  image: string | string[]; // Puede ser una imagen o múltiples
  imageAlt: string | string[]; // Alt text para cada imagen
  icon?: string; // Icono opcional para el elemento
}

export const whyChooseUsData: WhyChooseUsItem[] = [
  {
    id: "item1",
    image: "/images/why-choose-us/project-1.webp",
    imageAlt: "Professional Brand Identity",
    icon: "/icons/buttons/icono-point.webp",
  },
  {
    id: "item2",
    image: "/images/why-choose-us/redes-sociales.webp",
    imageAlt: "Social Media Management",
    icon: "/icons/buttons/icono-point.webp",
  },
  {
    id: "item3",
    image: "/images/why-choose-us/publicidad-digital.webp",
    imageAlt: "Strategic Digital Advertising",
    icon: "/icons/buttons/icono-point.webp",
  },
  {
    id: "item4",
    image: "/images/why-choose-us/automatizacion-procesos.webp",
    imageAlt: "Digital Process Automation",
    icon: "/icons/buttons/icono-point.webp",
  },
  {
    id: "item5",
    image: "/images/why-choose-us/desarrollo-software.webp",
    imageAlt: "Custom Software Development",
    icon: "/icons/buttons/icono-point.webp",
  },
];
