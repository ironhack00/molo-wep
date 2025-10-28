"use client";

import { motion, useAnimation } from "framer-motion";
import { useState, useEffect } from "react";

interface Logo {
  id: number;
  name: string;
  url?: string;
}

// Logos de empresas ficticias (puedes reemplazar con logos reales)
const companyLogos: Logo[] = [
  { id: 1, name: "TechCorp" },
  { id: 2, name: "InnovateLab" },
  { id: 3, name: "DigitalPro" },
  { id: 4, name: "CloudSync" },
  { id: 5, name: "DataFlow" },
  { id: 6, name: "SmartBiz" },
  { id: 7, name: "NextGen" },
  { id: 8, name: "GlobalTech" },
];

/**
 * Molecule: LogoCarousel
 * Carrusel infinito automático de logos de empresas
 * Movimiento continuo sin saltos, se pausa al hacer hover
 */
export function LogoCarousel() {
  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimation();
  
  // Duplicamos los logos para crear el efecto infinito perfecto
  const duplicatedLogos = [...companyLogos, ...companyLogos];

  useEffect(() => {
    if (!isHovered) {
      controls.start({
        x: ["0%", "-50%"],
        transition: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 30,
          ease: "linear",
        },
      });
    } else {
      controls.stop();
    }
  }, [isHovered, controls]);

  return (
    <div 
      className="w-full overflow-hidden py-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        {/* Contenedor del carrusel con animación infinita */}
        <motion.div
          className="flex gap-8 md:gap-12 lg:gap-16 items-center"
          animate={controls}
        >
          {duplicatedLogos.map((logo, index) => (
            <span
              key={`${logo.id}-${index}`}
              className="flex-shrink-0 text-white font-bold text-xl md:text-2xl lg:text-3xl whitespace-nowrap opacity-90 hover:opacity-100 transition-opacity duration-300"
            >
              {logo.name}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

