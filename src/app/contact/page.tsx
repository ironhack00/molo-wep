import type { Metadata } from "next";
import { ContactTemplate } from "@/components/templates/ContactTemplate";

/**
 * Metadata optimizado para SEO - Página de Contacto
 */
export const metadata: Metadata = {
  title: "Contacto - Tu Solución en Tus Manos",
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
    title: "Contacto - Molokaih",
    description: "¿Tienes preguntas? Estamos aquí para ayudarte.",
    type: "website",
    url: "/contact",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contacto - Molokaih",
    description: "¿Tienes preguntas? Estamos aquí para ayudarte.",
  },
};

/**
 * Page: Contact
 * Página de contacto
 */
export default function ContactPage() {
  return <ContactTemplate />;
}

