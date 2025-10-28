import type { Metadata } from "next";
import { DevelopmentTemplate } from "@/components/templates/DevelopmentTemplate";
import { JsonLd } from "@/components/atoms/JsonLd";
import { cookies } from 'next/headers';

/**
 * Metadata optimizado para SEO - Página de Desarrollo Web
 * Incluye: Open Graph, Twitter Cards, Keywords, Canonical URL
 */
export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale = cookieStore.get('locale')?.value || 'en';
  const messages = (await import(`../../../messages/${locale}.json`)).default;

  return {
    title: messages.pageTitles.development,
    description: "Tu sitio web es la cara digital de una marca. En Molokaih creamos sitios que combinan estética, velocidad y SEO.",
    keywords: [
      "diseño web",
      "desarrollo web",
      "sitios web modernos",
      "páginas web profesionales",
      "diseño responsive",
      "optimización SEO",
      "desarrollo frontend",
      "sitios rápidos",
      "web performance",
      "diseño UX/UI",
    ],
    alternates: {
      canonical: "/development",
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
      title: messages.pageTitles.development,
      description: "Tu sitio web es la cara digital de una marca. En Molokaih creamos sitios que combinan estética, velocidad y SEO.",
      type: "website",
      url: "/development",
      siteName: "Molokaih",
    },
    twitter: {
      card: "summary_large_image",
      title: messages.pageTitles.development,
      description: "Tu sitio web es la cara digital de una marca. En Molokaih creamos sitios que combinan estética, velocidad y SEO.",
    },
  };
}

/**
 * JSON-LD Schema para Desarrollo Web
 */
const developmentSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Diseño y Desarrollo Web",
  "description": "Creación de sitios web modernos, rápidos y optimizados para SEO",
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
    "name": "Servicios de Desarrollo Web",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Sitios Web Corporativos",
          "description": "Sitios web profesionales para empresas"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "E-commerce",
          "description": "Tiendas online completas y escalables"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Landing Pages",
          "description": "Páginas de destino optimizadas para conversión"
        }
      }
    ]
  }
};

/**
 * Page: Development
 * Página principal de servicios de desarrollo web
 * Con JSON-LD para Rich Snippets
 */
export default function DevelopmentPage() {
  return (
    <>
      <JsonLd data={developmentSchema} />
      <DevelopmentTemplate />
    </>
  );
}

