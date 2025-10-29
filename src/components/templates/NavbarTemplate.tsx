"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { LocalizedLink } from "../atoms/LocalizedLink";
import { Logo } from "../molecules/Logo";
import { DesktopNavigation, MobileNavigation, MobileDrawer } from "../organisms/navbar";
import { useTranslations } from '@/lib/i18n/IntlProvider';

interface NavbarTemplateProps {
  scrolled: boolean;
  openMenu: boolean;
  selectLink: string;
  viewServicesPhone: boolean;
  onMenuToggle: () => void;
  onMenuClose: () => void;
  onServicesToggle: () => void;
}

/**
 * Template: NavbarTemplate
 * Plantilla del navbar que organiza todos los organismos
 */
export function NavbarTemplate({
  scrolled,
  openMenu,
  selectLink,
  viewServicesPhone,
  onMenuToggle,
  onMenuClose,
  onServicesToggle,
}: NavbarTemplateProps) {
  const t = useTranslations('nav');
  const [isHovered, setIsHovered] = useState(false);
  const ACCENT_COLOR = "#25d9d8";

  return (
    <motion.nav
      initial={false}
      animate={scrolled ? "scrolled" : "top"}
      variants={{
        top: {
          backgroundColor: "rgba(0, 0, 0, 0)",
          borderRadius: "0px",
          border: "0px solid transparent",
          backdropFilter: "blur(0px)",
        },
        scrolled: {
          backgroundColor: "rgba(0, 0, 0, 0.3)",
          borderRadius: "0px",
          border: "0px solid transparent",
          backdropFilter: "blur(20px)",
        },
      }}
      transition={{ duration: 0 }}
      className="fixed w-full top-0 left-0 right-0 flex items-center justify-between py-3 md:py-4 z-[1000] px-4 md:px-8 lg:px-12 xl:px-16 navbar-fixed"
    >
      {/* Logo (Left) */}
      <div className="flex justify-start items-center flex-grow basis-0">
        <Logo variant="desktop" />
      </div>

      {/* Desktop Navigation (Center) */}
      <div className="flex justify-center items-center">
        <DesktopNavigation scrolled={scrolled} />
      </div>

      {/* Contact Button (Right) */}
      <div className="flex justify-end items-center gap-5 max-md:hidden flex-grow basis-0">
        <LocalizedLink
          href="/contact"
          className="px-4 lg:px-6 py-2 lg:py-2.5 rounded-full text-sm lg:text-base font-semibold transition-all duration-300 backdrop-blur-xl bg-white/5 border-2 text-white cursor-pointer whitespace-nowrap"
          style={
            selectLink === "contact"
              ? {
                  borderColor: ACCENT_COLOR,
                  boxShadow: `0 0 30px ${ACCENT_COLOR}80, 0 0 60px ${ACCENT_COLOR}40, inset 0 0 20px ${ACCENT_COLOR}20`,
                }
              : isHovered
              ? { 
                  borderColor: "rgba(255, 255, 255, 0.4)",
                  boxShadow: `0 0 20px ${ACCENT_COLOR}60, 0 0 40px ${ACCENT_COLOR}30` 
                }
              : { borderColor: "rgba(255, 255, 255, 0.2)" }
          }
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {String(t('contact'))}
        </LocalizedLink>
      </div>

      {/* Mobile Logo and Menu */}
      <div className="md:hidden flex items-center justify-between w-full">
        <Logo variant="mobile" />
        <MobileNavigation onMenuOpen={onMenuToggle} />
      </div>

      {/* Mobile Drawer */}
      <MobileDrawer
        isOpen={openMenu}
        onClose={onMenuClose}
        selectLink={selectLink}
        viewServicesPhone={viewServicesPhone}
        onToggleServices={onServicesToggle}
      />
    </motion.nav>
  );
}

