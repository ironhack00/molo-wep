"use client";

import { motion } from "framer-motion";
import { Heading } from "../atoms/Heading";
import { RadialGlowCard } from "../atoms/RadialGlowCard";
import { LogoCarousel } from "./LogoCarousel";

interface TrustBannerProps {
  title?: string;
}

/**
 * Molecule: TrustBanner
 * Banner de confianza con título y carrusel de logos
 */
export function TrustBanner({ 
  title = "Más de 150 empresas ya confían en nosotros para impulsar su crecimiento"
}: TrustBannerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
      className="mx-auto"
      style={{
        width: "min(98%, 1600px)",
        minHeight: "400px",
      }}
    >
      <RadialGlowCard
        glowColor="var(--primary)"
        glowPosition={{ x: "15%", y: "15%" }}
        glowSize={{ width: 800, height: 600 }}
      >
        {/* Contenido del título */}
        <div className="relative pt-12 pb-8 px-6 sm:px-8 md:px-12 lg:px-16 text-center flex justify-center">
          <Heading 
            level="h3" 
            className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight mb-8 md:mb-12 max-w-[85%] sm:max-w-[80%] md:max-w-[75%] lg:max-w-[70%]"
          >
            {title}
          </Heading>
        </div>

        {/* Carrusel de logos */}
        <div className="relative pb-8">
          <LogoCarousel />
        </div>
      </RadialGlowCard>
    </motion.div>
  );
}

