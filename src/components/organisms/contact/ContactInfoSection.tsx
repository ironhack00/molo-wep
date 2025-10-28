"use client";

import { motion } from "framer-motion";
import { SectionTitle } from "../../molecules/SectionTitle";
import { Paragraph } from "../../atoms/Paragraph";
import { cn, sectionPadding, maxWidths, themeColors, glassmorphism } from "@/utils/classNames";
import { useTranslations } from '@/lib/i18n/IntlProvider';

/**
 * Organism: ContactInfoSection
 * Información de contacto con cards glassmorphism
 * Reutiliza: SectionTitle, Paragraph, glassmorphism
 */
export function ContactInfoSection() {
  const t = useTranslations('contact.info');
  
  const contactInfo = [
    {
      id: "phone-2",
      icon: "whatsapp",
      label: String(t('phone')),
      value: "+1 (437) 871-4955",
      href: "https://wa.me/14378714955",
    },
    {
      id: "email",
      icon: "email",
      label: String(t('email')),
      value: "hello@molokaih.com",
      href: "mailto:hello@molokaih.com",
    },
  ];

  return (
    <section 
      className={cn("relative", sectionPadding.y)}
      aria-label={String(t('title'))}
    >
      <div className={cn(maxWidths.lg, sectionPadding.x)}>
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <SectionTitle className={cn(themeColors.white, "leading-tight mb-6")}>
            {String(t('title'))}
          </SectionTitle>
          
          <Paragraph size="lg" className="text-white/70 max-w-3xl mx-auto">
            {String(t('subtitle'))}
          </Paragraph>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-3xl mx-auto">
          {contactInfo.map((contact, index) => (
            <motion.a
              key={contact.id}
              href={contact.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className={cn(
                glassmorphism.medium,
                "rounded-2xl p-6 md:p-8",
                "flex items-center gap-6",
                "cursor-pointer group transition-all duration-300",
                "hover:bg-primary/10"
              )}
            >
              {/* Icono - Left side */}
              <div className="flex-shrink-0">
                {contact.icon === "whatsapp" ? (
                  <svg 
                    width="48" 
                    height="48" 
                    viewBox="0 0 24 24" 
                    fill="currentColor"
                    className={cn(themeColors.primary, "group-hover:scale-110 transition-transform")}
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                ) : (
                  <svg 
                    width="48" 
                    height="48" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="1.5"
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className={cn(themeColors.primary, "group-hover:scale-110 transition-transform")}
                  >
                    <rect x="2" y="4" width="20" height="16" rx="2"/>
                    <path d="M22 7L13.03 12.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                  </svg>
                )}
              </div>

              {/* Text - Right side */}
              <div className="flex-1 text-left">
                {/* Label */}
                <Paragraph size="sm" className="text-white/60 uppercase tracking-wider mb-2">
                  {contact.label}
                </Paragraph>

                {/* Valor */}
                <Paragraph size="lg" className={cn(themeColors.white, "font-semibold")}>
                  {contact.value}
                </Paragraph>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

