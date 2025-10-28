import type { Metadata } from "next";
import { SEO_CONFIG } from "@/data/seo";
import { JsonLd } from "@/components/atoms/JsonLd";
import { AutomationTemplate } from "@/components/templates/AutomationTemplate";
import { cookies } from 'next/headers';

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale = cookieStore.get('locale')?.value || 'en';
  const messages = (await import(`../../../messages/${locale}.json`)).default;

  return {
    title: messages.pageTitles.automation,
    description: messages.automation.meta.description,
    keywords: [...SEO_CONFIG.keywords, "automation", "chatbots", "social media", "smart automation", "24/7 chatbots"],
    authors: [{ name: SEO_CONFIG.siteName, url: SEO_CONFIG.siteUrl }],
    
    alternates: {
      canonical: '/automation',
    },
    
    openGraph: {
      title: messages.pageTitles.automation,
      description: messages.automation.meta.description,
      type: "website",
      locale: locale === 'es' ? 'es_ES' : 'en_US',
      url: `${SEO_CONFIG.siteUrl}/automation`,
      siteName: SEO_CONFIG.siteName,
      images: [
        {
          url: SEO_CONFIG.ogImage,
          width: SEO_CONFIG.ogImageWidth,
          height: SEO_CONFIG.ogImageHeight,
          alt: "Molokaih - Smart Automation",
        },
      ],
    },
    
    twitter: {
      card: "summary_large_image",
      title: messages.pageTitles.automation,
      description: messages.automation.meta.description,
      images: [SEO_CONFIG.ogImage],
    },
  };
}

/**
 * Página de Automatización con datos estructurados para SEO
 * Server Component - importa directamente el template
 */
export default async function page() {
  const cookieStore = await cookies();
  const locale = cookieStore.get('locale')?.value || 'en';
  const messages = (await import(`../../../messages/${locale}.json`)).default;
  
  const automationFAQSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": messages.automation.faq.items.faq1.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": messages.automation.faq.items.faq1.answer
        }
      },
      {
        "@type": "Question",
        "name": messages.automation.faq.items.faq2.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": messages.automation.faq.items.faq2.answer
        }
      }
    ]
  };

  return (
    <>
      {/* JSON-LD para Google y otras IAs */}
      <JsonLd 
        id="automation-faq-structured-data"
        data={automationFAQSchema} 
      />
      
      <AutomationTemplate />
    </>
  );
}

