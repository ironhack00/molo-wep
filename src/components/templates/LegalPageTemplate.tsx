"use client";

import { Heading } from "../atoms/Heading";
import { Paragraph } from "../atoms/Paragraph";
import { BackgroundGlow } from "../molecules/BackgroundGlow";
import { cn, sectionPadding, maxWidths } from "@/utils/classNames";
import { useTranslations } from '@/lib/i18n/IntlProvider';

interface LegalPageTemplateProps {
  /** Namespace de traducción (ej: 'PrivacyPolicy', 'TermsOfUse', 'CookiesPolicy') */
  translationNamespace: string;
  /** Número de secciones principales */
  sectionsCount: number;
}

/**
 * Template: LegalPageTemplate
 * Plantilla reutilizable para páginas legales (Privacy, Terms, Cookies)
 * Sigue la estructura estándar de documentos legales
 */
export function LegalPageTemplate({ 
  translationNamespace,
  sectionsCount 
}: LegalPageTemplateProps) {
  const t = useTranslations(translationNamespace);

  return (
    <main className={cn(
      "w-full min-h-screen flex flex-col justify-start items-center relative overflow-hidden",
      sectionPadding.yLarge,
      "px-4 sm:px-6 md:px-8"
    )}>
      {/* Efecto de luz de fondo */}
      <BackgroundGlow theme="primary" intensity={0.6} />
      
      {/* Contenido Centrado */}
      <div className={cn("relative z-10 w-full flex flex-col items-center", maxWidths.xl)}>
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <Heading level="h1" className="text-white mb-4">
            {String(t('title'))}
          </Heading>
          <Paragraph size="lg" className="text-primary font-semibold">
            Molokaih LLC
          </Paragraph>
        </div>

        {/* Fecha efectiva y párrafo intro */}
        <section className={cn("mt-6 w-full", maxWidths.prose, "mx-auto text-white/80 space-y-4")}>
          {t('effectiveDate') && (
            <Paragraph size="sm" className="text-white/90">
              {String(t('effectiveDate'))}
            </Paragraph>
          )}
          {t('paragraphOne') && (
            <Paragraph size="sm" className="text-white/90">
              {String(t('paragraphOne'))}
            </Paragraph>
          )}
          {t('paragraphTwo') && (
            <Paragraph size="sm" className="leading-relaxed">
              {String(t('paragraphTwo'))}
            </Paragraph>
          )}
        </section>

        {/* Secciones dinámicas */}
        {Array.from({ length: sectionsCount }).map((_, index) => {
        const sectionKey = index === 0 ? 'sectionOne' : 
                          index === 1 ? 'sectionTwo' : 
                          index === 2 ? 'sectionThree' : 
                          index === 3 ? 'sectionFour' : 
                          index === 4 ? 'sectionFive' :
                          index === 5 ? 'sectionSix' :
                          `section${index + 1}`;
          
          // Verificar si la sección existe
          const sectionTitle = String(t(`${sectionKey}.title`));
          if (sectionTitle === `${sectionKey}.title`) {
            return null; // Si no existe la traducción, no renderizar
          }

          return (
            <section key={sectionKey} className={cn("mt-8 md:mt-10 w-full", maxWidths.prose, "mx-auto text-white/80")}>
              <Heading level="h3" className="text-white mb-4 text-xl md:text-2xl">
                {sectionTitle}
              </Heading>
              <Paragraph size="sm" className="mt-2 leading-relaxed">
                {String(t(`${sectionKey}.text`))}
              </Paragraph>

              {/* Si tiene puntos de lista */}
              {(() => {
                const points = t(`${sectionKey}.points`);
                if (points && typeof points === 'object') {
                  return (
                    <ul className="list-disc pl-5 mt-3 space-y-2">
                      {Array.isArray(points) ? (
                        // Array directo
                        (points as string[]).map((point, idx) => (
                          <li key={idx}>
                            <Paragraph size="sm">{point}</Paragraph>
                          </li>
                        ))
                      ) : (
                        // Objeto con keys numericas
                        Object.values(points as Record<string, string>)
                          .filter(p => p)
                          .map((point, idx) => (
                            <li key={idx}>
                              <Paragraph size="sm">{point}</Paragraph>
                            </li>
                          ))
                      )}
                    </ul>
                  );
                }
                return null;
              })()}

              {/* Si tiene sub-puntos (ej: pointOne, pointTwo) */}
              {['pointOne', 'pointTwo', 'pointThree', 'pointFour', 'pointFive'].some(
                key => t(`${sectionKey}.${key}`) && String(t(`${sectionKey}.${key}`)) !== `${sectionKey}.${key}`
              ) && (
                <ul className="list-disc pl-5 mt-3 space-y-2">
                  {['pointOne', 'pointTwo', 'pointThree', 'pointFour', 'pointFive'].map(
                    pointKey => {
                      const value = t(`${sectionKey}.${pointKey}`);
                      const stringValue = String(value);
                      if (stringValue && stringValue !== `${sectionKey}.${pointKey}`) {
                        return (
                          <li key={pointKey}>
                            <Paragraph size="sm">{stringValue}</Paragraph>
                          </li>
                        );
                      }
                      return null;
                    }
                  ).filter(Boolean)}
                </ul>
              )}

              {/* Si tiene cookieTypes (específico para CookiesPolicy) */}
              {(() => {
                const cookieTypes = t(`${sectionKey}.cookieTypes`);
                if (cookieTypes && typeof cookieTypes === 'object') {
                  const typesArray = Object.values(cookieTypes as Record<string, string>).filter(type => type);
                  if (typesArray.length > 0) {
                    return (
                      <ul className="list-disc pl-5 mt-4 space-y-3">
                        {typesArray.map((type, idx) => (
                          <li key={idx} className="text-white/80">
                            <Paragraph size="sm" className="leading-relaxed">{type}</Paragraph>
                          </li>
                        ))}
                      </ul>
                    );
                  }
                }
                return null;
              })()}

              {/* Nota adicional */}
              {t(`${sectionKey}.note`) && String(t(`${sectionKey}.note`)) !== `${sectionKey}.note` && (
                <Paragraph size="sm" className="mt-3 text-gray-500 italic">
                  {String(t(`${sectionKey}.note`))}
                </Paragraph>
              )}

              {/* Instrucciones (específico para cookies) */}
              {(() => {
                const instructions = t(`${sectionKey}.instructions`);
                if (instructions && typeof instructions === 'object') {
                  const instructionsArray = Object.values(instructions as Record<string, string>).filter(i => i);
                  if (instructionsArray.length > 0) {
                    return (
                      <div className="mt-4 space-y-2">
                        {instructionsArray.map((instruction, idx) => (
                          <Paragraph key={idx} size="sm" className="text-white/70">
                            {instruction}
                          </Paragraph>
                        ))}
                      </div>
                    );
                  }
                }
                return null;
              })()}
            </section>
          );
        })}

        {/* Párrafo final y última actualización */}
        <section className={cn("mt-12 md:mt-16 w-full", maxWidths.prose, "mx-auto text-white/80 space-y-3 text-center")}>
          {t('paragraphThree.text') && String(t('paragraphThree.text')) !== 'paragraphThree.text' && (
            <Paragraph size="sm" className="leading-relaxed">
              {String(t('paragraphThree.text'))}
            </Paragraph>
          )}
          {t('lastUpdated') && (
            <Paragraph size="sm" className="text-gray-400 italic">
              {String(t('lastUpdated'))}
            </Paragraph>
          )}
        </section>
      </div>
    </main>
  );
}

