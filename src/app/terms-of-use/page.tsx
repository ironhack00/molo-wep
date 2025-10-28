import type { Metadata } from "next";
import { LegalPageTemplate } from "@/components/templates/LegalPageTemplate";
import { JsonLd } from "@/components/atoms/JsonLd";

/**
 * Metadata optimizado para SEO - Terms of Use
 */
export const metadata: Metadata = {
  title: "Terms of Use | Molokaih",
  description: "Terms of Use for Molokaih LLC services and website.",
  robots: {
    index: true,
    follow: true,
  },
};

/**
 * JSON-LD Schema para Terms of Use
 */
const termsSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Terms of Use",
  "description": "Terms of Use for Molokaih LLC",
  "publisher": {
    "@type": "Organization",
    "name": "Molokaih"
  }
};

/**
 * Page: Terms of Use
 */
export default function TermsOfUsePage() {
  return (
    <>
      <JsonLd data={termsSchema} />
      <LegalPageTemplate 
        translationNamespace="TermsOfUse"
        sectionsCount={6}
      />
    </>
  );
}

