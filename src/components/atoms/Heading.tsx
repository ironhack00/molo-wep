"use client";

import { cn } from "@/utils/classNames";

interface HeadingProps {
  children: React.ReactNode;
  level?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  className?: string;
  /** Estado activo (para cambiar color, ej: timeline) */
  isActive?: boolean;
  /** Color cuando está activo */
  activeColor?: string;
  /** Color cuando está inactivo */
  inactiveColor?: string;
  /** Estilos inline opcionales */
  style?: React.CSSProperties;
  /** Desactiva tamaños base del Heading para dejar que className/tokens definan todo */
  useBaseSize?: boolean;
}

/**
 * Atom: Heading (Global/Compartido)
 * Títulos reutilizables en todo el proyecto
 * Consolida Heading y TimelineTitle
 */
export function Heading({ 
  children, 
  level = "h1", 
  className = "",
  isActive,
  activeColor = "text-primary",
  inactiveColor = "text-white/60",
  style,
  useBaseSize = true
}: HeadingProps) {
  const Tag = level;
  
  // Tamaños sin font-weight (se controla desde globals.css)
  const sizes = {
    h1: "text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl",
    h2: "text-3xl sm:text-4xl md:text-5xl lg:text-6xl",
    h3: "text-2xl sm:text-3xl md:text-4xl lg:text-5xl",
    h4: "text-xl sm:text-2xl md:text-3xl lg:text-4xl",
    h5: "text-lg sm:text-xl md:text-2xl",
    h6: "text-base sm:text-lg md:text-xl",
  };

  return (
    <Tag 
      className={cn(
        useBaseSize && sizes[level],
        isActive !== undefined && "transition-all duration-500",
        isActive !== undefined && (isActive ? activeColor : inactiveColor),
        className
      )}
      style={style}
    >
      {children}
    </Tag>
  );
}

