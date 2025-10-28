"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export function useNavbarState() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [selectLink, setSelectLink] = useState("");
  const [viewServicesPhone, setViewServicesPhone] = useState(false);

  // Detectar scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Detectar ruta activa
  useEffect(() => {
    if (pathname) {
      const divideUrl = pathname.split("/");
      setSelectLink(divideUrl[divideUrl.length - 1] || "/");
    }
  }, [pathname]);

  const toggleMenu = () => setOpenMenu(!openMenu);
  const closeMenu = () => {
    setViewServicesPhone(false);
    setOpenMenu(false);
  };
  const toggleServices = () => setViewServicesPhone(!viewServicesPhone);

  return {
    scrolled,
    openMenu,
    selectLink,
    viewServicesPhone,
    toggleMenu,
    closeMenu,
    toggleServices,
  };
}

