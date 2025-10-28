"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Paragraph } from "../atoms/Paragraph";
import { cn, glassmorphism, glassBorder, themeColors } from "@/utils/classNames";

/**
 * Molecule: AccordionItem
 * Elemento de acordeón con fondo translúcido (glassmorphism)
 * Icono + que gira 720° y se convierte en -
 * Reutiliza Paragraph y utilidades de clase
 */
interface AccordionItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
  accentColor?: string;
}

const variants = {
  collapsed: { opacity: 0, height: 0, marginTop: 0 },
  open: { opacity: 1, height: "auto", marginTop: 8 },
};

export function AccordionItem({ question, answer, isOpen, onClick, accentColor = "#00d4aa" }: AccordionItemProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "w-full rounded-2xl py-5 transition-all duration-300 cursor-pointer border",
        isOpen 
          ? cn(glassmorphism.light, glassBorder.light, themeColors.teal, "bg-opacity-5") 
          : cn(glassmorphism.dark, "border-transparent")
      )}
    >
      {/* Pregunta con icono */}
      <div className="relative w-full px-3 sm:px-4 flex justify-between items-center gap-3 sm:gap-4">
        <Paragraph size="md" className={cn(themeColors.white, "text-sm sm:text-base")}>
          {question}
        </Paragraph>

        {/* Icono + / - con círculo */}
        <div 
          className={cn(
            "min-w-7 min-h-7 w-7 h-7 sm:min-w-8 sm:min-h-8 sm:w-8 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-500 border",
            isOpen ? "border-current" : "border-white/30"
          )}
          style={isOpen ? { color: accentColor } : undefined}
        >
          <div
            className={cn(
              "relative w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-700 ease-in-out",
              isOpen && "rotate-[720deg]"
            )}
          >
            {/* Línea horizontal (siempre presente) */}
            <div 
              className="absolute top-1/2 left-0 w-full h-0.5 -translate-y-1/2 transition-colors duration-300"
              style={{ backgroundColor: isOpen ? accentColor : "white" }}
            />
            
            {/* Línea vertical (solo visible cuando cerrado) */}
            <div 
              className={cn(
                "absolute top-0 left-1/2 w-0.5 h-full -translate-x-1/2 transition-all duration-300",
                isOpen ? "opacity-0 scale-0" : "opacity-100 scale-100"
              )}
              style={{ backgroundColor: isOpen ? accentColor : "white" }}
            />
          </div>
        </div>
      </div>

      {/* Respuesta expandible */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={variants}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden px-3 sm:px-4"
          >
            <Paragraph size="md" className="text-white/70 leading-relaxed text-sm sm:text-base">
              {answer}
            </Paragraph>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

