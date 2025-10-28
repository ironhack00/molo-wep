/**
 * Page: Custom
 * Página personalizada con diseño moderno para negocios
 */

import type { Metadata } from "next";
import { CustomTemplate } from "@/components/templates/CustomTemplate";
import { SEO_CONFIG } from "@/data/seo";
import { cookies } from 'next/headers';

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale = cookieStore.get('locale')?.value || 'en';
  const messages = (await import(`../../../messages/${locale}.json`)).default;

  return {
    title: messages.pageTitles.developmentSoftware,
    description:
      "Creamos software a medida que impulsa tu negocio: escalable, seguro y alineado a tus procesos.",
    keywords: [
      "software a medida",
      "desarrollo de software",
      "soluciones digitales",
      "integraciones",
      "automatizaciones",
    ],
    alternates: { canonical: "/development-software" },
    openGraph: {
      title: messages.pageTitles.developmentSoftware,
      description:
        "Creamos software a medida que impulsa tu negocio: escalable, seguro y alineado a tus procesos.",
      type: "website",
      url: "/development-software",
      siteName: SEO_CONFIG.siteName,
    },
    twitter: {
      card: "summary_large_image",
      title: messages.pageTitles.developmentSoftware,
      description:
        "Creamos software a medida que impulsa tu negocio: escalable, seguro y alineado a tus procesos.",
    },
  };
}

export default function CustomPage() {
  return <CustomTemplate />;
}

