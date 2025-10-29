"use client";

import Image from "next/image";

interface FeatureImageProps {
  src: string;
  alt: string;
  priority?: boolean;
}

/**
 * Atom: FeatureImage (Wrapper conveniente)
 * Imagen con marco transparente y blur
 */
export function FeatureImage({ src, alt, priority = false }: FeatureImageProps) {
  return (
    <div className="relative w-full aspect-[4/3] flex items-center justify-center">
      <div className="relative w-full h-full">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 90vw, (max-width: 1024px) 45vw, 35vw"
          quality={priority ? 90 : 85}
          priority={priority}
          loading={priority ? "eager" : "lazy"}
          style={{
            filter: 'drop-shadow(0 0 20px rgba(37, 217, 216, 0.4))',
            willChange: 'transform'
          }}
        />
      </div>
    </div>
  );
}

