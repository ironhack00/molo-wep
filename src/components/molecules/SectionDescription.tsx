"use client";

import { motion } from "framer-motion";
import { Paragraph } from "../atoms/Paragraph";
import { useIsMobile } from '../hooks/useIsMobile';
import { cn, textSizes } from "@/utils/classNames";

interface SectionDescriptionProps {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

/**
 * Molecule: SectionDescription
 * Descripción de sección con animación (desactivada en mobile)
 */
export function SectionDescription({ 
  children, 
  size = "lg", 
  className = "" 
}: SectionDescriptionProps) {
  const isMobile = useIsMobile();
  
  return (
    <motion.div
      initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={isMobile ? { duration: 0 } : { duration: 0.6, delay: 0.2 }}
    >
      <Paragraph size={size} className={cn(textSizes.sectionDescription, className)}>
        {children}
      </Paragraph>
    </motion.div>
  );
}

