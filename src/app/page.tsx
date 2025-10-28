import type { Metadata } from "next";
import { SEO_CONFIG } from "@/data/seo";
import { JsonLd } from "@/components/atoms/JsonLd";
import { generateHomePageSchemas, generateFAQSchema } from "@/utils/schema";
import { HomeTemplate } from "@/components/templates/HomeTemplate";
import { cookies } from 'next/headers';

/**
 * Metadatos optimizados para la página principal
 * Máxima optimización para SEO e IAs
 */
export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale = cookieStore.get('locale')?.value || 'en';
  const messages = (await import(`../../messages/${locale}.json`)).default;

  return {
    title: messages.pageTitles.home,
    description: "Transformamos ideas en resultados. Desarrollo web, marketing inteligente y automatización que impulsan tu crecimiento.",
    keywords: [...SEO_CONFIG.keywords],
    authors: [{ name: SEO_CONFIG.siteName, url: SEO_CONFIG.siteUrl }],
    
    alternates: {
      canonical: '/',
    },
    
    openGraph: {
      title: messages.pageTitles.home,
      description: "Creamos soluciones integrales que conectan tecnología, marketing y automatización de procesos para escalar tu negocio.",
      type: "website",
      locale: locale === 'es' ? 'es_ES' : 'en_US',
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
      title: messages.pageTitles.home,
      description: "Desarrollo web, marketing digital y automatización para hacer crecer tu empresa.",
      images: [SEO_CONFIG.ogImage],
    },
  };
}

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
