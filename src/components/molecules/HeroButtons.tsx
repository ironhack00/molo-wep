"use client";

import { motion } from "framer-motion";
import { cn } from "@/utils/classNames";
import { useLocale } from '@/lib/i18n/IntlProvider';
import { HERO_ICONS } from '@/components/constants/heroIcons';

const PRIMARY_COLOR = "#25d9d8";

/**
 * Molecule: HeroButtons
 * Botones de acción del hero
 */
export function HeroButtons() {
  const locale = useLocale();

  const handleServicesClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    console.log('Services button clicked!');
    const servicesSection = document.getElementById('services');
    console.log('Services section:', servicesSection);
    if (servicesSection) {
      const yOffset = 200;
      const targetY = servicesSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
      console.log('Scrolling to:', targetY);
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    } else {
      console.error('Services section not found!');
    }
  };

  const buttons = [
    {
      text: locale === 'es' ? 'Inicia el cambio' : 'Start the change',
      href: "/contact",
      icon: HERO_ICONS.rocket,
      onClick: undefined
    },
    {
      text: locale === 'es' ? 'Servicios' : 'Services',
      href: "#services",
      icon: HERO_ICONS.arrow,
      onClick: handleServicesClick
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.8 }}
      className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mt-8 sm:mt-12 md:mt-16 lg:mt-20 xl:mt-24"
    >
      {buttons.map((button, index) => (
        <motion.a
          key={index}
          href={button.href}
          onClick={button.onClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={cn(
            "w-64 px-8 py-4 text-lg rounded-full font-semibold",
            "transition-all duration-300 backdrop-blur-xl bg-white/5 border-2 text-white cursor-pointer",
            "flex items-center justify-center gap-2"
          )}
          style={{
            borderColor: "rgba(255, 255, 255, 0.2)"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = PRIMARY_COLOR;
            e.currentTarget.style.boxShadow = `0 0 30px ${PRIMARY_COLOR}80, 0 0 60px ${PRIMARY_COLOR}40, inset 0 0 20px ${PRIMARY_COLOR}20`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          {button.text}
          {button.icon && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={button.icon} alt="" className="w-5 h-5" />
          )}
        </motion.a>
      ))}
    </motion.div>
  );
}
