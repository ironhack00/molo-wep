/**
 * Atom: DoubleFeatureImage
 * Renderiza dos imágenes superpuestas con efecto de profundidad
 * Primera imagen: adelante y más abajo
 * Segunda imagen: atrás, arriba y a la derecha
 */

import Image from "next/image";

interface DoubleFeatureImageProps {
  images: [string, string];
  alts: [string, string];
}

export function DoubleFeatureImage({ images, alts }: DoubleFeatureImageProps) {
  return (
    <div className="relative w-full aspect-[4/3]">
      {/* Primera imagen - más abajo y adelante (z-20) */}
      <div className="absolute bottom-0 left-0 w-[70%] aspect-[4/3] z-20">
        <div className="relative w-full h-full">
          <Image
            src={images[0]}
            alt={alts[0]}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 70vw, 35vw"
            style={{
              filter: 'drop-shadow(0 0 25px rgba(37, 217, 216, 0.7)) drop-shadow(0 0 50px rgba(37, 217, 216, 0.5)) drop-shadow(0 0 80px rgba(37, 217, 216, 0.3)) drop-shadow(0 8px 35px rgba(0, 0, 0, 0.7))'
            }}
          />
        </div>
      </div>

      {/* Segunda imagen - más arriba a la derecha y atrás (z-10) */}
      <div className="absolute top-0 right-0 w-[70%] aspect-[4/3] z-10">
        <div className="relative w-full h-full">
          <Image
            src={images[1]}
            alt={alts[1]}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 70vw, 35vw"
            style={{
              filter: 'drop-shadow(0 0 20px rgba(37, 217, 216, 0.6)) drop-shadow(0 0 45px rgba(37, 217, 216, 0.4)) drop-shadow(0 0 70px rgba(37, 217, 216, 0.25)) drop-shadow(0 6px 30px rgba(0, 0, 0, 0.6))'
            }}
          />
        </div>
      </div>
    </div>
  );
}

