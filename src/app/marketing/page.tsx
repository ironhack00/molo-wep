import type { Metadata } from "next";
import { MarketingTemplate } from "@/components/templates/MarketingTemplate";
import { JsonLd } from "@/components/atoms/JsonLd";

/**
 * Metadata optimizado para SEO - Página de Marketing
 * Incluye: Open Graph, Twitter Cards, Keywords, Canonical URL
 */
export const metadata: Metadata = {
  title: "Agencia de Marketing Digital y Google Ads",
  description: "Impulsamos tu presencia digital con campañas estratégicas en Google Ads, posicionamiento SEO y redes sociales para maximizar tu alcance y resultados.",
  keywords: [
    "marketing digital",
    "google ads",
    "gestión google ads",
    "agencia marketing",
    "seo",
    "posicionamiento seo",
    "redes sociales",
    "marketing de rendimiento",
    "campañas publicitarias",
    "publicidad online",
  ],
  alternates: {
    canonical: "/marketing",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: "Agencia de Marketing Digital y Google Ads",
    description: "Impulsamos tu presencia digital con campañas estratégicas en Google Ads, posicionamiento SEO y redes sociales.",
    type: "website",
    url: "/marketing",
    siteName: "Molokaih",
  },
  twitter: {
    card: "summary_large_image",
    title: "Agencia de Marketing Digital y Google Ads",
    description: "Impulsamos tu presencia digital con campañas estratégicas en Google Ads, posicionamiento SEO y redes sociales.",
  },
};

/**
 * JSON-LD Schema para Marketing Digital
 */
const marketingSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Marketing Digital y Google Ads",
  "description": "Servicios profesionales de marketing digital, gestión de Google Ads y posicionamiento SEO",
  "provider": {
    "@type": "Organization",
    "name": "Molokaih",
    "url": "https://molokaih.com"
  },
  "areaServed": {
    "@type": "Country",
    "name": "Global"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Servicios de Marketing Digital",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Google Ads Management",
          "description": "Gestión profesional de campañas de Google Ads"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "SEO",
          "description": "Posicionamiento orgánico en buscadores"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Social Media Marketing",
          "description": "Gestión de redes sociales y marketing de contenidos"
        }
      }
    ]
  }
};

/**
 * Page: Marketing
 * Página principal de servicios de marketing digital
 * Con JSON-LD para Rich Snippets
 */
export default function MarketingPage() {
  return (
    <>
      <JsonLd data={marketingSchema} />
      <MarketingTemplate />
    </>
  );
}

