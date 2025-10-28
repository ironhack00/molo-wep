"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Heading } from "../atoms/Heading";
import { Paragraph } from "../atoms/Paragraph";
import { FeatureImage } from "../atoms/FeatureImage";
import { DoubleFeatureImage } from "../atoms/DoubleFeatureImage";
import { useIsMobile } from '../hooks/useIsMobile';

interface FeatureContentProps {
  currentIndex: number;
  title: string;
  description: string;
  image: string | string[];
  imageAlt: string | string[];
  icon?: string;
}

/**
 * Molecule: FeatureContent
 * Contenido de feature con texto e imagen animados (desactivados en mobile)
 */
export function FeatureContent({ 
  currentIndex, 
  title, 
  description, 
  image, 
  imageAlt,
  icon
}: FeatureContentProps) {
  const isMobile = useIsMobile();
  
  return (
    <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-16 2xl:gap-24 items-center justify-center">
      {/* Texto a la izquierda - Reducido */}
      <div className="w-full lg:w-[35%] xl:w-[38%] 2xl:w-[40%]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={isMobile ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={isMobile ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={isMobile ? { duration: 0 } : { duration: 0.12, ease: "easeOut" }}
            className="space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-7 xl:space-y-8 2xl:space-y-10"
          >
            {/* Icono y contenido */}
            <div className="flex items-start justify-center lg:justify-start space-x-3">
              {/* Icono a la izquierda */}
              {icon && (
                <div className="w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                  <Image
                    src={icon}
                    alt="Icon"
                    width={32}
                    height={32}
                    className="w-full h-full object-contain"
                  />
                </div>
              )}
              
              {/* Contenido a la derecha (título + texto) */}
              <div className="flex flex-col space-y-2 text-center lg:text-left">
                <Heading level="h3" className="text-white">
                  {title}
                </Heading>
                <Paragraph size="lg" className="text-white/70 leading-relaxed">
                  {description}
                </Paragraph>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Imagen(es) a la derecha - Mismo tamaño */}
      <div className="w-full sm:w-4/5 md:w-3/4 lg:w-[45%] xl:w-[40%] 2xl:max-w-[600px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={isMobile ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={isMobile ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.98 }}
            transition={isMobile ? { duration: 0 } : { duration: 0.12, ease: "easeOut" }}
          >
            {Array.isArray(image) && Array.isArray(imageAlt) ? (
              <DoubleFeatureImage 
                images={[image[0], image[1]]} 
                alts={[imageAlt[0], imageAlt[1]]} 
              />
            ) : (
              <FeatureImage 
                src={typeof image === 'string' ? image : image[0]} 
                alt={typeof imageAlt === 'string' ? imageAlt : imageAlt[0]} 
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

