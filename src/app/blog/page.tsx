import type { Metadata } from "next";
import { BlogTemplate } from "@/components/templates/BlogTemplate";
import { SEO_CONFIG } from "@/data/seo";

export const metadata: Metadata = {
  title: "Blog de Tecnología, Diseño y Marketing | Molokaih",
  description: "Artículos y guías sobre desarrollo web, diseño UI/UX, marketing digital y automatización para hacer crecer tu negocio.",
  keywords: ["blog", "artículos", "desarrollo web", "diseño", "programación", "marketing", "automatización", "molokaih"],
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog de Tecnología, Diseño y Marketing | Molokaih",
    description: "Artículos y guías sobre desarrollo web, diseño UI/UX, marketing digital y automatización.",
    type: "website",
    url: `${SEO_CONFIG.siteUrl}/blog`,
    siteName: SEO_CONFIG.siteName,
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog de Tecnología, Diseño y Marketing | Molokaih",
    description: "Artículos y guías sobre desarrollo web, diseño UI/UX, marketing digital y automatización.",
  },
};

export default function BlogPage() {
  return <BlogTemplate />;
}

