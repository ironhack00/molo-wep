import type { Metadata } from "next";
import { AboutTemplate } from "@/components/templates/AboutTemplate";
import { JsonLd } from "@/components/atoms/JsonLd";
import { cookies } from 'next/headers';

/**
 * Metadata optimizado para SEO - Página About
 * Incluye: Open Graph, Twitter Cards, Keywords, Canonical URL
 */
export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale = cookieStore.get('locale')?.value || 'en';
  const messages = (await import(`../../../messages/${locale}.json`)).default;

  return {
    title: messages.pageTitles.about,
    description: "Meet Molokaih, your ally in digital transformation. We combine web development, marketing and technology to drive your business.",
    keywords: [
      "molokaih",
      "about us",
      "digital agency",
      "development team",
      "company values",
      "mission vision",
      "digital transformation",
      "molokaih team",
    ],
    alternates: {
      canonical: "/about",
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
      title: messages.pageTitles.about,
      description: "Meet Molokaih, your ally in digital transformation. We combine web development, marketing and technology to drive your business.",
      type: "website",
      url: "/about",
      siteName: "Molokaih",
    },
    twitter: {
      card: "summary_large_image",
      title: messages.pageTitles.about,
      description: "Meet Molokaih, your ally in digital transformation. We combine web development, marketing and technology to drive your business.",
    },
  };
}

/**
 * Page: About
 * Página sobre nosotros con JSON-LD
 */
export default async function AboutPage() {
  const cookieStore = await cookies();
  const locale = cookieStore.get('locale')?.value || 'en';

  const schemas = {
    en: {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "name": "About Us - Molokaih",
      "description": "Meet Molokaih, agency specialized in digital transformation",
      "mainEntity": {
        "@type": "Organization",
        "name": "Molokaih",
        "url": "https://molokaih.com",
        "description": "Digital agency specialized in web development, marketing and technological solutions",
        "foundingDate": "2023",
        "numberOfEmployees": {
          "@type": "QuantitativeValue",
          "value": "10+"
        },
        "slogan": "Innovation and digital solutions for your company's success"
      }
    },
    es: {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "name": "Sobre Nosotros - Molokaih",
      "description": "Conoce a Molokaih, agencia especializada en transformación digital",
      "mainEntity": {
        "@type": "Organization",
        "name": "Molokaih",
        "url": "https://molokaih.com",
        "description": "Agencia digital especializada en desarrollo web, marketing y soluciones tecnológicas",
        "foundingDate": "2023",
        "numberOfEmployees": {
          "@type": "QuantitativeValue",
          "value": "10+"
        },
        "slogan": "Innovación y soluciones digitales para el éxito de tu empresa"
      }
    }
  };

  const aboutSchema = schemas[locale as keyof typeof schemas] || schemas.en;

  return (
    <>
      <JsonLd data={aboutSchema} />
      <AboutTemplate />
    </>
  );
}

