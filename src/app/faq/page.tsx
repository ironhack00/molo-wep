import type { Metadata } from "next";
import { FAQTemplate } from "@/components/templates/FAQTemplate";
import { JsonLd } from "@/components/atoms/JsonLd";
import { generalFAQ } from "@/data/faq/faqData";
import { cookies } from 'next/headers';

/**
 * Metadata optimizado para SEO - Página FAQ
 * Incluye: Open Graph, Twitter Cards, Keywords, Canonical URL
 */
export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale = cookieStore.get('locale')?.value || 'en';
  const messages = (await import(`../../../messages/${locale}.json`)).default;

  return {
    title: messages.pageTitles.faq,
    description: "Encuentra respuestas a las preguntas más frecuentes sobre nuestros servicios de desarrollo web, marketing digital, automatización y más.",
    keywords: [
      "preguntas frecuentes",
      "faq",
      "ayuda",
      "soporte",
      "información",
      "dudas",
      "preguntas molokaih",
    ],
    alternates: {
      canonical: "/faq",
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
      title: messages.pageTitles.faq,
      description: "Todo lo que necesitas saber sobre nuestros servicios.",
      type: "website",
      url: "/faq",
      siteName: "Molokaih",
    },
    twitter: {
      card: "summary_large_image",
      title: messages.pageTitles.faq,
      description: "Todo lo que necesitas saber sobre nuestros servicios.",
    },
  };
}

/**
 * JSON-LD Schema para FAQPage
 * Genera automáticamente desde los datos
 */
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": generalFAQ.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.points 
        ? `${faq.answer}\n\n${faq.points.join('\n')}`
        : faq.answer
    }
  }))
};

/**
 * Page: FAQ
 * Página de preguntas frecuentes con JSON-LD para Rich Snippets
 */
export default function FAQPage() {
  return (
    <>
      <JsonLd data={faqSchema} />
      <FAQTemplate />
    </>
  );
}

