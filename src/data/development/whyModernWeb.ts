/**
 * Data: Why Modern Web Matters
 * Por qué importa un sitio web moderno
 * Los textos se obtienen de messages/[locale].json usando development.why.[id]
 */

export interface WhyModernWebItem {
  id: string;
  icon: string;
  iconAlt: string;
}

export const whyModernWebData: WhyModernWebItem[] = [
  {
    id: "responsive",
    icon: "/icons/development/responsive.webp",
    iconAlt: "Responsive Design",
  },
  {
    id: "seo",
    icon: "/icons/development/seo.webp",
    iconAlt: "SEO and Performance",
  },
  {
    id: "branding",
    icon: "/icons/development/branding.webp",
    iconAlt: "Branding",
  },
];

