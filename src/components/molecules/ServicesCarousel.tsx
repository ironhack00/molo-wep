"use client";

import { useState, useRef } from "react";
import { Heading } from "../atoms/Heading";
import { Paragraph } from "../atoms/Paragraph";
import { DiagonalGradient } from "../atoms/DiagonalGradient";
import { ServiceButton } from "../atoms/ServiceButton";
import { cn } from "@/utils/classNames";
import Image from "next/image";

interface ServicesCarouselProps {
  items: Array<{
    id: string;
    title: string;
    description: string;
    bgColor: string;
    image: string;
    imageAlt: string;
    index: number;
  }>;
}

/**
 * Molecule: ServicesCarousel
 * Carrusel simple para mobile sin animaciones pesadas
 * Solo CSS transitions suaves
 */
export function ServicesCarousel({ items }: ServicesCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Mapear IDs a URLs (igual que en ServicesSection)
  const getServiceUrl = (id: string) => {
    switch (id) {
      case 'webDev': return '/development';
      case 'design': return '/development-software';
      case 'marketing': return '/marketing';
      case 'automation': return '/automation';
      default: return '/';
    }
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Touch handlers para swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrevious();
    }
  };

  const currentItem = items[currentIndex];
  const isHexColor = currentItem.bgColor.startsWith('#');
  const serviceUrl = getServiceUrl(currentItem.id);

  return (
    <div className="w-full px-4 py-8">
      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        .slide-content {
          animation: slideIn 0.7s ease-out forwards;
        }
        
        .service-card {
          transition: transform 0.3s ease-out, box-shadow 0.3s ease-out;
        }
        
        .service-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        }
        
        .indicator {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .indicator:hover {
          transform: scale(1.3);
        }
      `}</style>
      
      <div 
        ref={containerRef}
        className="relative overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Contenido del slide actual */}
        <div 
          key={currentIndex}
          className="slide-content"
        >
          <div
            style={{
              backgroundColor: isHexColor ? currentItem.bgColor : undefined,
            }}
            className={cn(
              !isHexColor && currentItem.bgColor,
              "relative rounded-3xl w-full service-card",
              "flex flex-col items-center",
              "p-6 sm:p-8",
              "overflow-hidden shadow-2xl"
            )}
          >
            {/* Gradiente diagonal de fondo */}
            <DiagonalGradient 
              id={`carousel-gradient-${currentItem.index}`}
              direction="bottom-left-to-top-right"
              color="rgba(0,0,0,1)"
              intensity={0.6}
            />

            {/* Número identificador */}
            <div className="absolute top-4 right-4 z-0">
              <span className="text-[80px] sm:text-[120px] font-bold text-white/5 leading-none select-none">
                {String(currentItem.index + 1).padStart(2, '0')}
              </span>
            </div>

            {/* Contenido */}
            <div className="relative z-10 w-full mb-6">
              <div className="text-white pointer-events-none">
                <Heading 
                  level="h3" 
                  className="text-2xl sm:text-3xl mb-4 font-bold text-center text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
                >
                  {currentItem.title}
                </Heading>
              </div>
              <Paragraph 
                size="md" 
                className="text-white/90 text-sm sm:text-base leading-relaxed text-center mb-6 pointer-events-none"
              >
                {currentItem.description}
              </Paragraph>

              {/* Botón Descubrir más */}
              <div className="relative mt-6 flex justify-center pointer-events-auto">
                <ServiceButton href={serviceUrl} bgColor={currentItem.bgColor} size="sm" />
              </div>

              {/* Imagen */}
              <div className="relative w-full h-[300px] rounded-2xl overflow-hidden shadow-2xl mt-6 pointer-events-none">
                <Image
                  src={currentItem.image}
                  alt={currentItem.imageAlt}
                  width={400}
                  height={300}
                  className="w-full h-full object-cover"
                  priority={currentIndex === 0 && currentItem.index === 0}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
                  quality={currentIndex === 0 && currentItem.index === 0 ? 90 : 85}
                  fetchPriority={(currentIndex === 0 && currentItem.index === 0) ? "high" : "auto"}
                  loading={currentIndex === 0 && currentItem.index === 0 ? "eager" : "lazy"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Indicadores (bolitas) */}
      <div className="flex justify-center items-center gap-2 mt-6">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              "w-2 h-2 rounded-full indicator",
              index === currentIndex 
                ? "bg-white scale-125" 
                : "bg-white/40 hover:bg-white/60"
            )}
            aria-label={`Ir a la imagen ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

