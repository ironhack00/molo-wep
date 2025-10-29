"use client";

import { useState, useRef } from "react";
import { Heading } from "../atoms/Heading";
import { Paragraph } from "../atoms/Paragraph";
import { FeatureImage } from "../atoms/FeatureImage";
import { DoubleFeatureImage } from "../atoms/DoubleFeatureImage";
import { cn, textSizes } from "@/utils/classNames";

interface WhyChooseCarouselProps {
  items: Array<{
    id: string;
    title: string;
    description: string;
    image: string | string[];
    imageAlt: string | string[];
    icon?: string;
  }>;
}

/**
 * Molecule: WhyChooseCarousel
 * Carrusel simple para mobile sin animaciones pesadas
 * Solo CSS transitions suaves
 */
export function WhyChooseCarousel({ items }: WhyChooseCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

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

  return (
    <div className="w-full px-4 py-8">
      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .slide-content {
          animation: slideIn 0.6s ease-out forwards;
        }
        
        .slide-image {
          transition: transform 0.3s ease-out;
        }
        
        .slide-image:hover {
          transform: scale(1.02);
        }
        
        .indicator {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .indicator:hover {
          transform: scale(1.2);
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
          {/* Imagen */}
          <div className="w-full mb-6 slide-image">
            {Array.isArray(currentItem.image) && Array.isArray(currentItem.imageAlt) ? (
              <DoubleFeatureImage 
                images={[currentItem.image[0], currentItem.image[1]]} 
                alts={[currentItem.imageAlt[0], currentItem.imageAlt[1]]} 
              />
            ) : (
              <FeatureImage 
                src={typeof currentItem.image === 'string' ? currentItem.image : currentItem.image[0]} 
                alt={typeof currentItem.imageAlt === 'string' ? currentItem.imageAlt : currentItem.imageAlt[0]}
                priority={currentIndex === 0}
              />
            )}
          </div>

          {/* Contenido */}
          <div className="mb-6">
            <div className="flex flex-col space-y-4 text-center">
              <Heading level="h3" className={cn("text-white", textSizes.cardTitle)}>
                {currentItem.title}
              </Heading>
              <Paragraph size="lg" className={cn("text-white/80 leading-relaxed", textSizes.cardText)}>
                {currentItem.description}
              </Paragraph>
            </div>
          </div>
        </div>
      </div>

      {/* Indicadores */}
      <div className="flex justify-center space-x-2 mt-6">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full indicator ${
              index === currentIndex 
                ? 'bg-primary scale-125' 
                : 'bg-white/30 hover:bg-white/50'
            }`}
            aria-label={`Ir al slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

