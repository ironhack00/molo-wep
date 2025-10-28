/**
 * Data: Marketing Services
 * Datos de servicios de marketing
 * Los textos se obtienen de messages/[locale].json usando marketing.services.[id]
 */

export interface MarketingService {
  id: string;
  icon: string;
  iconAlt: string;
}

export const marketingServices: MarketingService[] = [
  {
    id: "community-manager",
    icon: "/icons/marketing/community.webp",
    iconAlt: "Community Manager",
  },
  {
    id: "marketing-digital",
    icon: "/icons/marketing/digital.webp",
    iconAlt: "Digital Marketing",
  },
  {
    id: "diseno-grafico",
    icon: "/icons/marketing/design.webp",
    iconAlt: "Graphic Design",
  },
  {
    id: "seo",
    icon: "/icons/marketing/seo.webp",
    iconAlt: "SEO Organic Positioning",
  },
  {
    id: "audiovisual",
    icon: "/icons/marketing/video.webp",
    iconAlt: "Audiovisual Design",
  },
  {
    id: "meta-ads",
    icon: "/icons/marketing/meta.webp",
    iconAlt: "Meta Ads Advertising",
  },
  {
    id: "google-ads",
    icon: "/icons/marketing/google-ads.webp",
    iconAlt: "Google Ads Advertising",
  },
];

