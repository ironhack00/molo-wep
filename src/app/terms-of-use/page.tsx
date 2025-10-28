import type { Metadata } from "next";
import { LegalPageTemplate } from "@/components/templates/LegalPageTemplate";
import { JsonLd } from "@/components/atoms/JsonLd";
import { cookies } from 'next/headers';

/**
 * Metadata optimizado para SEO - Terms of Use
 */
export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale = cookieStore.get('locale')?.value || 'en';
  const messages = (await import(`../../../messages/${locale}.json`)).default;

  return {
    title: messages.pageTitles.termsOfUse,
    description: "Terms of Use for Molokaih LLC services and website.",
    robots: {
      index: true,
      follow: true,
    },
  };
}

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

