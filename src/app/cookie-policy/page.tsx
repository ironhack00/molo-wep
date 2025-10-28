import type { Metadata } from "next";
import { LegalPageTemplate } from "@/components/templates/LegalPageTemplate";
import { JsonLd } from "@/components/atoms/JsonLd";

/**
 * Metadata optimizado para SEO - Cookie Policy
 */
export const metadata: Metadata = {
  title: "Cookie Policy | Molokaih",
  description: "Cookie Policy of Molokaih LLC. Learn how we use cookies on our website.",
  robots: {
    index: true,
    follow: true,
  },
};

/**
 * JSON-LD Schema para Cookie Policy
 */
const cookieSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Cookie Policy",
  "description": "Cookie Policy of Molokaih LLC",
  "publisher": {
    "@type": "Organization",
    "name": "Molokaih"
  }
};

/**
 * Page: Cookie Policy
 */
export default function CookiePolicyPage() {
  return (
    <>
      <JsonLd data={cookieSchema} />
      <LegalPageTemplate 
        translationNamespace="CookiesPolicy"
        sectionsCount={5}
      />
    </>
  );
}

