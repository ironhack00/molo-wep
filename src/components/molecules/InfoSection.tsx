"use client";

import { motion } from "framer-motion";
import { CircleImage } from "../atoms/CircleImage";

interface InfoSectionProps {
  imageSrc?: string;
  imageAlt?: string;
  title?: string;
  lines: string[];
  delay?: number;
}

/**
 * Molecule: InfoSection
 * Sección con imagen circular y lista de textos
 */
export function InfoSection({ 
  imageSrc, 
  imageAlt, 
  title, 
  lines, 
  delay = 0 
}: InfoSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      className="flex items-center gap-3 sm:gap-4"
    >
      <CircleImage 
        src={imageSrc}
        alt={imageAlt}
        title={title}
        size="sm"
      />

      {/* Textos al costado */}
      <div className="flex flex-col justify-center">
        {lines.map((line, index) => (
          <p 
            key={index}
            className="text-white/90 text-xs sm:text-sm leading-tight"
          >
            {line}
          </p>
        ))}
      </div>
    </motion.div>
  );
}

