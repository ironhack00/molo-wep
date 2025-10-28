/**
 * Data: Why Choose Molokaih - Development
 * Por qué elegir Molokaih para desarrollo web
 * Los textos se obtienen de messages/[locale].json usando development.whyChoose.[id]
 */

export interface WhyChooseDevItem {
  id: string;
  icon: string;
  iconAlt: string;
}

export const whyChooseDev: WhyChooseDevItem[] = [
  {
    id: "datos",
    icon: "/icons/development/data.webp",
    iconAlt: "Data Driven Decisions",
  },
  {
    id: "seoPerformance",
    icon: "/icons/development/performance.webp",
    iconAlt: "SEO and Performance",
  },
  {
    id: "branding",
    icon: "/icons/development/brand.webp",
    iconAlt: "Branding",
  },
];

