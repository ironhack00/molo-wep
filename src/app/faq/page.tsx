import type { Metadata } from "next";
import { FAQTemplate } from "@/components/templates/FAQTemplate";
import { JsonLd } from "@/components/atoms/JsonLd";
import { generalFAQ } from "@/data/faq/faqData";

/**
 * Metadata optimizado para SEO - Página FAQ
 * Incluye: Open Graph, Twitter Cards, Keywords, Canonical URL
 */
export const metadata: Metadata = {
  title: "Preguntas Frecuentes - Todo lo que Necesitas Saber",
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
    title: "Preguntas Frecuentes - Molokaih",
    description: "Todo lo que necesitas saber sobre nuestros servicios.",
    type: "website",
    url: "/faq",
    siteName: "Molokaih",
  },
  twitter: {
    card: "summary_large_image",
    title: "Preguntas Frecuentes - Molokaih",
    description: "Todo lo que necesitas saber sobre nuestros servicios.",
  },
};

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

