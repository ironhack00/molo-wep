import Image from "next/image";
import { cn } from "@/utils/classNames";

interface CircleImageProps {
  src?: string;
  alt?: string;
  title?: string;
  size?: "sm" | "md" | "lg";
}

/**
 * Atom: CircleImage (Wrapper conveniente)
 * Imagen circular con gradiente - caso específico que requiere lógica extra (title fallback)
 */
export function CircleImage({ src, alt = "Imagen", title, size = "md" }: CircleImageProps) {
  const sizes = {
    sm: "w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16",
    md: "w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24",
    lg: "w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28",
  };

  const imageSizes = {
    sm: 64,
    md: 96,
    lg: 112,
  };

  return (
    <div className={cn(
      sizes[size],
      "rounded-full bg-gradient-to-br from-primary to-secondary overflow-hidden flex items-center justify-center flex-shrink-0"
    )}>
      {src ? (
        <Image 
          src={src}
          alt={alt}
          width={imageSizes[size]}
          height={imageSizes[size]}
          className="w-full h-full object-cover"
        />
      ) : title ? (
        <span className="text-white text-xl font-bold">{title}</span>
      ) : null}
    </div>
  );
}

