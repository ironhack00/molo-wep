"use client";

import { motion } from "framer-motion";
import { Paragraph } from "../atoms/Paragraph";
import { useTranslations } from '@/lib/i18n/IntlProvider';
import { cn, textSizes, maxWidths } from "@/utils/classNames";

/**
 * Molecule: HeroDescription
 * Descripción del hero con animación
 */
export function HeroDescription() {
  const t = useTranslations('home');
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className={cn(maxWidths.prose, "px-2 sm:px-4 md:px-0")}
    >
      <Paragraph size="lg" className={cn("text-white/90 leading-relaxed text-center", textSizes.sectionDescription)}>
        {String(t('heroDescription'))}
      </Paragraph>
    </motion.div>
  );
}

