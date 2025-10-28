"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { SectionTitle } from "../../molecules/SectionTitle";
import { Paragraph } from "../../atoms/Paragraph";
import { cn, sectionPadding, maxWidths, themeColors, glassmorphism } from "@/utils/classNames";
import { contactFormSchema, type ContactFormData, paises } from "@/lib/validations/contact";
import { useTranslations } from '@/lib/i18n/IntlProvider';
import Image from 'next/image';
import calendly from '@/assets/brands/calendly.svg';

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

/**
 * Organism: ContactFormSection
 * Formulario de contacto con validación Zod y React Hook Form
 * 
 * Mejores prácticas implementadas:
 * - Validación con Zod
 * - React Hook Form para manejo de estado
 * - Estados de loading, success, error
 * - Mensajes de error individuales
 * - Accesibilidad (ARIA labels)
 * - Animaciones de feedback
 * - Sanitización de inputs
 */
export function ContactFormSection() {
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const t = useTranslations('contact.form');
  
  // React Hook Form con Zod resolver
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    mode: "onBlur", // Validar al salir del campo
  });
  
  // Handler de submit
  const onSubmit = async (data: ContactFormData) => {
    try {
      setSubmitStatus('loading');
      setErrorMessage('');
      
      // Enviar a API route
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Error al enviar el mensaje');
      }
      
      // Éxito
      setSubmitStatus('success');
      reset(); // Limpiar formulario
      
      // Auto-hide success message después de 8 segundos
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 8000);
      
    } catch (error) {
      console.error('Error enviando formulario:', error);
      setSubmitStatus('error');
      setErrorMessage(
        error instanceof Error 
          ? error.message 
          : 'Error al enviar el mensaje. Por favor intenta nuevamente.'
      );
      
      // Auto-hide error message después de 6 segundos
      setTimeout(() => {
        setSubmitStatus('idle');
        setErrorMessage('');
      }, 6000);
    }
  };
  
  // Estilos reutilizables para inputs
  const inputClass = (hasError: boolean) => cn(
    glassmorphism.light,
    "w-full px-6 py-5 text-base md:text-lg rounded-3xl transition-all duration-300",
    "text-white placeholder:text-white/50",
    "focus:outline-none focus:ring-2 focus:ring-primary/30",
    "[color-scheme:dark]", // Fuerza color scheme dark
    "selection:bg-primary/30 selection:text-white", // Color de selección
    "autofill:bg-transparent autofill:text-white", // Autofill
    hasError 
      ? "focus:ring-red-500/30" 
      : ""
  );
  
  const labelClass = "block text-white text-sm font-medium mb-2";
  const errorClass = "text-red-400 text-sm mt-1 flex items-center gap-1";

  return (
    <section 
      className={cn("relative", sectionPadding.y)}
      aria-label={String(useTranslations('ariaLabels')('contactForm'))}
    >
      <div className={cn(maxWidths.md, sectionPadding.x)}>
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <SectionTitle className={cn(themeColors.white, "leading-tight mb-6")}>
            {String(t('title'))}
          </SectionTitle>
          
          <Paragraph size="lg" className="text-white/70">
            {String(t('subtitle'))}
          </Paragraph>
        </div>

        {/* Formulario */}
        <motion.form
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
          noValidate // HTML validation deshabilitado (usamos Zod)
        >
          {/* Nombre y Apellido */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Nombre */}
            <div>
              <label htmlFor="nombre" className={labelClass}>
                {String(t('nombre'))} *
              </label>
              <input
                id="nombre"
                type="text"
                {...register("nombre")}
                placeholder={String(t('placeholders.nombre'))}
                disabled={isSubmitting}
                className={inputClass(!!errors.nombre)}
                aria-invalid={!!errors.nombre}
                aria-describedby={errors.nombre ? "nombre-error" : undefined}
              />
              <AnimatePresence mode="wait">
                {errors.nombre && (
                  <motion.p
                    id="nombre-error"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={errorClass}
                    role="alert"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {errors.nombre.message}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
            
            {/* Apellido */}
            <div>
              <label htmlFor="apellido" className={labelClass}>
                {String(t('apellido'))} *
              </label>
              <input
                id="apellido"
                type="text"
                {...register("apellido")}
                placeholder={String(t('placeholders.apellido'))}
                disabled={isSubmitting}
                className={inputClass(!!errors.apellido)}
                aria-invalid={!!errors.apellido}
                aria-describedby={errors.apellido ? "apellido-error" : undefined}
              />
              <AnimatePresence mode="wait">
                {errors.apellido && (
                  <motion.p
                    id="apellido-error"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={errorClass}
                    role="alert"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {errors.apellido.message}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Teléfono y Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Teléfono */}
            <div>
              <label htmlFor="telefono" className={labelClass}>
                {String(t('telefono'))} *
              </label>
              <input
                id="telefono"
                type="tel"
                {...register("telefono")}
                placeholder={String(t('placeholders.telefono'))}
                disabled={isSubmitting}
                className={inputClass(!!errors.telefono)}
                aria-invalid={!!errors.telefono}
                aria-describedby={errors.telefono ? "telefono-error" : undefined}
              />
              <AnimatePresence mode="wait">
                {errors.telefono && (
                  <motion.p
                    id="telefono-error"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={errorClass}
                    role="alert"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {errors.telefono.message}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
            
            {/* Email */}
            <div>
              <label htmlFor="email" className={labelClass}>
                {String(t('email'))} *
              </label>
              <input
                id="email"
                type="email"
                {...register("email")}
                placeholder={String(t('placeholders.email'))}
                disabled={isSubmitting}
                className={inputClass(!!errors.email)}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              <AnimatePresence mode="wait">
                {errors.email && (
                  <motion.p
                    id="email-error"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={errorClass}
                    role="alert"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {errors.email.message}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* País */}
          <div>
            <label htmlFor="pais" className={labelClass}>
              {String(t('pais'))} *
            </label>
            <div className="relative">
              <select
                id="pais"
                {...register("pais")}
                disabled={isSubmitting}
                className={cn(
                  glassmorphism.light,
                  "w-full px-6 py-5 pr-12 text-base md:text-lg rounded-3xl transition-all duration-300",
                  "text-white placeholder:text-white/50",
                  "focus:outline-none focus:ring-2 focus:ring-primary/30",
                  "[color-scheme:dark]",
                  "selection:bg-primary/30 selection:text-white",
                  "autofill:bg-transparent autofill:text-white",
                  "cursor-pointer appearance-none",
                  !!errors.pais ? "focus:ring-red-500/30" : ""
                )}
                aria-invalid={!!errors.pais}
                aria-describedby={errors.pais ? "pais-error" : undefined}
              >
                <option value="" className="bg-black">{String(t('placeholders.pais'))}</option>
                {paises.map((pais) => (
                  <option key={pais} value={pais} className="bg-black">
                    {pais}
                  </option>
                ))}
              </select>
              
              {/* Flechita personalizada */}
              <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg 
                  className="w-5 h-5 text-white/70" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M19 9l-7 7-7-7" 
                  />
                </svg>
              </div>
            </div>
            
            <AnimatePresence mode="wait">
              {errors.pais && (
                <motion.p
                  id="pais-error"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={errorClass}
                  role="alert"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {errors.pais.message}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Mensaje */}
          <div>
            <label htmlFor="mensaje" className={labelClass}>
              {String(t('mensaje'))} *
            </label>
            <textarea
              id="mensaje"
              {...register("mensaje")}
              placeholder={String(t('placeholders.mensaje'))}
              disabled={isSubmitting}
              rows={6}
              className={cn(inputClass(!!errors.mensaje), "resize-none")}
              aria-invalid={!!errors.mensaje}
              aria-describedby={errors.mensaje ? "mensaje-error" : undefined}
            />
            <AnimatePresence mode="wait">
              {errors.mensaje && (
                <motion.p
                  id="mensaje-error"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={errorClass}
                  role="alert"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {errors.mensaje.message}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Botón Submit */}
          <div className="flex justify-center pt-4">
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={!isSubmitting ? { scale: 1.05 } : {}}
              whileTap={!isSubmitting ? { scale: 0.95 } : {}}
              className={cn(
                "relative overflow-hidden",
                "w-full md:w-auto md:px-16 px-8 py-4 text-lg rounded-full font-semibold",
                "transition-all duration-300 backdrop-blur-xl border-2 cursor-pointer",
                "flex items-center justify-center gap-2",
                isSubmitting 
                  ? "border-primary text-white cursor-wait" 
                  : "bg-white/5 border-white/20 text-white hover:border-white/40"
              )}
              style={
                !isSubmitting
                  ? undefined
                  : {
                      borderColor: "#25d9d8",
                      boxShadow: "0 0 30px #25d9d880, 0 0 60px #25d9d840",
                    }
              }
              onMouseEnter={(e) => {
                if (!isSubmitting) {
                  e.currentTarget.style.boxShadow = "0 0 20px #25d9d860, 0 0 40px #25d9d830";
                }
              }}
              onMouseLeave={(e) => {
                if (!isSubmitting) {
                  e.currentTarget.style.boxShadow = "none";
                }
              }}
            >
              {/* Barra de progreso animada */}
              {isSubmitting && (
                <motion.div
                  className="absolute inset-0 bg-primary rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: [0, 1, 1, 0] }}
                  transition={{
                    duration: 4,
                    times: [0, 0.5, 0.7, 1],
                    ease: "easeInOut"
                  }}
                  style={{
                    transformOrigin: "left",
                    opacity: 1
                  }}
                />
              )}
              
              {/* Contenido del botón */}
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isSubmitting ? (
                  <>
                    <motion.svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </motion.svg>
                    {String(t('sending'))}
                  </>
                ) : (
                  <>
                    {String(t('send'))}
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </>
                )}
              </span>
            </motion.button>
          </div>
        </motion.form>

        {/* Calendly Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12"
        >
          {/* Divider */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            <span className="px-4 text-white/60 text-sm font-medium">
              {String(t('or'))}
            </span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          </div>

          {/* Calendly Button */}
          <div className="flex justify-center pt-4">
            <motion.button
              onClick={() => window.open("https://calendly.com/hello-molokaih", "_blank", "noopener,noreferrer")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                "relative overflow-hidden",
                "w-full md:w-auto md:px-16 px-8 py-4 text-lg rounded-full font-semibold",
                "transition-all duration-300 backdrop-blur-xl border-2 cursor-pointer",
                "flex items-center justify-center gap-2",
                "bg-white/5 border-white/20 text-white hover:border-white/40"
              )}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 0 20px #25d9d860, 0 0 40px #25d9d830";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {/* Contenido del botón */}
              <span className="relative z-10 flex items-center justify-center gap-2">
                {String(t('calendlyButton'))}
                <Image
                  src={calendly}
                  width={500}
                  height={500}
                  alt="calendly"
                  className="h-[20px] w-auto opacity-80"
                />
              </span>
            </motion.button>
          </div>
        </motion.div>

        {/* Mensajes de Success/Error */}
        <AnimatePresence mode="wait">
          {submitStatus === 'success' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="mt-8 p-6 rounded-lg bg-green-500/10 border border-green-500/50 backdrop-blur-xl"
              role="alert"
              aria-live="polite"
            >
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h3 className="text-green-400 font-semibold text-lg mb-1">
                    {String(t('successTitle'))}
                  </h3>
                  <p className="text-green-300/80">
                    {String(t('successMessage'))}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
          
          {submitStatus === 'error' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="mt-8 p-6 rounded-lg bg-red-500/10 border border-red-500/50 backdrop-blur-xl"
              role="alert"
              aria-live="assertive"
            >
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h3 className="text-red-400 font-semibold text-lg mb-1">
                    {String(t('errorTitle'))}
                  </h3>
                  <p className="text-red-300/80">
                    {errorMessage || String(t('errorMessage'))}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
