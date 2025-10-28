"use client";

import { UniversalButton } from "@/components/atoms/UniversalButton";
import { Heading } from "@/components/atoms/Heading";
import { Paragraph } from "@/components/atoms/Paragraph";
import { BackgroundGlow } from "@/components/molecules/BackgroundGlow";
import { useLocale } from '@/lib/i18n/IntlProvider';
import { cn, sectionPadding, maxWidths } from "@/utils/classNames";

export default function NotFound() {
  const locale = useLocale();
  
  const texts = locale === 'es' ? {
    title: 'Artículo no encontrado',
    description: 'Lo sentimos, el artículo que buscas no existe o ha sido eliminado.',
    viewAll: 'Ver todos los artículos',
    goHome: 'Ir al inicio',
  } : {
    title: 'Article not found',
    description: 'Sorry, the article you are looking for does not exist or has been removed.',
    viewAll: 'View all articles',
    goHome: 'Go to home',
  };
  
  return (
    <div className="min-h-screen bg-black relative flex items-center justify-center">
      <BackgroundGlow theme="primary" intensity={0.5} />
      
      <div className={cn("relative z-10 text-center", maxWidths.xl, sectionPadding.x)}>
        <div className="mb-8">
          <svg className="w-24 h-24 mx-auto text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        
        <Heading level="h1" className="text-white mb-4">
          {texts.title}
        </Heading>
        
        <Paragraph size="lg" className="text-white/70 mb-8 max-w-2xl mx-auto">
          {texts.description}
        </Paragraph>
        
        <div className="flex gap-4 justify-center">
          <UniversalButton
            variant="primary"
            href="/blog"
            size="lg"
          >
            {texts.viewAll}
          </UniversalButton>
          
          <UniversalButton
            variant="outline"
            href="/"
            size="lg"
          >
            {texts.goHome}
          </UniversalButton>
        </div>
      </div>
    </div>
  );
}

