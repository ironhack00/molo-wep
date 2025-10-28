"use client";

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionTitle } from "../../molecules/SectionTitle";
import { SectionDescription } from "../../molecules/SectionDescription";
import { UniversalImage } from "../../atoms/UniversalImage";
import { featuredProjects } from "@/data/development/projectsData";
import { cn, sectionPadding, maxWidths, themeColors } from "@/utils/classNames";
import { useTranslations } from '@/lib/i18n/IntlProvider';

/**
 * Organism: DevelopmentProjectsSection
 * Carrusel de proyectos con drag horizontal (móvil) y flechas (desktop)
 * Reutiliza: SectionTitle, SectionDescription, UniversalImage
 * Incluye: drag to scroll, auto-scroll, navegación con flechas
 */
export function DevelopmentProjectsSection() {
  const dragRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const hasMovedRef = useRef(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isHovering, setIsHovering] = useState(false);

  // Verificar estado de scroll
  const checkScrollButtons = () => {
    if (dragRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = dragRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  // Auto-scroll cada 5 segundos (solo si no está en hover)
  useEffect(() => {
    const interval = setInterval(() => {
      if (dragRef.current && !isDraggingRef.current && !isHovering) {
        dragRef.current.scrollBy({
          left: 500,
          behavior: "smooth",
        });

        // Reset al inicio cuando llega al final
        if (
          dragRef.current.scrollLeft + dragRef.current.clientWidth >=
          dragRef.current.scrollWidth
        ) {
          dragRef.current.scrollTo({ left: 0, behavior: "smooth" });
        }
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [isHovering]);

  // Listener para actualizar botones
  useEffect(() => {
    const current = dragRef.current;
    if (current) {
      checkScrollButtons();
      current.addEventListener('scroll', checkScrollButtons);
      return () => current.removeEventListener('scroll', checkScrollButtons);
    }
  }, []);

  const scrollToDirection = (direction: 'left' | 'right') => {
    if (dragRef.current) {
      const scrollAmount = direction === 'left' ? -500 : 500;
      dragRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!dragRef.current) return;
    isDraggingRef.current = true;
    hasMovedRef.current = false;
    startXRef.current = e.pageX - dragRef.current.offsetLeft;
    scrollLeftRef.current = dragRef.current.scrollLeft;
    dragRef.current.style.cursor = 'grabbing';
  };

  const handleMouseLeave = () => {
    isDraggingRef.current = false;
    if (dragRef.current) {
      dragRef.current.style.cursor = 'grab';
    }
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
    if (dragRef.current) {
      dragRef.current.style.cursor = 'grab';
    }
    // Reset después de un pequeño delay
    setTimeout(() => {
      hasMovedRef.current = false;
    }, 50);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || !dragRef.current) return;
    e.preventDefault();
    const x = e.pageX - dragRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 2;
    dragRef.current.scrollLeft = scrollLeftRef.current - walk;
    
    if (Math.abs(walk) > 5) {
      hasMovedRef.current = true;
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    if (hasMovedRef.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const t = useTranslations('development.projects');
  const tCommon = useTranslations('common');
  
  return (
    <section 
      className={cn("relative", sectionPadding.y)}
      aria-label={String(t('title'))}
    >
      <div className={cn(maxWidths.xl, sectionPadding.x)}>
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <SectionTitle className={cn(themeColors.white, "leading-tight mb-6 md:mb-8")}>
            {String(t('title'))} <span className={themeColors.development}>{String(t('titleHighlight'))}</span>
          </SectionTitle>
          
          <SectionDescription size="lg" className="text-white/80 max-w-4xl mx-auto">
            {String(t('description'))}
          </SectionDescription>
        </div>
      </div>

      {/* Carrusel con controles */}
      <div className="relative">
        {/* Flecha Izquierda - Solo Desktop */}
        <motion.button
          onClick={() => scrollToDirection('left')}
          disabled={!canScrollLeft}
          whileHover={canScrollLeft ? { scale: 1.1, x: -5 } : {}}
          whileTap={canScrollLeft ? { scale: 0.9 } : {}}
          className={cn(
            "hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-20",
            "w-14 h-14 rounded-full backdrop-blur-xl border-2 transition-all duration-300",
            "items-center justify-center",
            canScrollLeft 
              ? "border-white/40 hover:border-[#007bff] cursor-pointer opacity-100" 
              : "border-white/10 opacity-30 cursor-not-allowed"
          )}
          style={canScrollLeft ? { 
            backgroundColor: 'rgba(0, 123, 255, 0.1)',
            boxShadow: '0 0 20px rgba(0, 123, 255, 0.3)'
          } : { backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </motion.button>

        {/* Flecha Derecha - Solo Desktop */}
        <motion.button
          onClick={() => scrollToDirection('right')}
          disabled={!canScrollRight}
          whileHover={canScrollRight ? { scale: 1.1, x: 5 } : {}}
          whileTap={canScrollRight ? { scale: 0.9 } : {}}
          className={cn(
            "hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-20",
            "w-14 h-14 rounded-full backdrop-blur-xl border-2 transition-all duration-300",
            "items-center justify-center",
            canScrollRight 
              ? "border-white/40 hover:border-[#007bff] cursor-pointer opacity-100" 
              : "border-white/10 opacity-30 cursor-not-allowed"
          )}
          style={canScrollRight ? { 
            backgroundColor: 'rgba(0, 123, 255, 0.1)',
            boxShadow: '0 0 20px rgba(0, 123, 255, 0.3)'
          } : { backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </motion.button>

        {/* Carrusel con drag (móvil y desktop) */}
        <div
          ref={dragRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={() => {
            handleMouseLeave();
            setIsHovering(false);
          }}
          onMouseEnter={() => setIsHovering(true)}
          className={cn(
            "flex w-full overflow-x-auto scrollbar-hide md:cursor-grab select-none",
            sectionPadding.x
          )}
        >
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex w-max gap-5 overflow-visible"
            >
              {featuredProjects.map((project, idx) => (
                <motion.a
                  key={project.id}
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleClick}
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="shrink-0 flex justify-center items-center relative w-[90vw] sm:w-[85vw] md:w-[600px] lg:w-[700px] h-[60vw] sm:h-[55vw] md:h-[430px] lg:h-[500px] max-w-[700px] group rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 hover:border-[#007bff]/50 transition-all duration-300 shadow-lg hover:shadow-2xl"
                  style={{
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
                  }}
                >
                  <UniversalImage
                    src={project.image}
                    alt={project.imageAlt}
                    size="full"
                    objectFit="cover"
                    className="w-full h-full transition-transform duration-300 group-hover:scale-105 pointer-events-none"
                    draggable={false}
                  />
                  
                  {/* Overlay moderno con gradiente */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                    {/* Ícono de enlace externo */}
                    <div className="absolute top-6 right-6">
                      <div className="w-12 h-12 rounded-full bg-[#007bff]/20 backdrop-blur-sm flex items-center justify-center border-2 border-[#007bff]/50 group-hover:bg-[#007bff]/30 transition-all">
                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </div>
                    </div>
                    
                    {/* Indicador "Ver proyecto" */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="flex items-center gap-2 text-white">
                        <span className="text-lg font-semibold">{String(tCommon('viewProject'))}</span>
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </motion.a>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
