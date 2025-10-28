/**
 * Atom: RadialGlowCard
 * Card con efecto de luz radial y borde brillante
 */

import { cn } from "@/utils/classNames";
import { ReactNode } from "react";

interface RadialGlowCardProps {
  children: ReactNode;
  /** Color del glow (usa variables CSS como 'var(--primary)') */
  glowColor?: string;
  /** Posición del glow (porcentaje) */
  glowPosition?: { x: string; y: string };
  /** Tamaño del glow en px */
  glowSize?: { width: number; height: number };
  /** Radio del borde */
  borderRadius?: string;
  /** Clases adicionales */
  className?: string;
}

export function RadialGlowCard({
  children,
  glowColor = "var(--primary)",
  glowPosition = { x: "15%", y: "15%" },
  glowSize = { width: 800, height: 600 },
  borderRadius = "32px",
  className = "",
}: RadialGlowCardProps) {
  return (
    <div
      className={cn("relative", className)}
      style={{
        borderRadius,
        background: `radial-gradient(ellipse ${glowSize.width}px ${glowSize.height}px at ${glowPosition.x} ${glowPosition.y}, color-mix(in srgb, ${glowColor} 30%, transparent) 0%, color-mix(in srgb, ${glowColor} 15%, transparent) 30%, color-mix(in srgb, ${glowColor} 5%, transparent) 50%, transparent 70%), #000000`,
        boxShadow: "inset 0 0 0 20px rgba(255, 255, 255, 0.05)",
      }}
    >
      {/* Borde con color solo en zona del reflejo */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          borderRadius,
          background: `radial-gradient(ellipse 500px 500px at ${glowPosition.x} ${glowPosition.y}, color-mix(in srgb, ${glowColor} 15%, transparent) 0%, transparent 60%)`,
          WebkitMaskImage: "linear-gradient(to bottom right, white 0%, white 40%, transparent 80%)",
          maskImage: "linear-gradient(to bottom right, white 0%, white 40%, transparent 80%)",
        }}
      />
      
      {children}
    </div>
  );
}

