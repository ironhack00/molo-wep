"use client";

import Image from "next/image";
import logo from "@/assets/logo.webp";
import { cn } from "@/utils/classNames";

interface LogoImageProps {
  size?: "sm" | "md" | "lg" | "full";
}

/**
 * Atom: LogoImage (Wrapper conveniente)
 * Logo específico del proyecto con tamaños predefinidos
 */
export function LogoImage({ size = "md" }: LogoImageProps) {
  const sizes = {
    sm: "w-8 h-auto",
    md: "w-10 h-auto",
    lg: "w-12 h-auto",
    full: "w-full h-full",
  };

  return (
    <Image
      src={logo}
      width={500}
      height={500}
      alt="logo-molokaih"
      className={cn(
        sizes[size], 
        "aspect-square object-cover",
        size === "full" && "drop-shadow-2xl"
      )}
      priority={size === "full"}
      style={size === "full" ? { filter: 'drop-shadow(0 25px 50px rgba(0, 0, 0, 0.6))' } : undefined}
    />
  );
}

