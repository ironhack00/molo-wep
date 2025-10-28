"use client";

import { useState } from "react";
import { UniversalButton } from "../atoms/UniversalButton";
import { glassmorphism } from "@/utils/classNames";

interface PricingGlowButtonProps {
  children: React.ReactNode;
  accentColor: string;
}

/**
 * Molecule: PricingGlowButton
 * Botón con efecto de brillo para cards de pricing
 * Reutilizable con diferentes colores
 */
export function PricingGlowButton({
  children,
  accentColor,
}: PricingGlowButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <UniversalButton
        href="https://wa.me/14378714955"
        target="_blank"
        rel="noopener noreferrer"
        variant="glass"
        size="md"
        className={`w-full block font-bold ${glassmorphism.strong}`}
        style={
          isHovered
            ? {
                borderColor: accentColor,
                boxShadow: `0 0 20px ${accentColor}60, 0 0 40px ${accentColor}30`,
              }
            : { borderColor: "rgba(255, 255, 255, 0.2)" }
        }
      >
        {children}
      </UniversalButton>
    </div>
  );
}
