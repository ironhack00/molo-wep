"use client";

import { motion, useMotionValue, animate, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import logo from "@/assets/logo.webp";
import { SectionTitle } from "../../molecules/SectionTitle";
import { Paragraph } from "../../atoms/Paragraph";
import { Heading } from "../../atoms/Heading";
import { Text } from "../../atoms/Text";
import { cn, sectionPadding, maxWidths, themeColors, textSizes } from "@/utils/classNames";
import { useTranslations } from "@/lib/i18n/IntlProvider";

/**
 * Organism: AboutMissionSection
 * Sección de misión con logo M, texto y estadísticas animadas
 * Reutiliza: SectionTitle, Paragraph, Heading, Text
 */
export function AboutMissionSection() {
  const t = useTranslations('about.mission');
  const tAria = useTranslations('ariaLabels');
  
  // Ref para detectar cuando está en viewport
  const statsRef = useRef(null);
  const isInView = useInView(statsRef, { once: true, margin: "-100px" });

  // Motion values para contadores animados
  const yearCount = useMotionValue(0);
  const countriesCount = useMotionValue(0);
  const clientsCount = useMotionValue(0);

  // Estados para mostrar los valores
  const [year, setYear] = useState(0);
  const [countries, setCountries] = useState(0);
  const [clients, setClients] = useState(0);

  useEffect(() => {
    // Subscribirse a los cambios de valores
    const unsubYear = yearCount.on("change", (latest) => setYear(Math.round(latest)));
    const unsubCountries = countriesCount.on("change", (latest) => setCountries(Math.round(latest)));
    const unsubClients = clientsCount.on("change", (latest) => setClients(Math.round(latest)));

    // Animar solo cuando entra en viewport
    if (isInView) {
      animate(yearCount, 2023, { duration: 2, ease: "easeOut" });
      animate(countriesCount, 2, { duration: 2, ease: "easeOut" });
      animate(clientsCount, 100, { duration: 2, ease: "easeOut" });
    }

    return () => {
      unsubYear();
      unsubCountries();
      unsubClients();
    };
  }, [isInView, yearCount, countriesCount, clientsCount]);

  return (
    <section 
      className={cn("relative", sectionPadding.y)}
      aria-label={String(tAria('missionSection'))}
    >
      <div className={cn(maxWidths.xl, sectionPadding.x)}>
        {/* Título centrado */}
        <div className="text-center mb-8 md:mb-12">
          <SectionTitle className={cn(themeColors.white, "leading-tight", textSizes.sectionTitle, "max-w-4xl mx-auto")}>
            {String(t('title'))}
          </SectionTitle>
        </div>

        {/* Mission con logo a la izquierda */}
        <div className="w-full flex justify-center items-center relative mb-8 md:mb-12">
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

          {/* Texto Mission a la DERECHA */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-[58%] max-w-[800px] space-y-2 z-50 max-lg:w-full text-start max-lg:text-center relative"
          >
            {/* Capa de sombreado solo del lado izquierdo (donde está el logo) */}
            <div className="absolute inset-y-0 -left-12 w-[60%] bg-gradient-to-r from-black via-black/80 to-transparent rounded-l-2xl -z-10 blur-2xl max-lg:hidden"></div>
            
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

        {/* Estadísticas */}
        <motion.div
          ref={statsRef}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="pt-20 md:pt-28 lg:pt-36 xl:pt-44 pb-0"
        >
          {/* Subtítulo - Reutiliza Heading */}
          <div className="text-center mb-6 md:mb-8 lg:mb-10">
            <Heading level="h3" className={cn(themeColors.white, textSizes.mediumTitle, "max-w-3xl mx-auto")}>
              {String(t('statsTitle'))}
            </Heading>
          </div>

          {/* Stats grid */}
          <div className="flex flex-col sm:flex-row justify-center items-center sm:divide-x divide-primary/30">
            {/* Stat 1: Fundación */}
            <motion.div className="text-center space-y-2 sm:space-y-3 px-3 sm:px-4 md:px-5 lg:px-6 xl:px-8">
              <div className={cn(themeColors.primary, textSizes.statNumber, "font-bold")}>
                {year}
              </div>
              <Text className={cn("text-white", textSizes.statText)}>{String(t('stats.foundation'))}</Text>
            </motion.div>

            {/* Stat 2: Países */}
            <motion.div className="text-center space-y-2 sm:space-y-3 px-3 sm:px-4 md:px-5 lg:px-6 xl:px-8">
              <div className={cn(themeColors.primary, textSizes.statNumber, "font-bold")}>
                {countries}
              </div>
              <Text className={cn("text-white", textSizes.statText)}>{String(t('stats.countries'))}</Text>
            </motion.div>

            {/* Stat 3: Clientes */}
            <motion.div className="text-center space-y-2 sm:space-y-3 px-3 sm:px-4 md:px-5 lg:px-6 xl:px-8">
              <div className={cn(themeColors.primary, textSizes.statNumber, "font-bold")}>
                {clients}+
              </div>
              <Text className={cn("text-white", textSizes.statText)}>{String(t('stats.clients'))}</Text>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

