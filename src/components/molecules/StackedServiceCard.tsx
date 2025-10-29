"use client";

import { Heading } from "../atoms/Heading";
import { Paragraph } from "../atoms/Paragraph";
import { DiagonalGradient } from "../atoms/DiagonalGradient";
import { cn } from "@/utils/classNames";
import { useGsapStacking } from "../hooks/useGsapStacking";
import { useIsMobile } from "../hooks/useIsMobile";
import { IconChevronRight } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { ServiceButton } from "../atoms/ServiceButton";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

interface StackedServiceCardProps {
  title: string;
  description: string;
  bgColor: string;
  image: string;
  imageAlt: string;
  index: number;
  total: number;
  href: string;
}

/**
 * Molecule: StackedServiceCard
 * Card con efecto de apilamiento y scroll fluido (desactivado en mobile)
 * Diseñada para ocupar casi toda la pantalla con transiciones suaves
 */
export function StackedServiceCard({ 
  title, 
  description, 
  bgColor, 
  image, 
  imageAlt, 
  index,
  total,
  href
}: StackedServiceCardProps) {
  // Hook GSAP para stacking
  const { cardRef, containerRef, isFixed } = useGsapStacking(index, total);
  const isMobile = useIsMobile();
  
  // Hook para animaciones de entrada
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  // Detectar si es color hex o clase de Tailwind
  const isHexColor = bgColor.startsWith('#');


  // En mobile, mostrar layout estático sin stacking
  if (isMobile) {
    return (
      <div className="relative py-8 px-4">
        <div
          ref={cardRef}
          style={{
            backgroundColor: isHexColor ? bgColor : undefined,
            boxShadow: 'inset 0 0 80px rgba(0, 0, 0, 0.9), inset 0 0 160px rgba(0, 0, 0, 0.7)'
          }}
          className={cn(
            !isHexColor && bgColor,
            "relative rounded-3xl w-full",
            "flex flex-col items-center",
            "p-6 sm:p-8",
            "overflow-hidden mb-8"
          )}
        >
          <div className="card-content w-full h-full flex flex-col items-center">

          {/* Número identificador */}
          <div className="absolute top-4 right-4 z-0">
            <span className="text-[80px] sm:text-[120px] font-bold text-white/5 leading-none select-none">
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>

          {/* Contenido */}
          <div className="relative z-10 w-full mb-6">
            <Heading 
              level="h3"
              className="text-2xl sm:text-3xl mb-4 font-bold !text-white text-center"
            >
              {title}
            </Heading>
            <Paragraph 
              size="lg" 
              className="text-white/90 text-base sm:text-lg leading-relaxed text-center mb-6"
            >
              {description}
            </Paragraph>
            
            {/* Botón Descubrir más - Componente independiente */}
            <div className="relative mt-16 flex justify-center">
              <ServiceButton href={href} bgColor={bgColor} size="sm" />
            </div>
          </div>

          {/* Imagen */}
          <div 
            className="relative z-10 w-full h-[300px] rounded-2xl overflow-hidden"
            style={{
              boxShadow: 'inset 0 0 60px rgba(0, 0, 0, 0.8), inset 0 0 120px rgba(0, 0, 0, 0.6)'
            }}
          >
            <Image
              src={image}
              alt={imageAlt}
              width={400}
              height={300}
              className="w-full h-full object-cover"
              priority={index === 0}
            />
          </div>
          </div>
        </div>
      </div>
    );
  }

  // Desktop: layout con stacking
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.95, x: -100, rotateY: -15 }}
      animate={isInView ? { 
        opacity: 1, 
        y: 0, 
        scale: 1, 
        x: 0,
        rotateY: 0
      } : { 
        opacity: 0, 
        y: 50, 
        scale: 0.95, 
        x: 100, // Sale hacia la derecha cuando no está en vista
        rotateY: 15 // Rotación sutil al salir
      }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
      className="relative"
      style={{
        height: "100vh",
        marginBottom: index === total - 1 ? "0" : "-15vh", // Más espacio entre cards
      }}
    >
      <div
        className={
          isFixed
            ? "fixed top-0 left-0 right-0 h-screen flex items-center justify-center px-4 md:px-8"
            : "sticky top-0 h-screen flex items-center justify-center px-4 md:px-8"
        }
        style={{
          zIndex: isFixed ? (index + 10) : (index + 1), // Card activa tiene z-index más alto
        }}
      >
        <div
          ref={cardRef}
          data-service-card
          style={{
            backgroundColor: isHexColor ? bgColor : undefined,
            boxShadow: isFixed 
              ? 'inset 0 0 80px rgba(0, 0, 0, 0.9), inset 0 0 160px rgba(0, 0, 0, 0.7), 0 0 40px rgba(37, 217, 216, 0.3), 0 0 80px rgba(37, 217, 216, 0.1)'
              : 'inset 0 0 80px rgba(0, 0, 0, 0.9), inset 0 0 160px rgba(0, 0, 0, 0.7)'
          }}
          className={cn(
            !isHexColor && bgColor,
            "relative rounded-3xl md:rounded-[40px] w-full max-w-7xl h-[85vh]",
            "flex flex-col md:flex-row items-center justify-between",
            "p-6 sm:p-8 md:p-12 lg:p-16 xl:p-20",
            "overflow-hidden"
          )}
        >
          <motion.div 
            className="card-content w-full h-full flex flex-col md:flex-row items-center justify-between"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: (index * 0.1) + 0.3 }}
          >

          {/* Número identificador grande y semitransparente */}
          <div className="absolute top-4 right-4 md:top-8 md:right-8 z-0">
            <span className="text-[120px] md:text-[200px] lg:text-[280px] font-bold text-white/5 leading-none select-none">
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>

          {/* Contenido - Texto a la izquierda */}
          <div className="relative z-10 flex-1 flex flex-col justify-center mb-8 md:mb-0 md:pr-8 lg:pr-12">
            <Heading 
              level="h3" 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 md:mb-6 lg:mb-8 font-bold !text-white"
            >
              {title}
            </Heading>
            <Paragraph 
              size="lg" 
              className="text-white/90 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed max-w-2xl mb-8"
            >
              {description}
            </Paragraph>
            
            {/* Botón Descubrir más - Componente independiente */}
            <div className="relative mt-16">
              <ServiceButton href={href} bgColor={bgColor} size="md" />
            </div>
          </div>

          {/* Imagen a la derecha */}
          <div 
            className="relative z-10 w-full md:w-[45%] lg:w-[40%] h-[500px] rounded-2xl md:rounded-3xl overflow-hidden flex-shrink-0"
            style={{
              boxShadow: 'inset 0 0 60px rgba(0, 0, 0, 0.8), inset 0 0 120px rgba(0, 0, 0, 0.6)'
            }}
          >
            <Image
              src={image}
              alt={imageAlt}
              width={600}
              height={500}
              className="w-full h-full object-cover"
              priority={index === 0}
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 45vw"
              quality={index === 0 ? 90 : 85}
              loading={index === 0 ? "eager" : "lazy"}
            />
          </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

