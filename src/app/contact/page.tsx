import type { Metadata } from "next";
import { ContactTemplate } from "@/components/templates/ContactTemplate";
import { cookies } from 'next/headers';

/**
 * Metadata optimizado para SEO - Página de Contacto
 */
export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale = cookieStore.get('locale')?.value || 'en';
  const messages = (await import(`../../../messages/${locale}.json`)).default;

  return {
    title: messages.pageTitles.contact,
    description: "¿Tienes preguntas sobre nuestros productos/servicios, pedidos o simplemente quieres saludar? Estamos aquí para ayudarte.",
    keywords: [
      "contacto",
      "formulario contacto",
      "hablar con molokaih",
      "presupuesto",
      "consulta",
      "soporte",
    ],
    openGraph: {
      title: messages.pageTitles.contact,
      description: "¿Tienes preguntas? Estamos aquí para ayudarte.",
      type: "website",
      url: "/contact",
    },
    twitter: {
      card: "summary_large_image",
      title: messages.pageTitles.contact,
      description: "¿Tienes preguntas? Estamos aquí para ayudarte.",
    },
  };
}

/**
 * Page: Contact
 * Página de contacto
 */
export default function ContactPage() {
  return <ContactTemplate />;
}

