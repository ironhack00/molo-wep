"use client";

import { motion } from "framer-motion";
import { WhatsAppButton } from "./WhatsAppButton";
import { useTranslations } from '@/lib/i18n/IntlProvider';

interface CTAWhatsAppProps {
  text?: string;
  phoneNumber?: string;
  buttonText?: string;
}

/**
 * Molecule: CTAWhatsApp
 * Call-to-action con texto y botón de WhatsApp
 * Usa traducciones automáticamente según el idioma
 */
export function CTAWhatsApp({ 
  text,
  phoneNumber = "14378714955",
  buttonText
}: CTAWhatsAppProps) {
  const t = useTranslations('common');
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      viewport={{ once: true }}
      className="flex flex-wrap items-center justify-center gap-4 md:gap-6"
    >
      <p className="text-white text-lg sm:text-xl md:text-2xl font-semibold">
        {text || String(t('whatsappCTA'))}
      </p>
      
      <WhatsAppButton 
        phoneNumber={phoneNumber}
        text={buttonText || String(t('whatsappButton'))}
      />
    </motion.div>
  );
}

