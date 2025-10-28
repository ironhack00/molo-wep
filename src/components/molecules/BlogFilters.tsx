"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconChevronDown } from "@tabler/icons-react";
import { cn, glassmorphism } from "@/utils/classNames";
import { useIsMobile } from "../hooks/useIsMobile";

interface BlogFiltersProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const PRIMARY_COLOR = "#25d9d8";

/**
 * Molecule: BlogFilters
 * Filtros de categorías para el blog
 * Responsive: Dropdown en mobile, botones en desktop
 */
export function BlogFilters({ 
  categories, 
  selectedCategory, 
  onCategoryChange 
}: BlogFiltersProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const isMobile = useIsMobile();

  const handleCategorySelect = (category: string) => {
    onCategoryChange(category);
    setIsDropdownOpen(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      {isMobile ? (
        /* Dropdown para Mobile */
        <div className="relative max-w-md mx-auto">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className={cn(
              "w-full px-6 py-4 rounded-2xl transition-all duration-300 flex items-center justify-between",
              "border-2 hover:border-emerald-400/60",
              "bg-black/40 backdrop-blur-xl cursor-pointer"
            )}
            style={{
              borderColor: PRIMARY_COLOR + "80",
              boxShadow: `0 0 20px ${PRIMARY_COLOR}40`
            }}
          >
            <span className="text-white font-semibold text-base">
              {selectedCategory}
            </span>
            <IconChevronDown 
              className={cn(
                "w-5 h-5 transition-transform duration-300",
                isDropdownOpen && "rotate-180"
              )}
              style={{ color: PRIMARY_COLOR }}
              strokeWidth={2.5}
            />
          </button>

          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className={cn(
                  "absolute top-full left-0 right-0 mt-2 rounded-2xl overflow-hidden z-50",
                  "border-2 shadow-2xl",
                  "bg-black/95 backdrop-blur-xl"
                )}
                style={{
                  borderColor: PRIMARY_COLOR + "60",
                  boxShadow: `0 0 40px ${PRIMARY_COLOR}60, 0 10px 30px rgba(0,0,0,0.5)`
                }}
              >
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategorySelect(category)}
                    className={cn(
                      "w-full px-6 py-4 text-left transition-all duration-200",
                      "border-b border-white/10 last:border-b-0",
                      "active:scale-98",
                      selectedCategory === category 
                        ? "text-white font-semibold" 
                        : "text-white/70 hover:text-white"
                    )}
                    style={
                      selectedCategory === category
                        ? {
                            backgroundColor: PRIMARY_COLOR + "30",
                            boxShadow: `inset 0 0 20px ${PRIMARY_COLOR}20`
                          }
                        : undefined
                    }
                    onMouseEnter={(e) => {
                      if (selectedCategory !== category) {
                        e.currentTarget.style.backgroundColor = PRIMARY_COLOR + "15";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedCategory !== category) {
                        e.currentTarget.style.backgroundColor = "transparent";
                      }
                    }}
                  >
                    {category}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        /* Botones horizontales para Desktop */
        <div className="flex flex-wrap gap-3 justify-center md:justify-start">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={cn(
                "px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer",
                "border",
                selectedCategory === category
                  ? "bg-primary/20 border-primary text-primary"
                  : cn(
                      "border-white/20 text-white/70 hover:border-white/40 hover:text-white",
                      glassmorphism.light
                    )
              )}
            >
              {category}
            </button>
          ))}
        </div>
      )}
    </motion.div>
  );
}

