import type { Metadata } from "next";
import { LegalPageTemplate } from "@/components/templates/LegalPageTemplate";
import { JsonLd } from "@/components/atoms/JsonLd";
import { cookies } from 'next/headers';

/**
 * Metadata optimizado para SEO - Privacy Policy
 */
export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale = cookieStore.get('locale')?.value || 'en';
  const messages = (await import(`../../../messages/${locale}.json`)).default;

  return {
    title: messages.pageTitles.privacyPolicy,
    description: "Privacy Policy of Molokaih LLC. Learn how we protect and handle your personal information.",
    robots: {
      index: true,
      follow: true,
    },
  };
}

/**
 * JSON-LD Schema para Privacy Policy
 */
const privacySchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Privacy Policy",
  "description": "Privacy Policy of Molokaih LLC",
  "publisher": {
    "@type": "Organization",
    "name": "Molokaih"
  }
};

/**
 * Page: Privacy Policy
 */
export default function PrivacyPolicyPage() {
  return (
    <>
      <JsonLd data={privacySchema} />
      <LegalPageTemplate 
        translationNamespace="PrivacyPolicy"
        sectionsCount={5}
      />
    </>
  );
}

