"use client";

import { motion } from "framer-motion";
import { Heading } from "../atoms/Heading";
import { useTranslations } from '@/lib/i18n/IntlProvider';
import { cn, textSizes } from "@/utils/classNames";

/**
 * Molecule: HeroTitle
 * Título principal del hero con animación
 */
export function HeroTitle() {
  const t = useTranslations('home');
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <Heading level="h1" className={cn("text-white leading-tight", textSizes.heroTitle)}>
        <span className="block sm:inline">
          {String(t('heroTitle'))} <span className="text-primary">{String(t('heroTitleHighlight'))}</span>{" "}
        </span>
        <br className="hidden sm:block" />
        <span className="block sm:inline">{String(t('heroTitleEnd'))}</span>
      </Heading>
    </motion.div>
  );
}
