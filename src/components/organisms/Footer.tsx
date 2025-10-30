"use client";

import { FooterColumn } from "../molecules/FooterColumn";
import { SocialMedia } from "../molecules/SocialMedia";
import { InfoSection } from "../molecules/InfoSection";
import { cn, glassmorphism, glassBorder } from "@/utils/classNames";
import { useTranslations } from '@/lib/i18n/IntlProvider';

interface FooterImageSection {
  imageSrc?: string;
  imageAlt?: string;
  title?: string;
  lines: string[];
}

interface FooterProps {
  services?: string[] | { text: string; href: string }[];
  links?: string[] | { text: string; href: string }[];
  imageSections?: FooterImageSection[];
}

/**
 * Organism: Footer
 * Footer del sitio con logo y secciones informativas
 */
export function Footer({ services, links, imageSections }: FooterProps) {
  const t = useTranslations('footer');

  const defaultServices = [
    { text: String(t('development')), href: "/development" },
    { text: String(t('marketing')), href: "/marketing" },
    { text: String(t('automation')), href: "/automation" },
    { text: String(t('custom')), href: "/development-software" },
  ];

  const defaultLinks = [
    { text: String(t('home')), href: "/" },
    { text: String(t('about')), href: "/about" },
    { text: String(t('blog')), href: "/blog" },
    { text: String(t('faq')), href: "/faq" },
    { text: String(t('contact')), href: "/contact" },
  ];

  const termsLinks = [
    { text: String(t('privacyPolicy')), href: "/privacy-policy" },
    { text: String(t('termsOfUse')), href: "/terms-of-use" },
    { text: String(t('cookiePolicy')), href: "/cookie-policy" },
  ];

  const defaultImageSections: FooterImageSection[] = [
    {
      imageSrc: "/images/flags/eeuu.webp",
      imageAlt: "USA",
      title: "USA",
      lines: [
        "Dover, Delaware",
        "hello@molokaih.com",
        "+1 (437) 871-4955",
      ],
    },
    {
      imageSrc: "/images/flags/canada.webp",
      imageAlt: "Canadá",
      title: "Canadá",
      lines: [
        "Toronto, Ontario",
        "hello@molokaih.ca",
        "+1 (647) 417-7318",
      ],
    },
  ];

  const footerServices = services || defaultServices;
  const footerLinks = links || defaultLinks;
  const footerImageSections = imageSections || defaultImageSections;

  return (
    <footer className={cn(
      "relative py-16 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16",
      glassmorphism.dark,
      "border-t",
      glassBorder.light
    )}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-12 lg:gap-8">
          {/* Columna Izquierda: Logo y secciones con imágenes */}
          <div className="flex flex-col">
            {/* Logo */}
            {/* <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-8 lg:mb-12"
            >
              <Logo variant="footer" />
            </motion.div> */}

            {/* Secciones con imágenes circulares */}
            <div className="space-y-6 lg:mt-20">
              {footerImageSections.map((section, index) => (
                <InfoSection
                  key={index}
                  imageSrc={section.imageSrc}
                  imageAlt={section.imageAlt}
                  title={section.title}
                  lines={section.lines}
                  delay={0.1 * (index + 1)}
                />
              ))}
            </div>
          </div>

          {/* Servicios */}
          <div className="lg:mt-20">
            <FooterColumn 
              title={String(t('services'))} 
              items={footerServices} 
              delay={0.1} 
            />
          </div>

          {/* Links */}
          <div className="lg:mt-20">
            <FooterColumn 
              title={String(t('links'))} 
              items={footerLinks} 
              delay={0.2} 
            />
          </div>

          {/* Terms */}
          <div className="lg:mt-20">
            <FooterColumn 
              title={String(t('terms'))} 
              items={termsLinks} 
              delay={0.25} 
            />
          </div>

          {/* Social Media */}
          <div className="lg:mt-20">
            <SocialMedia delay={0.3} />
          </div>
        </div>
      </div>
    </footer>
  );
}

