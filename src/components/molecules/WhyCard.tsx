"use client";

import { Heading } from "../atoms/Heading";
import { Paragraph } from "../atoms/Paragraph";
import { UniversalImage } from "../atoms/UniversalImage";
import { cn, iconSizes, textSizes, themeColors } from "@/utils/classNames";

interface WhyCardProps {
  icon: string;
  iconAlt: string;
  title: string;
  description: string;
  /** Nivel del título de card */
  titleLevel?: "h1" | "h2" | "h3";
  /** Tamaño del texto de card (usa tokens) */
  textSize?: "cardText" | "cardTextSmall" | "cardTextExtraSmall";
}

/**
 * Molecule: WhyCard
 * Card estándar: icono + título + descripción
 * Reutilizable en cualquier sección que necesite este patrón
 */
export function WhyCard({
  icon,
  iconAlt,
  title,
  description,
  titleLevel = "h3",
  textSize = "cardText",
}: WhyCardProps) {
  return (
    <div className="flex flex-col items-center text-center space-y-4 md:space-y-6 max-w-xs mx-auto">
      {/* Icono */}
      <div className={cn(iconSizes.card, "flex-shrink-0")}> 
        <UniversalImage
          src={icon}
          alt={iconAlt}
          size="full"
          shape="square"
          objectFit="contain"
          className="w-full h-full"
        />
      </div>

      {/* Título */}
      <Heading level={titleLevel} useBaseSize={false} className={cn(themeColors.white, "leading-tight", textSizes.cardTitle)}>
        {title}
      </Heading>

      {/* Descripción */}
      <Paragraph size="sm" className={cn("text-white/70 leading-relaxed", textSizes[textSize])}>
        {description}
      </Paragraph>
    </div>
  );
}


