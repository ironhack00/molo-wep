"use client";

import { usePathname } from "next/navigation";
import { LocalizedLink } from "../../atoms/LocalizedLink";
import NavModal from "../../molecules/NavModal";
import { getServices } from "@/data/services";
import { useTranslations, useLocale } from '@/lib/i18n/IntlProvider';
import { getLocalePrefix } from '@/lib/i18n/routing';

const ACCENT_COLOR = "#25d9d8";

/**
 * Organism: DesktopNavigation
 * Navegación completa para desktop
 */
interface DesktopNavigationProps {
  scrolled?: boolean;
}

export function DesktopNavigation({ scrolled = false }: DesktopNavigationProps) {
  const services = getServices();
  const t = useTranslations('nav');
  const tServices = useTranslations('services');
  const pathname = usePathname();
  const locale = useLocale();
  const localePrefix = getLocalePrefix(locale);

  const isActive = (href: string) => {
    if (!pathname) return false;
    // Comparar pathname quitando el prefijo de locale
    const cleanPathname = pathname.replace(/^\/es/, '');
    return cleanPathname === href || pathname === `${localePrefix}${href}`;
  };

  const getLinkStyle = (href: string) => {
    const active = isActive(href);

    if (active) {
      return {
        color: ACCENT_COLOR,
        textShadow: `0 0 20px ${ACCENT_COLOR}, 0 0 40px ${ACCENT_COLOR}80`,
      };
    }
    return {};
  };

  const getContainerClass = () => {
    return "";
  };

  const getLinkClass = () => {
    return scrolled 
      ? "hover:bg-white/40 hover:rounded-lg hover:shadow-lg hover:shadow-white/20 px-3 py-2 transition-all duration-300"
      : "hover:text-primary transition-all duration-300";
  };

  return (
    <div 
      className={`flex justify-center items-center gap-6 lg:gap-8 xl:gap-10 max-md:hidden ${getContainerClass()}`}
      style={{}}
    >
      <div className={getLinkClass()}>
        <NavModal
          service={String(t('services'))}
          subServices={services.map((service) => ({
            name: String(tServices(service.slugify as 'development' | 'marketing' | 'automation' | 'development-software')),
            slugify: service.slugify,
            icon: service.icon,
            color: service.bg,
          }))}
        />
      </div>

      <LocalizedLink
        href="/about"
        className={`${getLinkClass()} text-sm lg:text-base whitespace-nowrap`}
        style={getLinkStyle("/about")}
      >
        {String(t('aboutUs'))}
      </LocalizedLink>

      <LocalizedLink
        href="/blog"
        className={`${getLinkClass()} text-sm lg:text-base whitespace-nowrap`}
        style={getLinkStyle("/blog")}
      >
        Blog
      </LocalizedLink>

      <LocalizedLink
        href="/faq"
        className={`${getLinkClass()} text-sm lg:text-base whitespace-nowrap`}
        style={getLinkStyle("/faq")}
      >
        {String(t('faq'))}
      </LocalizedLink>
    </div>
  );
}

