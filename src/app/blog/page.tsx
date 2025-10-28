import type { Metadata } from "next";
import { BlogTemplate } from "@/components/templates/BlogTemplate";
import { SEO_CONFIG } from "@/data/seo";
import { cookies } from 'next/headers';

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale = cookieStore.get('locale')?.value || 'en';
  const messages = (await import(`../../../messages/${locale}.json`)).default;

  return {
    title: messages.pageTitles.blog,
    description: "Artículos y guías sobre desarrollo web, diseño UI/UX, marketing digital y automatización para hacer crecer tu negocio.",
    keywords: ["blog", "artículos", "desarrollo web", "diseño", "programación", "marketing", "automatización", "molokaih"],
    alternates: { canonical: "/blog" },
    openGraph: {
      title: messages.pageTitles.blog,
      description: "Artículos y guías sobre desarrollo web, diseño UI/UX, marketing digital y automatización.",
      type: "website",
      url: `${SEO_CONFIG.siteUrl}/blog`,
      siteName: SEO_CONFIG.siteName,
    },
    twitter: {
      card: "summary_large_image",
      title: messages.pageTitles.blog,
      description: "Artículos y guías sobre desarrollo web, diseño UI/UX, marketing digital y automatización.",
    },
  };
}

export default function BlogPage() {
  return <BlogTemplate />;
}

