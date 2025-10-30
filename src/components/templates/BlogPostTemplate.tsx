"use client";

import Image from "next/image";
import logo from "@/assets/logo.webp";
import { BackgroundGlow } from "../molecules/BackgroundGlow";
import { sectionPadding, buttonVariants, buttonSizes, buttonBase } from "@/utils/classNames";
import { LocalizedLink } from "../atoms/LocalizedLink";
import { useLocale } from '@/lib/i18n/IntlProvider';

interface BlogPostTemplateProps {
  post: {
    id: string;
    title: string;
    description: string;
    date: string;
    coverImage: string;
    category: string;
    readTime: number;
    content?: string;
  };
}

/**
 * Template: BlogPostTemplate
 * Template para artículo individual del blog
 * Diseño igual al de Molokaih-web-v3 con fondo global
 */
export function BlogPostTemplate({ post }: BlogPostTemplateProps) {
  const locale = useLocale();
  const formattedDate = new Date(post.date).toLocaleDateString(locale === 'es' ? 'es-ES' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const likedText = locale === 'es' ? '¿Te gustó este artículo?' : 'Did you like this article?';
  const contactDescText = locale === 'es' 
    ? 'Contáctanos para saber más sobre nuestros servicios'
    : 'Contact us to learn more about our services';
  const contactBtnText = locale === 'es' ? 'Contactar' : 'Contact';

  return (
    <div className="min-h-screen bg-background pt-40 pb-20 relative overflow-hidden px-5">
      {/* Fondo con color global */}
      <BackgroundGlow theme="primary" intensity={0.8} />

      <div className={`container mx-auto ${sectionPadding.x} py-8 relative z-10`} style={{ maxWidth: 846 }}>

        {/* Post header */}
        <article>
          <header className="mb-8">
            <h1 className="text-6xl max-lg:text-5xl max-md:text-3xl font-semibold text-foreground mb-12 text-center w-full text-balance">
              {post.title}
            </h1>

            <div className="w-full flex justify-between items-center mb-12">
              <div className="flex justify-start items-center gap-2">
                <Image
                  src={logo}
                  width={500}
                  height={500}
                  alt="logo"
                  className="size-6"
                />
                <p className="max-md:text-sm">Molokaih</p>
              </div>

              <div className="flex items-center gap-4 text-white text-sm max-md:text-xs">
                <time dateTime={post.date}>
                  {formattedDate}
                </time>
              </div>
            </div>

            <Image
              width={1200}
              height={1200}
              src={post.coverImage || "/placeholder.svg"}
              alt={post.title}
              className="w-full h-64 md:h-96 object-cover rounded-3xl shadow-md"
            />
          </header>

          {/* Post content */}
          <div className="prose prose-lg md:prose-xl max-w-none mb-12 text-white/90 
            [&_p]:text-base [&_p]:md:text-lg [&_p]:leading-relaxed [&_p]:mb-6 
            [&_h2]:text-2xl [&_h2]:md:text-3xl [&_h2]:mt-12 [&_h2]:mb-6 [&_h2]:font-semibold
            [&_h3]:text-xl [&_h3]:md:text-2xl [&_h3]:mt-10 [&_h3]:mb-5 [&_h3]:font-semibold
            [&_h4]:text-lg [&_h4]:md:text-xl [&_h4]:mt-8 [&_h4]:mb-4 [&_h4]:font-semibold
            [&_li]:text-base [&_li]:md:text-lg [&_li]:mb-2
            [&_ul]:mb-6 [&_ol]:mb-6 [&_ul]:space-y-2 [&_ol]:space-y-2">
            <div 
              dangerouslySetInnerHTML={{ 
                __html: post.content || `<p>Este es un artículo de ejemplo sobre ${post.title}.</p>` 
              }}
            />
          </div>

          {/* CTA Section */}
          <div className="rounded-3xl p-8 md:p-12 text-center backdrop-blur-xl border-2 border-white/20 transition-all duration-300 hover:border-primary/50"
            style={{
              boxShadow: "0 0 20px rgba(37, 217, 216, 0.15)",
              background: "rgba(255, 255, 255, 0.05)"
            }}>
            <h3 className="text-2xl md:text-3xl font-semibold text-white mb-4">
              {likedText}
            </h3>
            <p className="text-lg text-white/70 mb-8">
              {contactDescText}
            </p>
            <LocalizedLink
              href="/contact"
              className={`${buttonBase} ${buttonSizes.md} ${buttonVariants.glass} inline-block`}
              style={{
                borderColor: "#25d9d8",
                boxShadow: "0 0 30px rgba(37, 217, 216, 0.5), 0 0 60px rgba(37, 217, 216, 0.25), inset 0 0 20px rgba(37, 217, 216, 0.125)"
              }}
            >
              {contactBtnText}
            </LocalizedLink>
          </div>
        </article>
      </div>
    </div>
  );
}

