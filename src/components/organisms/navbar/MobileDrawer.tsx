"use client";

import { AnimatePresence } from "framer-motion";
import { Logo } from "../../molecules/Logo";
import { MenuItem } from "../../molecules/MenuItem";
import { ServiceLink } from "../../molecules/ServiceLink";
import { Icon } from "../../atoms/Icon";
import { getServices } from "@/data/services";

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectLink: string;
  viewServicesPhone: boolean;
  onToggleServices: () => void;
}

/**
 * Organism: MobileDrawer
 * Drawer lateral completo con navegación mobile
 */
export function MobileDrawer({
  isOpen,
  onClose,
  selectLink,
  viewServicesPhone,
  onToggleServices,
}: MobileDrawerProps) {
  const services = getServices();

  const handleServiceClick = () => {
    onToggleServices();
    onClose();
  };

  return (
    <div
      className={`md:hidden w-full h-dvh fixed z-50 top-0 left-0 bg-black/60 flex justify-end ${
        isOpen ? "visible" : "invisible"
      } transition-opacity duration-500`}
      onClick={onClose}
    >
      <div
        className={`flex flex-col justify-between items-center gap-6 sm:gap-10 text-base sm:text-lg bg-black bg-gradient-to-b from-transparent to-primary/10 px-4 sm:px-5 py-8 sm:py-10 rounded-l-2xl transform transition-transform duration-500 ease-in-out border-l border-white/20 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } ${viewServicesPhone ? "w-[min(75%,320px)] sm:w-[min(70%,380px)]" : "w-[min(65%,280px)] sm:w-[min(60%,320px)]"} max-w-[400px]`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="w-full flex justify-between items-center">
          <Logo variant="drawer" />
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-1 w-full flex-col items-start justify-center space-y-4 text-base">
          <MenuItem href="/" label="Home" icon="home" isActive={selectLink === "/"} onClick={onClose} />

          {/* Services with submenu */}
          <div onClick={onToggleServices} className="relative cursor-pointer w-full">
            <button
              className={`flex items-center justify-start border-l-3 gap-2 py-2 px-2 w-full active:scale-95 transition-all ${
                Number(selectLink) ? "border-primary" : "bg-transparent border-transparent text-white/60"
              }`}
            >
              <Icon name="services" stroke={2} />
              Services
            </button>

            <AnimatePresence>
              {viewServicesPhone && (
                <div className="w-full flex flex-col gap-2 justify-start items-start pl-4">
                  {services.map((service, index) => (
                    <a
                      key={`${service.slugify}-${index}`}
                      href={`/${service.slugify}`}
                      onClick={handleServiceClick}
                      className="flex items-center gap-3 p-2 rounded-md hover:bg-white/5 transition-all active:scale-95 w-full"
                    >
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: service.bg }}
                      >
                        <div className="w-4 h-4 text-white flex items-center justify-center">
                          {service.icon}
                        </div>
                      </div>
                      <span className="text-sm text-white/80">{service.name}</span>
                    </a>
                  ))}
                </div>
              )}
            </AnimatePresence>
          </div>

          <MenuItem href="/about" label="About Us" icon="about" isActive={selectLink === "about"} onClick={onClose} />
          <MenuItem href="/blog" label="Blog" icon="blog" isActive={selectLink === "blog"} onClick={onClose} />
          <MenuItem href="/faq" label="FAQ" icon="faq" isActive={selectLink === "faq"} onClick={onClose} />
          <MenuItem href="/contact" label="Contact" icon="contact" isActive={selectLink === "contact"} onClick={onClose} />
        </nav>
      </div>
    </div>
  );
}

