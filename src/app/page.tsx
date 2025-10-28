import type { Metadata } from "next";
import { SEO_CONFIG } from "@/data/seo";
import { JsonLd } from "@/components/atoms/JsonLd";
import { generateHomePageSchemas, generateFAQSchema } from "@/utils/schema";
import { HomeTemplate } from "@/components/templates/HomeTemplate";

/**
 * Metadatos optimizados para la página principal
 * Máxima optimización para SEO e IAs
 */
export const metadata: Metadata = {
  title: "Ecosistema de Soluciones Digitales | Desarrollo Web, Marketing y Automatización",
  description: "Transformamos ideas en resultados. Desarrollo web, marketing inteligente y automatización que impulsan tu crecimiento.",
  keywords: [...SEO_CONFIG.keywords],
  authors: [{ name: SEO_CONFIG.siteName, url: SEO_CONFIG.siteUrl }],
  
  alternates: {
    canonical: '/',
  },
  
  openGraph: {
    title: "Tu Ecosistema de Soluciones Digitales | Molokaih",
    description: "Creamos soluciones integrales que conectan tecnología, marketing y automatización de procesos para escalar tu negocio.",
    type: "website",
    locale: "es_ES",
    url: SEO_CONFIG.siteUrl,
    siteName: SEO_CONFIG.siteName,
    images: [
      {
        url: SEO_CONFIG.ogImage,
        width: SEO_CONFIG.ogImageWidth,
        height: SEO_CONFIG.ogImageHeight,
        alt: "Molokaih - Ecosistema de Soluciones Digitales",
      },
    ],
  },
  
  twitter: {
    card: "summary_large_image",
    title: "Ecosistema de Soluciones Digitales | Molokaih",
    description: "Desarrollo web, marketing digital y automatización para hacer crecer tu empresa.",
    images: [SEO_CONFIG.ogImage],
  },
};

/**
 * Página principal con datos estructurados para SEO
 * Server Component - importa directamente el template
 */
export default function page() {
  return (
    <>
      {/* JSON-LD para Google y otras IAs */}
      <JsonLd 
        id="home-structured-data"
        data={generateHomePageSchemas()} 
      />
      <JsonLd 
        id="faq-structured-data"
        data={generateFAQSchema()} 
      />
      
      <HomeTemplate />
    </>
  );
}
