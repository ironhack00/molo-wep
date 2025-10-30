"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import logo from "@/assets/logo.webp";
import { Heading } from "../../atoms/Heading";
import { Paragraph } from "../../atoms/Paragraph";
import { cn, sectionPadding, maxWidths, textSizes } from "@/utils/classNames";
import { useTranslations } from "@/lib/i18n/IntlProvider";

/**
 * Organism: AboutValuesSection
 * Sección de valores con logo M y texto
 * Reutiliza: Heading, Paragraph
 * Mismo patrón de layout que la sección de misión
 */
export function AboutValuesSection() {
  const t = useTranslations('about.values');
  
  return (
    <section 
      className={cn("relative", sectionPadding.y)}
      aria-label={String(useTranslations('ariaLabels')('aboutValues'))}
    >
      <div className={cn(maxWidths.xl, sectionPadding.x)}>
        {/* Values con logo a la izquierda */}
        <div className="w-full flex justify-center items-center relative mb-12 md:mb-16">
          {/* Logo M a la IZQUIERDA - Desaparece en móvil */}
          <div className="w-[18%] aspect-square relative -right-16 max-lg:hidden">
            <Image
              width={500}
              height={500}
              src={logo}
              alt="Logo Molokaih"
              className="w-full h-full object-cover"
              style={{
                maskImage: 'radial-gradient(ellipse 80% 80% at 40% 50%, black 40%, transparent 80%)',
                WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 40% 50%, black 40%, transparent 80%)'
              }}
              priority
            />
          </div>

          {/* Texto Values a la DERECHA */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-[58%] max-w-[800px] space-y-2 z-50 max-lg:w-full text-start max-lg:text-center relative"
          >
            {/* Capa de sombreado solo del lado izquierdo (donde está el logo) */}
            <div className="absolute inset-y-0 -left-12 w-[60%] bg-gradient-to-r from-black via-black/80 to-transparent rounded-l-2xl -z-10 blur-2xl max-lg:hidden"></div>
            
            <Heading 
              level="h2" 
              className={cn(textSizes.sectionTitle, "font-semibold text-white max-w-4xl")}
              style={{ textShadow: '0 2px 12px rgba(0, 0, 0, 1), 0 4px 20px rgba(0, 0, 0, 0.9), 0 0 30px rgba(0, 0, 0, 0.7)' }}
            >
              {String(t('title'))}
            </Heading>
            
            <div style={{ textShadow: '0 2px 12px rgba(0, 0, 0, 1), 0 4px 20px rgba(0, 0, 0, 0.9), 0 0 30px rgba(0, 0, 0, 0.7)' }}>
              <Paragraph size="md" className="text-sm sm:text-base text-white leading-relaxed">
                {String(t('paragraph1'))}
              </Paragraph>
              
              <Paragraph size="md" className="text-sm sm:text-base text-white leading-relaxed">
                {String(t('paragraph2'))}
              </Paragraph>
              
              <Paragraph size="md" className="text-sm sm:text-base text-white leading-relaxed">
                {String(t('paragraph3'))}
              </Paragraph>
              
              <Paragraph size="md" className="text-sm sm:text-base text-white leading-relaxed">
                {String(t('paragraph4'))}
              </Paragraph>
            </div>
          </motion.div>
        </div>

        {/* Visión y Misión - Fuera del logo, lado a lado */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto"
        >
          {/* Visión */}
          <div className="space-y-4 text-center md:text-left">
            <Heading level="h2" className={cn(textSizes.mediumTitle, "font-semibold text-transparent bg-clip-text bg-gradient-to-t from-white/30 from-0% to-white to-50%")}>
              {String(t('vision.title'))}
            </Heading>
            
            <Paragraph size="md" className="text-sm sm:text-base text-white leading-relaxed">
              {String(t('vision.text'))}
            </Paragraph>
          </div>

          {/* Misión */}
          <div className="space-y-4 text-center md:text-left">
            <Heading level="h2" className={cn(textSizes.mediumTitle, "font-semibold text-transparent bg-clip-text bg-gradient-to-t from-white/30 from-0% to-white to-50%")}>
              {String(t('mission.title'))}
            </Heading>
            
            <Paragraph size="md" className="text-sm sm:text-base text-white leading-relaxed">
              {String(t('mission.text'))}
            </Paragraph>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

