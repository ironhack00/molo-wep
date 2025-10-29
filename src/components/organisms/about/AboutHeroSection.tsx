"use client";

import { motion } from "framer-motion";
import { HeaderVideo } from "../../atoms/HeaderVideo";
import { GradientOverlay } from "../../atoms/GradientOverlay";
import { Logo } from "../../molecules/Logo";
import { cn, sectionPadding } from "@/utils/classNames";
import { useTranslations } from '@/lib/i18n/IntlProvider';

/**
 * Organism: AboutHeroSection
 * Hero de la página About
 * Reutiliza: VideoBackground, GradientOverlay, Logo
 */
export function AboutHeroSection() {
  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label={String(useTranslations('ariaLabels')('aboutHero'))}
    >
      {/* Video de fondo */}
      <HeaderVideo />

      {/* Contenido */}
      <div className={cn(
        "relative z-10 w-full max-w-7xl mx-auto text-center py-20 sm:py-28 md:py-32",
        sectionPadding.x
      )}>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center"
        >
          {/* Logo reutilizado - variant footer para que muestre texto */}
          <div className="transform scale-150 sm:scale-[2] md:scale-[2.5] lg:scale-[3]">
            <Logo variant="footer" isLink={false} clickPhrases={["Automatizacion", "Marketing", "Web", "Software", "Molokaih"]} />
          </div>
        </motion.div>
      </div>

      {/* Gradient overlay bottom */}
      <GradientOverlay direction="bottom" />
    </section>
  );
}

