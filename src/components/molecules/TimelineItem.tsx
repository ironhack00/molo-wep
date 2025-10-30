/**
 * Molecule: TimelineItem
 * Item completo de la línea de tiempo (círculo con número + texto)
 * Ahora usa componentes consolidados Heading y Paragraph
 * Acepta color personalizado para diferentes páginas
 */

import { TimelineCircle } from "../atoms/TimelineCircle";
import { Paragraph } from "../atoms/Paragraph";

interface TimelineItemProps {
  number: number;
  title: string;
  description: string;
  isActive?: boolean;
  accentColor?: string; // Color personalizable
}

// Paleta de colores removida - no se utiliza en este componente

export function TimelineItem({ 
  number,
  title, 
  description, 
  isActive = false,
  accentColor = "#25d9d8"
}: TimelineItemProps) {
  // Usar el color de la página para todas las bolitas
  const pageColor = accentColor;
  
  return (
    <div className="flex items-start gap-6 sm:gap-8 md:gap-10 relative">
      {/* Círculo a la izquierda con número y color de la página */}
      <div className="flex-shrink-0 relative z-20">
        <TimelineCircle number={number} isActive={isActive} accentColor={pageColor} />
      </div>
      
      {/* Texto a la derecha */}
      <div className="flex-1 pt-3">
        <div
          className="text-xl sm:text-2xl md:text-3xl text-left font-bold transition-all duration-500"
          style={{ color: isActive ? pageColor : 'rgba(255, 255, 255, 0.6)' }}
        >
          {title}
        </div>
        
        <Paragraph 
          size="sm"
          isActive={isActive}
          className="mt-3 sm:mt-4 leading-relaxed text-left"
        >
          {description}
        </Paragraph>
      </div>
    </div>
  );
}

