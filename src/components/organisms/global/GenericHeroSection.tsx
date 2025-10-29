"use client";

import { VideoBackground } from "../../atoms/VideoBackground";
import { GradientOverlay } from "../../atoms/GradientOverlay";
import { Heading } from "../../atoms/Heading";
import { Paragraph } from "../../atoms/Paragraph";
import { LazyMotion } from "../../atoms/LazyMotion";
import { cn, sectionPadding, themeColors, textSizes, maxWidths } from "@/utils/classNames";

interface HeroButton {
  text: string;
  href: string;
  variant: "primary" | "secondary" | "teal" | "marketing" | "glass";
  icon?: string;
}

interface GenericHeroSectionProps {
  /** Color overlay para el video */
  colorOverlay: string;
  /** Partes del título (texto antes del highlight) */
  titleBefore: string;
  /** Texto destacado en color */
  titleHighlight: string;
  /** Color del highlight (key de themeColors) */
  highlightColor: keyof typeof themeColors;
  /** Partes del título (texto después del highlight) */
  titleAfter: string;
  /** Descripción del hero */
  description: string;
  /** Botones de acción */
  buttons: [HeroButton, HeroButton];
  /** Label de aria para accesibilidad */
  ariaLabel: string;
  /** Nivel del título (h1, h2, etc.) */
  titleLevel?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

/**
 * Organism: GenericHeroSection
 * Hero section genérico y reutilizable para todas las páginas
 * Evita duplicación de código
 */
export function GenericHeroSection({
  colorOverlay,
  titleBefore,
  titleHighlight,
  highlightColor,
  titleAfter,
  description,
  buttons,
  ariaLabel,
  titleLevel = "h1",
}: GenericHeroSectionProps) {
  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label={ariaLabel}
    >
      {/* Video de fondo con tinte personalizado */}
      <VideoBackground
        src="/videos/header_1_optimized.webm"
        poster="/images/design-ux-ui.webp"
        colorOverlay={colorOverlay}
      />

      {/* Contenido */}
      <div className={cn(
        "relative z-10 w-full text-center",
        maxWidths.lg,
        sectionPadding.x,
        sectionPadding.yHero
      )}>
        <LazyMotion
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6 sm:space-y-8 md:space-y-10 lg:space-y-12 xl:space-y-16"
        >
          {/* Título con color personalizado */}
          <Heading level={titleLevel} className={cn(themeColors.white, "leading-tight", textSizes.heroTitle)}>
            {titleBefore}{" "}
            <span className={themeColors[highlightColor]}>{titleHighlight}</span>
            {" "}{titleAfter}
          </Heading>

          {/* Descripción */}
          <LazyMotion
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className={cn(maxWidths.prose, "px-4 sm:px-0")}
          >
            <Paragraph size="lg" className={cn("text-white/80 leading-relaxed", textSizes.sectionDescription)}>
              {description}
            </Paragraph>
          </LazyMotion>

          {/* Botones */}
          <LazyMotion
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center pt-6"
          >
            {buttons.map((button, index) => (
              <a
                key={index}
                href={button.href}
                className={cn(
                  "w-full sm:w-56 md:w-64 px-8 py-4 text-lg rounded-full font-semibold",
                  "transition-all duration-300 backdrop-blur-xl bg-white/5 border-2 text-white cursor-pointer",
                  "flex items-center justify-center gap-2 hover:scale-105 active:scale-95"
                )}
                style={{
                  borderColor: "rgba(255, 255, 255, 0.2)"
                }}
                onClick={(e) => {
                  // Si el href es un ancla (#), hacer scroll suave
                  if (button.href.startsWith('#')) {
                    e.preventDefault();
                    const targetId = button.href.substring(1);
                    const targetElement = document.getElementById(targetId);
                    if (targetElement) {
                      const navbarHeight = 100;
                      const elementPosition = targetElement.getBoundingClientRect().top;
                      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
                      
                      window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                      });
                    }
                  }
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = colorOverlay;
                  e.currentTarget.style.boxShadow = `0 0 30px ${colorOverlay}80, 0 0 60px ${colorOverlay}40, inset 0 0 20px ${colorOverlay}20`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {button.text}
                {button.icon && (
                  <img src={button.icon} alt="" className="w-5 h-5" />
                )}
              </a>
            ))}
          </LazyMotion>
        </LazyMotion>
      </div>

      {/* Gradient overlay bottom */}
      <GradientOverlay direction="bottom" />
    </section>
  );
}

