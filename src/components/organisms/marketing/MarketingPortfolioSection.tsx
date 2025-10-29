"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { SectionTitle } from "../../molecules/SectionTitle";
import { cn, sectionPadding, themeColors } from "@/utils/classNames";
import { marketingPortfolio, filterCategories, type FilterCategory, type PortfolioItem } from "@/data/marketing/portfolioData";
import { useTranslations } from '@/lib/i18n/IntlProvider';
import { useIsMobile } from "../../hooks/useIsMobile";

const ACCENT_COLOR = "#6c63ff";

/**
 * Organism: MarketingPortfolioSection
 * Sección de portfolio con filtros y paginación
 * Reutiliza SectionTitle y UniversalImage
 * Optimizado con useMemo y useCallback para mejor performance
 */
export function MarketingPortfolioSection() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("Redes Sociales");
  const [currentPage, setCurrentPage] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [swipeDirection, setSwipeDirection] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedImage, setSelectedImage] = useState<PortfolioItem | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isDraggingModal, setIsDraggingModal] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const isMobile = useIsMobile();
  const t = useTranslations('marketing.portfolio');

  // Mapeo de categorías para traducción
  const categoryTranslationMap = useMemo(() => ({
    "Redes Sociales": String(t('categories.social')),
    "Branding": String(t('categories.brandkit')),
    "Reels": String(t('categories.reels'))
  }), [t]);

  // Memoizar items filtrados
  const filteredItems = useMemo(() => {
    return marketingPortfolio.filter(item => item.category === activeFilter);
  }, [activeFilter]);

  // Determinar items por página según categoría y dispositivo
  const itemsPerPage = useMemo(() => {
    if (isMobile) {
      // En mobile, mostrar de 1 en 1 para el carrusel
      return 1;
    }
    return activeFilter === "Reels" ? 3 : 20;
  }, [activeFilter, isMobile]);

  // Memoizar paginación
  const paginationData = useMemo(() => {
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = filteredItems.slice(startIndex, endIndex);
    
    return {
      totalPages,
      currentItems,
      canGoPrev: currentPage > 0,
      canGoNext: currentPage < totalPages - 1
    };
  }, [filteredItems, currentPage, itemsPerPage]);

  // Precargar imágenes de Branding cuando se selecciona el filtro
  useEffect(() => {
    if (activeFilter === "Branding") {
      const brandingImages = marketingPortfolio
        .filter(item => item.category === "Branding" && !item.isVideo)
        .map(item => item.imageUrl);
      
      // Precargar todas las imágenes de branding
      brandingImages.forEach(imageUrl => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = imageUrl;
        document.head.appendChild(link);
      });
    }
  }, [activeFilter]);

  // Memoizar handler de cambio de filtro
  const handleFilterChange = useCallback((filter: FilterCategory) => {
    setActiveFilter(filter);
    setCurrentPage(0); // Reset página al cambiar filtro
  }, []);

  // Memoizar handlers de paginación
  const handlePrevPage = useCallback(() => {
    setSwipeDirection(-1);
    setCurrentPage(prev => Math.max(0, prev - 1));
  }, []);

  const handleNextPage = useCallback(() => {
    setSwipeDirection(1);
    setCurrentPage(prev => prev + 1);
  }, []);

  // Funciones para el modal de Branding
  const handleZoomIn = useCallback(() => {
    setZoomLevel(prev => Math.min(prev + 0.5, 4));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoomLevel(prev => Math.max(prev - 0.5, 0.25));
  }, []);

  const handleResetZoom = useCallback(() => {
    setZoomLevel(1);
    setImagePosition({ x: 0, y: 0 });
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (zoomLevel > 1) {
      e.preventDefault();
      setIsDraggingModal(true);
      setDragStart({ x: e.clientX - imagePosition.x, y: e.clientY - imagePosition.y });
    }
  }, [zoomLevel, imagePosition]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isDraggingModal && zoomLevel > 1) {
      e.preventDefault();
      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;
      
      // Calcular límites para evitar que la imagen se salga completamente de la vista
      const maxX = window.innerWidth * 0.1;
      const maxY = window.innerHeight * 0.1;
      const minX = -window.innerWidth * 0.1;
      const minY = -window.innerHeight * 0.1;
      
      setImagePosition({
        x: Math.max(minX, Math.min(maxX, newX)),
        y: Math.max(minY, Math.min(maxY, newY))
      });
    }
  }, [isDraggingModal, dragStart, zoomLevel]);

  const handleMouseUp = useCallback(() => {
    setIsDraggingModal(false);
  }, []);

  // Funciones para touch (móviles)
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (zoomLevel > 1 && e.touches.length === 1) {
      e.preventDefault();
      const touch = e.touches[0];
      setIsDraggingModal(true);
      setDragStart({ x: touch.clientX - imagePosition.x, y: touch.clientY - imagePosition.y });
    }
  }, [zoomLevel, imagePosition]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (isDraggingModal && zoomLevel > 1 && e.touches.length === 1) {
      e.preventDefault();
      const touch = e.touches[0];
      const newX = touch.clientX - dragStart.x;
      const newY = touch.clientY - dragStart.y;
      
      // Calcular límites para evitar que la imagen se salga completamente de la vista
      const maxX = window.innerWidth * 0.1;
      const maxY = window.innerHeight * 0.1;
      const minX = -window.innerWidth * 0.1;
      const minY = -window.innerHeight * 0.1;
      
      setImagePosition({
        x: Math.max(minX, Math.min(maxX, newX)),
        y: Math.max(minY, Math.min(maxY, newY))
      });
    }
  }, [isDraggingModal, dragStart, zoomLevel]);

  const handleTouchEnd = useCallback(() => {
    setIsDraggingModal(false);
  }, []);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      handleZoomIn();
    } else {
      handleZoomOut();
    }
  }, [handleZoomIn, handleZoomOut]);

  const handleCloseModal = useCallback(() => {
    setSelectedImage(null);
    setZoomLevel(1);
    setImagePosition({ x: 0, y: 0 });
    setIsDraggingModal(false);
  }, []);

  // Manejar tecla ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedImage) {
        handleCloseModal();
      }
    };

    if (selectedImage) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [selectedImage, handleCloseModal]);

  const { totalPages, currentItems, canGoPrev, canGoNext } = paginationData;

  return (
    <section 
      id="success-stories"
      className={cn(
        "relative py-16 sm:py-20 md:py-24 lg:py-28 bg-black overflow-x-hidden",
        sectionPadding.x
      )}
      aria-label={String(useTranslations('ariaLabels')('marketingPortfolio'))}
    >
      <div className="max-w-7xl mx-auto">
        {/* Título - Reutiliza SectionTitle */}
        <div className="text-center mb-12 md:mb-16">
          <SectionTitle className={cn(themeColors.white, "leading-tight")}>
            {String(t('title'))}{" "}
            <span className={themeColors.marketing}>{String(t('titleHighlight'))}</span>
            {" "}{String(t('titleEnd'))}
          </SectionTitle>
        </div>

        {/* Botones de Filtro - Mismo tamaño */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 md:gap-6 mb-12 md:mb-16"
        >
          {filterCategories.map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <motion.button
                key={filter}
                onClick={() => handleFilterChange(filter)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  "px-4 sm:px-6 py-2.5 sm:py-3 rounded-full text-sm sm:text-base font-semibold transition-all duration-300",
                  "backdrop-blur-xl bg-white/5 border-2 cursor-pointer whitespace-nowrap",
                  "w-[140px] sm:w-[160px] flex items-center justify-center",
                  isActive 
                    ? "text-white" 
                    : "border-white/20 text-white/70 hover:border-white/40 hover:text-white"
                )}
                style={
                  isActive 
                    ? { 
                        borderColor: ACCENT_COLOR,
                        boxShadow: `0 0 30px ${ACCENT_COLOR}80, 0 0 60px ${ACCENT_COLOR}40, inset 0 0 20px ${ACCENT_COLOR}20` 
                      } 
                    : undefined
                }
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.boxShadow = `0 0 20px ${ACCENT_COLOR}60, 0 0 40px ${ACCENT_COLOR}30`;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.boxShadow = "none";
                  }
                }}
              >
                {categoryTranslationMap[filter]}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Grid de Imágenes y Videos */}
        <AnimatePresence mode="wait">
          {activeFilter === "Reels" ? (
            /* Carrusel moderno de Reels - Sin espacios vacíos */
            filteredItems.length > 0 ? (
              <div className="relative w-full max-w-7xl mx-auto px-4 md:px-8">
                <motion.div
                  key={`reels-${currentPage}`}
                  initial={{ opacity: 0, x: swipeDirection > 0 ? 300 : -300 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: swipeDirection > 0 ? -300 : 300 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  drag={isMobile ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={(e, { offset, velocity }) => {
                    if (isMobile) {
                      const swipe = Math.abs(offset.x) * velocity.x;
                      if (swipe < -10000 && canGoNext) {
                        handleNextPage();
                      } else if (swipe > 10000 && canGoPrev) {
                        handlePrevPage();
                      }
                    }
                  }}
                  className={cn(
                    "grid gap-4 sm:gap-6 md:gap-8 lg:gap-10 py-10 place-items-center",
                    isMobile ? "cursor-grab active:cursor-grabbing" : "",
                    currentItems.length === 1 ? "grid-cols-1 max-w-sm mx-auto" :
                    currentItems.length === 2 ? "grid-cols-1 md:grid-cols-2 max-w-3xl mx-auto" :
                    "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                  )}
                >
                  {currentItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ 
                        duration: 0.5, 
                        delay: index * 0.15,
                        ease: "easeOut"
                      }}
                      whileHover={{ scale: 1.03, y: -5 }}
                      className="relative w-full max-w-sm aspect-[9/16] rounded-3xl overflow-hidden shadow-2xl shadow-violet-500/20 hover:shadow-violet-500/40 border-2 border-white/10 hover:border-violet-400/50 transition-all duration-500 cursor-pointer group"
                      onMouseEnter={(e) => {
                        const video = e.currentTarget.querySelector('video');
                        if (video) {
                          video.play();
                        }
                      }}
                      onMouseLeave={(e) => {
                        const video = e.currentTarget.querySelector('video');
                        if (video) {
                          video.pause();
                          video.currentTime = 0;
                        }
                      }}
                    >
                      {/* Glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-t from-violet-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                      
                      <video
                        src={item.imageUrl}
                        className="w-full h-full object-cover"
                        loop
                        muted={isMuted}
                        playsInline
                        preload="metadata"
                      />
                      
                      {/* Overlay moderno con gradiente */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                          <p className="text-white text-base md:text-lg font-semibold drop-shadow-lg">
                            {item.title || item.alt}
                          </p>
                        </div>
                      </div>

                      {/* Play indicator */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-70 group-hover:opacity-0 transition-opacity duration-300 pointer-events-none">
                        <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border-2 border-white/30">
                          <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </div>
                      </div>

                      {/* Botón de mute moderno */}
                      <button
                        onClick={() => setIsMuted(!isMuted)}
                        className="absolute top-4 right-4 p-2.5 rounded-full bg-black/60 backdrop-blur-md hover:bg-black/80 transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110"
                      >
                        {isMuted ? (
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                          </svg>
                        )}
                      </button>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Navegación con flechas más modernas - Solo desktop */}
                {totalPages > 1 && !isMobile && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex items-center justify-center gap-4 sm:gap-8 mt-10"
                  >
                    {/* Flecha Anterior */}
                    <motion.button
                      onClick={handlePrevPage}
                      disabled={!canGoPrev}
                      whileHover={canGoPrev ? { scale: 1.15, x: -3 } : {}}
                      whileTap={canGoPrev ? { scale: 0.95 } : {}}
                      className={cn(
                        "p-4 rounded-2xl backdrop-blur-xl border-2 transition-all duration-300 shadow-lg",
                        canGoPrev 
                          ? "border-violet-400/50 hover:border-violet-400 cursor-pointer hover:shadow-violet-500/50" 
                          : "border-white/10 opacity-20 cursor-not-allowed"
                      )}
                      style={canGoPrev ? { backgroundColor: `${ACCENT_COLOR}30` } : undefined}
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 18l-6-6 6-6" />
                      </svg>
                    </motion.button>

                    {/* Indicador de página moderno */}
                    <div className="px-6 py-3 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
                      <span className="text-white font-semibold text-lg">
                        {currentPage + 1}
                      </span>
                      <span className="text-white/50 mx-2">/</span>
                      <span className="text-white/70 font-medium">
                        {totalPages}
                      </span>
                    </div>

                    {/* Flecha Siguiente */}
                    <motion.button
                      onClick={handleNextPage}
                      disabled={!canGoNext}
                      whileHover={canGoNext ? { scale: 1.15, x: 3 } : {}}
                      whileTap={canGoNext ? { scale: 0.95 } : {}}
                      className={cn(
                        "p-4 rounded-2xl backdrop-blur-xl border-2 transition-all duration-300 shadow-lg",
                        canGoNext 
                          ? "border-violet-400/50 hover:border-violet-400 cursor-pointer hover:shadow-violet-500/50" 
                          : "border-white/10 opacity-20 cursor-not-allowed"
                      )}
                      style={canGoNext ? { backgroundColor: `${ACCENT_COLOR}30` } : undefined}
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 18l6-6-6-6" />
                      </svg>
                    </motion.button>
                  </motion.div>
                )}
              </div>
            ) : (
              /* Mensaje cuando no hay videos */
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-20"
              >
                <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-4">
                  <svg className="w-10 h-10 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-white/50 text-lg">No hay videos disponibles</p>
              </motion.div>
            )
          ) : (
            /* Layout para Redes Sociales y Brand Kit - Formato vertical como videos */
            filteredItems.length > 0 ? (
              <div className="relative w-full max-w-7xl mx-auto px-4 md:px-8">
                <motion.div
                  key={`${activeFilter}-${currentPage}`}
                  initial={{ opacity: 0, x: swipeDirection > 0 ? 300 : -300 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: swipeDirection > 0 ? -300 : 300 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  drag={isMobile ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragStart={() => {
                    if (isMobile) {
                      setIsDragging(true);
                    }
                  }}
                  onDragEnd={(e, { offset, velocity }) => {
                    if (isMobile) {
                      const swipe = Math.abs(offset.x) * velocity.x;
                      if (swipe < -10000 && canGoNext) {
                        handleNextPage();
                      } else if (swipe > 10000 && canGoPrev) {
                        handlePrevPage();
                      }
                      // Reset dragging después de un pequeño delay
                      setTimeout(() => setIsDragging(false), 100);
                    }
                  }}
                  className={cn(
                    "grid gap-4 sm:gap-6 md:gap-8 lg:gap-10 py-10 place-items-center",
                    isMobile ? "cursor-grab active:cursor-grabbing" : "",
                    currentItems.length === 1 ? "grid-cols-1 max-w-sm mx-auto" :
                    currentItems.length === 2 ? "grid-cols-1 md:grid-cols-2 max-w-3xl mx-auto" :
                    "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                  )}
                >
                  {currentItems.map((item, index) => {
                    const handleClick = (e: React.MouseEvent) => {
                      if (isDragging) {
                        e.preventDefault();
                        e.stopPropagation();
                        return;
                      }
                      if (activeFilter === "Branding" && !isDragging) {
                        // Para Branding, abrir modal
                        setSelectedImage(item);
                      } else if (item.link && !isDragging) {
                        // Para otras categorías, abrir enlace
                        window.open(item.link, '_blank', 'noopener,noreferrer');
                      }
                    };
                    
                    return (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ 
                          duration: 0.5, 
                          delay: index * 0.15,
                          ease: "easeOut"
                        }}
                        whileHover={{ scale: 1.03, y: -5 }}
                        className="relative w-full max-w-sm aspect-[9/16] rounded-3xl overflow-hidden shadow-2xl shadow-violet-500/20 hover:shadow-violet-500/40 border-2 border-white/10 hover:border-violet-400/50 transition-all duration-500 cursor-pointer group"
                      >
                        <div 
                          onClick={handleClick} 
                          className="block w-full h-full relative"
                        >
                          {/* Glow effect */}
                          <div className="absolute inset-0 bg-gradient-to-t from-violet-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />
                          
                          {/* Imagen que se ajusta para todas las categorías */}
                          <Image
                            src={item.imageUrl}
                            alt={item.alt}
                            fill
                            className={activeFilter === "Branding" ? "object-cover object-top" : "object-cover object-top"}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            priority={index < 3 || activeFilter === "Branding"}
                            quality={100}
                            loading={activeFilter === "Branding" ? "eager" : undefined}
                            placeholder="blur"
                            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                          />
                          
                          {/* Overlay moderno - Comentado para no mostrar título en hover */}
                          {/* <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
                            <div className="absolute bottom-0 left-0 right-0 p-6">
                              <p className="text-white text-base md:text-lg font-semibold drop-shadow-lg">
                                {item.title || item.alt}
                              </p>
                              {item.link && (
                                <p className="text-white/70 text-sm mt-2">
                                  Haz click para ver más →
                                </p>
                              )}
                            </div>
                          </div> */}
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>

                {/* Navegación con flechas modernas - Solo desktop */}
                {totalPages > 1 && !isMobile && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex items-center justify-center gap-4 sm:gap-8 mt-10"
                  >
                    {/* Flecha Anterior */}
                    <motion.button
                      onClick={handlePrevPage}
                      disabled={!canGoPrev}
                      whileHover={canGoPrev ? { scale: 1.15, x: -3 } : {}}
                      whileTap={canGoPrev ? { scale: 0.95 } : {}}
                      className={cn(
                        "p-4 rounded-2xl backdrop-blur-xl border-2 transition-all duration-300 shadow-lg",
                        canGoPrev 
                          ? "border-violet-400/50 hover:border-violet-400 cursor-pointer hover:shadow-violet-500/50" 
                          : "border-white/10 opacity-20 cursor-not-allowed"
                      )}
                      style={canGoPrev ? { backgroundColor: `${ACCENT_COLOR}30` } : undefined}
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 18l-6-6 6-6" />
                      </svg>
                    </motion.button>

                    {/* Indicador de página moderno */}
                    <div className="px-6 py-3 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
                      <span className="text-white font-semibold text-lg">
                        {currentPage + 1}
                      </span>
                      <span className="text-white/50 mx-2">/</span>
                      <span className="text-white/70 font-medium">
                        {totalPages}
                      </span>
                    </div>

                    {/* Flecha Siguiente */}
                    <motion.button
                      onClick={handleNextPage}
                      disabled={!canGoNext}
                      whileHover={canGoNext ? { scale: 1.15, x: 3 } : {}}
                      whileTap={canGoNext ? { scale: 0.95 } : {}}
                      className={cn(
                        "p-4 rounded-2xl backdrop-blur-xl border-2 transition-all duration-300 shadow-lg",
                        canGoNext 
                          ? "border-violet-400/50 hover:border-violet-400 cursor-pointer hover:shadow-violet-500/50" 
                          : "border-white/10 opacity-20 cursor-not-allowed"
                      )}
                      style={canGoNext ? { backgroundColor: `${ACCENT_COLOR}30` } : undefined}
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 18l6-6-6-6" />
                      </svg>
                    </motion.button>
                  </motion.div>
                )}
              </div>
            ) : (
              /* Mensaje cuando no hay imágenes */
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-20"
              >
                <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-4">
                  <svg className="w-10 h-10 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-white/50 text-lg">No hay contenido disponible</p>
              </motion.div>
            )
          )}
        </AnimatePresence>
      </div>

      {/* Modal simplificado para imágenes de Branding */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
            onClick={handleCloseModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-[80vw] h-[80vh] max-w-4xl max-h-[80vh] mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Botón de cerrar simple */}
              <button
                onClick={handleCloseModal}
                className="absolute -top-12 right-0 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-sm"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Contenedor de imagen con zoom */}
              <div 
                className={`relative w-full h-full rounded-2xl overflow-auto shadow-2xl ${
                  zoomLevel > 1 
                    ? 'cursor-grab active:cursor-grabbing' 
                    : 'cursor-default'
                }`}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                style={{ userSelect: 'none', touchAction: 'auto' }}
                onWheel={(e) => e.stopPropagation()}
              >
                <motion.div
                  style={{
                    transform: `scale(${zoomLevel}) translate(${imagePosition.x / zoomLevel}px, ${imagePosition.y / zoomLevel}px)`,
                    transformOrigin: 'center center',
                    minHeight: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  transition={{ type: "spring", damping: 25, stiffness: 300 }}
                  className="relative w-full"
                >
                  <Image
                    src={selectedImage.imageUrl}
                    alt={selectedImage.alt}
                    width={1200}
                    height={1800}
                    className="w-full h-auto object-contain"
                    style={{ minHeight: '100%' }}
                    priority
                    quality={100}
                    draggable={false}
                  />
                </motion.div>

                {/* Controles de zoom siempre visibles */}
                <div className="absolute top-4 right-4 flex items-center gap-2 bg-black/50 rounded-lg px-3 py-2 backdrop-blur-sm">
                  <button
                    onClick={handleZoomOut}
                    className="p-2 rounded hover:bg-white/20 transition-colors"
                    disabled={zoomLevel <= 0.25}
                  >
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </button>
                  
                  <span className="text-white text-sm px-2 min-w-[50px] text-center">
                    {Math.round(zoomLevel * 100)}%
                  </span>
                  
                  <button
                    onClick={handleZoomIn}
                    className="p-2 rounded hover:bg-white/20 transition-colors"
                    disabled={zoomLevel >= 4}
                  >
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>

                  <button
                    onClick={handleResetZoom}
                    className="px-3 py-2 rounded bg-white/20 hover:bg-white/30 transition-colors text-white text-sm"
                  >
                    Reset
                  </button>
                </div>

                {/* Overlay con título (solo en hover) */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-white text-xl font-semibold mb-2">
                      {selectedImage.title}
                    </h3>
                    <p className="text-white/70 text-sm">
                      {selectedImage.alt}
                    </p>
                  </div>
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

