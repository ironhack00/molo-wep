"use client";

import { memo } from "react";
import Image from "next/image";
import { cn } from "@/utils/classNames";

interface UniversalImageProps {
  src: string;
  alt: string;
  /** Forma de la imagen */
  shape?: "square" | "circle" | "rounded";
  /** Tamaño responsivo */
  size?: "sm" | "md" | "lg" | "xl" | "full";
  /** Cómo ajustar la imagen */
  objectFit?: "cover" | "contain" | "fill";
  /** Borde con blur */
  withGlowBorder?: boolean;
  /** Clases adicionales */
  className?: string;
  /** Estilos inline */
  style?: React.CSSProperties;
  /** Prioridad de carga */
  priority?: boolean;
  /** Tamaño para Next Image (cuando no es fill) */
  width?: number;
  height?: number;
  /** Permitir arrastrar la imagen */
  draggable?: boolean;
}

/**
 * Atom: UniversalImage
 * Componente de imagen unificado que reemplaza FeatureImage, CircleImage, etc.
 * Maneja diferentes formas, tamaños y estilos
 * Optimizado con React.memo para mejor performance
 */
export const UniversalImage = memo(function UniversalImage({
  src,
  alt,
  shape = "rounded",
  size = "md",
  objectFit = "cover",
  withGlowBorder = false,
  className = "",
  style,
  priority = false,
  width,
  height,
  draggable = true,
}: UniversalImageProps) {
  const shapes = {
    square: "rounded-none",
    circle: "rounded-full",
    rounded: "rounded-xl",
  };

  const sizes = {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-32 h-32",
    xl: "w-48 h-48",
    full: "w-full aspect-[4/3]", // Contenedor fijo, imagen se adapta dentro
  };

  const objectFits = {
    cover: "object-cover",
    contain: "object-contain",
    fill: "object-fill",
  };

  const containerClasses = cn(
    "relative",
    sizes[size],
    withGlowBorder && "p-4 backdrop-blur-xl shadow-2xl bg-black/30",
    withGlowBorder ? shapes.rounded : shapes[shape],
    className
  );

  const imageClasses = cn(
    objectFits[objectFit],
    !withGlowBorder && shapes[shape],
    withGlowBorder && "rounded-xl"
  );

  if (withGlowBorder) {
    return (
      <div className={containerClasses}>
        <div className="relative w-full h-full p-4 backdrop-blur-xl rounded-2xl shadow-2xl">
          <div className="relative w-full h-full rounded-xl overflow-hidden bg-transparent">
            <Image
              src={src}
              alt={alt}
              fill
              className={imageClasses}
              style={style}
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={priority}
              draggable={draggable}
            />
          </div>
        </div>
      </div>
    );
  }

  // Sin glow border
  return (
    <div className={containerClasses}>
      {width && height ? (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={cn(imageClasses, "w-full h-full")}
          style={style}
          priority={priority}
          draggable={draggable}
        />
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          className={imageClasses}
          style={style}
          sizes="(max-width: 768px) 100vw, 50vw"
          priority={priority}
          draggable={draggable}
        />
      )}
    </div>
  );
});

