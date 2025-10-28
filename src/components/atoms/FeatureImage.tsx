"use client";

import Image from "next/image";

interface FeatureImageProps {
  src: string;
  alt: string;
}

/**
 * Atom: FeatureImage (Wrapper conveniente)
 * Imagen con marco transparente y blur
 */
export function FeatureImage({ src, alt }: FeatureImageProps) {
  return (
    <div className="relative w-full aspect-[4/3] flex items-center justify-center">
      <div className="relative w-full h-full">
        <Image
          src={src}
          alt={alt}
          fill
          priority
          className="object-contain"
          sizes="(max-width: 768px) 100vw, 50vw"
          style={{
            filter: 'drop-shadow(0 0 20px rgba(37, 217, 216, 0.4))',
            willChange: 'transform'
          }}
        />
      </div>
    </div>
  );
}

