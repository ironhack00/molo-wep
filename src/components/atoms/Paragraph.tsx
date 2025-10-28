"use client";

import { cn } from "@/utils/classNames";

interface ParagraphProps {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  className?: string;
  /** Estado activo (para cambiar color, ej: timeline) */
  isActive?: boolean;
  /** Color cuando está activo */
  activeColor?: string;
  /** Color cuando está inactivo */
  inactiveColor?: string;
}

/**
 * Atom: Paragraph (Global/Compartido)
 * Párrafos reutilizables en todo el proyecto
 * Consolida Paragraph y TimelineDescription
 */
export function Paragraph({ 
  children, 
  size = "md", 
  className = "",
  isActive,
  activeColor = "text-white",
  inactiveColor = "text-white/40"
}: ParagraphProps) {
  const sizes = {
    sm: "text-sm md:text-base",
    md: "text-base md:text-lg",
    lg: "text-lg md:text-xl",
    xl: "text-xl md:text-2xl",
    "2xl": "text-2xl md:text-3xl",
  };

  return (
    <p className={cn(
      sizes[size],
      isActive !== undefined && "transition-all duration-500",
      isActive !== undefined && (isActive ? activeColor : inactiveColor),
      className
    )}>
      {children}
    </p>
  );
}

