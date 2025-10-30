"use client";

import { LocalizedLink } from "../atoms/LocalizedLink";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { IconChevronDown } from "@tabler/icons-react";
import { cn } from "@/utils/classNames";

const ACCENT_COLOR = "#25d9d8";

interface SubService {
  name: string;
  slugify: string;
  icon: React.ReactNode;
  color: string;
}

interface NavModalProps {
  service: string;
  subServices: SubService[];
}

export default function NavModal({ service, subServices }: NavModalProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Verificar si estamos en alguna página de servicio (considerar /es prefix)
  const cleanPathname = pathname?.replace(/^\/es/, '') || '/';
  const isServiceActive = subServices.some(sub => 
    cleanPathname === `/${sub.slugify}` || 
    pathname === `/${sub.slugify}` || 
    pathname === `/es/${sub.slugify}`
  );

  const getButtonStyle = () => {
    if (isServiceActive) {
      return {
        color: ACCENT_COLOR,
        textShadow: `0 0 20px ${ACCENT_COLOR}, 0 0 40px ${ACCENT_COLOR}80`,
      };
    }
    return {};
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        className="flex items-center gap-1 hover:text-primary transition-all duration-300 text-sm lg:text-base whitespace-nowrap"
        style={getButtonStyle()}
      >
        {service}
        <IconChevronDown
          className={`w-4 h-4 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "absolute top-full left-0 mt-2 p-4 min-w-[200px] rounded-lg shadow-xl bg-black/80 backdrop-blur-xl border border-white/20"
            )}
          >
            <div className="flex flex-col gap-2">
              {subServices.map((sub, index) => (
                <LocalizedLink
                  key={index}
                  href={`/${sub.slugify}`}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/10 transition-all group"
                  onClick={() => setOpen(false)}
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: sub.color }}
                  >
                    <div className="w-4 h-4 text-white flex items-center justify-center">
                      {sub.icon}
                    </div>
                  </div>
                  <span className="text-sm group-hover:text-primary transition-colors">
                    {sub.name}
                  </span>
                </LocalizedLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

