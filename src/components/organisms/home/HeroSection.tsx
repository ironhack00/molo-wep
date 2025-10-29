"use client";

import { VideoBackground } from "../../atoms/VideoBackground";
import { GradientOverlay } from "../../atoms/GradientOverlay";
import { HeroTitle } from "../../molecules/HeroTitle";
import { HeroDescription } from "../../molecules/HeroDescription";
import { HeroButtons } from "../../molecules/HeroButtons";
import { useTranslations } from '@/lib/i18n/IntlProvider';
import { cn, sectionPadding, maxWidths } from "@/utils/classNames";

/**
 * Organism: HeroSection
 * Sección hero completa con video de fondo
 */
export function HeroSection() {
  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label={String(useTranslations('ariaLabels')('mainHero'))}
    >
      {/* Video de fondo */}
      <VideoBackground
        src="https://molokaih.b-cdn.net/header_1.webm"
        poster="/images/design-ux-ui.webp"
      />

      {/* Contenido - con padding top para evitar superposición con navbar */}
      <div className={cn("relative z-10 w-full text-center", maxWidths.lg, sectionPadding.x, sectionPadding.yHero)}>
        <div className="space-y-6 sm:space-y-8 md:space-y-10 lg:space-y-12 xl:space-y-16">
          {/* Título */}
          <HeroTitle />

          {/* Descripción */}
          <HeroDescription />

          {/* Botones */}
          <HeroButtons />
        </div>
      </div>

      {/* Gradient overlay bottom */}
      <GradientOverlay direction="bottom" />
    </section>
  );
}
