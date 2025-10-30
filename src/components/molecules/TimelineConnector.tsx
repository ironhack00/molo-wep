"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Molecule: TimelineConnector
 * Líneas conectoras de la timeline con progreso animado
 * Acepta color personalizado para diferentes páginas
 * Calcula dinámicamente dónde terminar la línea
 */

interface TimelineConnectorProps {
  activeIndex: number;
  totalItems: number;
  lineOffset: string;
  accentColor?: string; // Color personalizable
}

export function TimelineConnector({ 
  activeIndex, 
  totalItems, 
  lineOffset: _lineOffset, 
  accentColor = "#25d9d8" 
}: TimelineConnectorProps) {
  const progress = totalItems > 1 ? activeIndex / (totalItems - 1) : 0;
  // Usar el color de la página para toda la línea
  const pageColor = accentColor;
  const containerRef = useRef<HTMLDivElement>(null);
  const [lineHeight, setLineHeight] = useState('calc(100% - 5rem)');
  const [ballPosition, setBallPosition] = useState(0);
  
  useEffect(() => {
    const updatePositions = () => {
      if (containerRef.current) {
        const container = containerRef.current.parentElement;
        if (container) {
          const items = container.querySelectorAll('.relative.z-10');
          if (items.length > 0) {
            const lastItem = items[items.length - 1];
            const containerTop = container.getBoundingClientRect().top;
            const lastItemTop = lastItem.getBoundingClientRect().top;
            const relativeTop = lastItemTop - containerTop;
            
            // La línea debe terminar en el centro del último círculo (32px desde el top del item)
            const calculatedHeight = relativeTop + 32;
            setLineHeight(`${calculatedHeight}px`);
            
            // Calcular posición de la bolita basada en el progreso total
            if (items.length > 1) {
              const firstItem = items[0];
              const lastItem = items[items.length - 1];
              const firstItemTop = firstItem.getBoundingClientRect().top;
              const lastItemTop = lastItem.getBoundingClientRect().top;
              const totalDistance = lastItemTop - firstItemTop;
              
              // Calcular posición basada en el progreso (0 a 1)
              const progressPosition = totalDistance * progress;
              setBallPosition(progressPosition + 32); // 32px es el centro del primer círculo
            }
          }
        }
      }
    };

    // Calcular al montar y cuando cambie activeIndex
    updatePositions();

    // Recalcular en resize
    window.addEventListener('resize', updatePositions);
    
    // Pequeño delay para asegurar que el DOM esté listo
    setTimeout(updatePositions, 100);

    return () => window.removeEventListener('resize', updatePositions);
  }, [totalItems, activeIndex, progress]);
  
  return (
    <div ref={containerRef}>
      {/* Línea conectora vertical de fondo - termina en el último círculo */}
      <div 
        className="absolute top-0 w-1 bg-white/20 transition-all duration-300"
        style={{ 
          left: '32px',
          height: lineHeight,
          zIndex: 0
        }} 
      />
      
      {/* Línea activa vertical (progreso) con color de la página */}
      <div 
        className="absolute top-0 w-1 transition-all duration-700 ease-out"
        style={{ 
          left: '32px',
          height: `${ballPosition}px`,
          background: `linear-gradient(to bottom, ${pageColor}, ${pageColor}80)`,
          zIndex: 1
        }}
      />

      {/* Bolita que se mueve con el progreso */}
      <div 
        className="absolute w-4 h-4 rounded-full transition-all duration-700 ease-out"
        style={{ 
          left: '26.5px',
          top: `${ballPosition}px`,
          transform: 'translateY(-50%)',
          background: pageColor,
          boxShadow: `0 0 10px ${pageColor}, 0 0 20px ${pageColor}80`,
          zIndex: 1
        }}
      />
    </div>
  );
}

