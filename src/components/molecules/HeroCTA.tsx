"use client";

import { motion } from "framer-motion";
import { Paragraph } from "../atoms/Paragraph";
import { useTranslations } from '@/lib/i18n/IntlProvider';

/**
 * Molecule: HeroCTA
 * Texto CTA del hero
 */
export function HeroCTA() {
  const t = useTranslations('home');
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
    >
      <Paragraph size="xl" className="text-white font-semibold">
        {String(t('heroCTA'))}
      </Paragraph>
    </motion.div>
  );
}

