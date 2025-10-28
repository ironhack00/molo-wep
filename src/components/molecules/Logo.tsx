"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { LogoImage } from "../atoms/LogoImage";
import { Text } from "../atoms/Text";
import { NavLink } from "../atoms/NavLink";
import type { ReactNode } from "react";

interface LogoProps {
  variant?: "desktop" | "mobile" | "drawer" | "footer";
  showText?: boolean;
  isLink?: boolean; // por defecto true
  clickPhrases?: string[]; // solo usado en footer si se pasa
}

/**
 * Molecule: Logo
 * Logo con imagen y texto (con variantes)
 */
export function Logo({ variant = "desktop", isLink = true, clickPhrases }: LogoProps) {
  const [hovered, setHovered] = useState(false);
  const [clickIndex, setClickIndex] = useState<number>(-1);

  if (variant === "desktop") {
    return (
      <NavLink
        href="/"
        className="relative flex justify-center items-center w-fit h-10 overflow-hidden max-md:hidden"
      >
        <div
          className="flex items-center gap-2"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <LogoImage size="md" />
          <AnimatePresence>
            {hovered && (
              <motion.div
                initial={{ maxWidth: 0, opacity: 0, x: -20 }}
                animate={{ maxWidth: "10rem", opacity: 1, x: 0 }}
                exit={{ maxWidth: 0, opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                style={{
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  display: "inline-block",
                }}
              >
                <Text variant="brand">Molokaih</Text>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </NavLink>
    );
  }

  if (variant === "mobile") {
    return (
      <NavLink
        href="/"
        className="md:hidden relative flex justify-start items-center w-fit h-8 overflow-hidden ml-4"
      >
        <div className="flex items-center gap-2">
          <LogoImage size="sm" />
          <Text>Molokaih</Text>
        </div>
      </NavLink>
    );
  }

  if (variant === "footer") {
    const Container = ({ children, className }: { children: ReactNode; className?: string }) =>
      isLink ? (
        <NavLink href="/" className={className}>
          {children}
        </NavLink>
      ) : (
        <div className={className}>{children}</div>
      );

    return (
      <Container className="relative flex justify-center items-center w-fit h-12 overflow-hidden">
        <div
          className={`flex items-center gap-3 ${clickPhrases && clickPhrases.length ? "cursor-pointer" : ""}`}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={clickPhrases && clickPhrases.length ? () => setClickIndex((i) => (i + 1) % clickPhrases.length) : undefined}
        >
          <LogoImage size="lg" />
          <AnimatePresence>
            {hovered && (
              <motion.div
                initial={{ maxWidth: 0, opacity: 0, x: -20 }}
                animate={{ maxWidth: "24rem", opacity: 1, x: 0 }}
                exit={{ maxWidth: 0, opacity: 0, x: -20 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                style={{
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  display: "inline-block",
                }}
              >
                <Text variant="brand" className="text-2xl sm:text-3xl">
                  {clickPhrases && clickPhrases.length && clickIndex >= 0
                    ? clickPhrases[clickIndex]
                    : "Molokaih"}
                </Text>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Container>
    );
  }

  // Drawer variant
  return (
    <NavLink
      href="/"
      className="md:hidden relative flex justify-center items-center w-fit h-8 overflow-hidden ml-2"
    >
      <div className="flex items-center gap-2">
        <LogoImage size="sm" />
        <Text variant="small">Molokaih</Text>
      </div>
    </NavLink>
  );
}

