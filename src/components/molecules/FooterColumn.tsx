"use client";

import { motion } from "framer-motion";
import { LocalizedLink } from "../atoms/LocalizedLink";

interface FooterColumnProps {
  title: string;
  items: string[] | { text: string; href: string }[];
  delay?: number;
}

/**
 * Molecule: FooterColumn
 * Columna del footer con título y lista de items
 * Soporta strings simples o objetos con href
 */
export function FooterColumn({ title, items, delay = 0 }: FooterColumnProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      className="flex flex-col gap-4"
    >
      <h3 className="text-white font-bold text-lg sm:text-xl">{title}</h3>
      <ul className="space-y-2">
        {items.map((item, index) => {
          const text = typeof item === "string" ? item : item.text;
          const href = typeof item === "string" ? "#" : item.href;
          
          return (
            <li key={index}>
              <LocalizedLink
                href={href}
                className="text-white/70 hover:text-white transition-colors duration-300 text-sm sm:text-base"
              >
                {text}
              </LocalizedLink>
            </li>
          );
        })}
      </ul>
    </motion.div>
  );
}

