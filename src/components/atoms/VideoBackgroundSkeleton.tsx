"use client";

interface VideoBackgroundSkeletonProps {
  /** Color overlay para teñir el skeleton */
  colorOverlay?: string;
}

/**
 * Atom: VideoBackgroundSkeleton
 * Skeleton animado para mostrar mientras carga el video de fondo
 * Mantiene la misma estructura visual que VideoBackground
 */
export function VideoBackgroundSkeleton({ colorOverlay }: VideoBackgroundSkeletonProps) {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {/* Skeleton base más sutil */}
      <div className="absolute w-full h-full bg-gradient-to-br from-gray-900 via-black to-gray-900 animate-pulse" />
      
      {/* Patrón de skeleton más sutil */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/3 to-transparent animate-shimmer" />
      
      {/* Overlay oscuro base - igual que VideoBackground */}
      <div className="absolute inset-0 bg-black/40" />
      
      {/* Overlay de color - muy sutil para mantener claridad */}
      {colorOverlay && (
        <div 
          className="absolute inset-0 mix-blend-soft-light"
          style={{ backgroundColor: colorOverlay, opacity: 0.2 }}
        />
      )}
      
      {/* Efectos de brillo más sutiles */}
      <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-white/5 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-white/3 to-transparent" />
    </div>
  );
}
