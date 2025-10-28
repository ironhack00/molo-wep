"use client";

import { useState, useRef, useEffect } from "react";
import { VideoBackgroundSkeleton } from "./VideoBackgroundSkeleton";

interface VideoBackgroundProps {
  src: string;
  poster?: string;
  /** Color overlay para teñir el video */
  colorOverlay?: string;
}

/**
 * Atom: VideoBackground
 * Video de fondo para hero section con opción de color overlay
 * Incluye skeleton mientras carga el video
 */
export function VideoBackground({ src, poster, colorOverlay }: VideoBackgroundProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let timeoutId: NodeJS.Timeout;

    const handleCanPlay = () => {
      clearTimeout(timeoutId);
      setIsLoading(false);
    };

    const handleError = () => {
      clearTimeout(timeoutId);
      setHasError(true);
      setIsLoading(false);
    };

    const handleLoadStart = () => {
      setIsLoading(true);
      // Timeout reducido a 2 segundos máximo
      timeoutId = setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    };

    const handleLoadedData = () => {
      // Cuando los primeros datos están listos, intentar reproducir
      video.play().catch(() => {
        // Si falla el autoplay, continuar con la carga normal
        setIsLoading(false);
      });
    };

    // Verificación inicial más inteligente
    if (video.readyState >= 2) {
      // Si el video ya tiene datos cargados, no mostrar skeleton
      setIsLoading(false);
    } else if (video.readyState >= 1) {
      // Si tiene metadatos, timeout muy corto
      timeoutId = setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }

    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('error', handleError);
    video.addEventListener('loadstart', handleLoadStart);
    video.addEventListener('loadeddata', handleLoadedData);

    return () => {
      clearTimeout(timeoutId);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('error', handleError);
      video.removeEventListener('loadstart', handleLoadStart);
      video.removeEventListener('loadeddata', handleLoadedData);
    };
  }, []);

  // Filtros CSS basados en el color overlay
  const getVideoFilter = () => {
    if (!colorOverlay) return {};
    
    const color = colorOverlay.toLowerCase();
    
    // Transformar video turquesa a color específico de cada página
    if (color === '#ff6b00') {
      // Naranja (Custom/Software Development)
      return {
        filter: 'saturate(1.5) contrast(1.15) brightness(1.05) hue-rotate(155deg)',
      };
    } else if (color === '#6c63ff') {
      // Violeta (Marketing)
      return {
        filter: 'saturate(1.4) contrast(1.1) brightness(0.95) hue-rotate(90deg)',
      };
    } else if (color === '#007bff') {
      // Azul (Development)
      return {
        filter: 'saturate(1.3) contrast(1.1) brightness(1.0) hue-rotate(30deg)',
      };
    } else if (color === '#00d4aa') {
      // Turquesa/Teal (Automation) - mantener original con ajustes mínimos
      return {
        filter: 'saturate(1.2) contrast(1.05) brightness(1.0)',
      };
    }
    
    return {};
  };

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {/* Skeleton mientras carga */}
      {isLoading && <VideoBackgroundSkeleton colorOverlay={colorOverlay} />}
      
      {/* Video */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        poster={poster}
        preload="metadata"
        className={`absolute w-full h-full object-cover transition-opacity duration-1000 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        style={getVideoFilter()}
      >
        <source src={src} type="video/webm" />
      </video>
      
      {/* Overlay oscuro base - más sutil */}
      <div className="absolute inset-0 bg-black/40" />
      
      {/* Overlay de color - muy sutil para mantener claridad */}
      {colorOverlay && (
        <div 
          className="absolute inset-0 mix-blend-soft-light"
          style={{ backgroundColor: colorOverlay, opacity: 0.2 }}
        />
      )}
    </div>
  );
}

