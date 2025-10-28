"use client";

import { motion } from "framer-motion";
import { Heading } from "../atoms/Heading";
import { useIsMobile } from '../hooks/useIsMobile';
import { cn, textSizes } from "@/utils/classNames";

interface SectionTitleProps {
  children: React.ReactNode;
  level?: "h1" | "h2" | "h3";
  className?: string;
}

/**
 * Molecule: SectionTitle
 * Título de sección con animación (desactivada en mobile)
 */
export function SectionTitle({ children, level = "h2", className = "" }: SectionTitleProps) {
  const isMobile = useIsMobile();
  
  return (
    <motion.div
      initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={isMobile ? { duration: 0 } : { duration: 0.6 }}
    >
      <Heading level={level} className={cn(textSizes.sectionTitle, className)}>
        {children}
      </Heading>
    </motion.div>
  );
}

