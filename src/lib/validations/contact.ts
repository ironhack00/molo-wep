import { z } from "zod";

/**
 * Schema de validación para formulario de contacto
 * Usando Zod con mensajes en español personalizados
 */
export const contactFormSchema = z.object({
  nombre: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(50, "El nombre no puede exceder 50 caracteres")
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, "El nombre solo puede contener letras"),
  
  apellido: z
    .string()
    .min(2, "El apellido debe tener al menos 2 caracteres")
    .max(50, "El apellido no puede exceder 50 caracteres")
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, "El apellido solo puede contener letras"),
  
  telefono: z
    .string()
    .min(10, "El teléfono debe tener al menos 10 dígitos")
    .max(20, "El teléfono no puede exceder 20 caracteres")
    .regex(/^[\d\s\-\+\(\)]+$/, "Formato de teléfono inválido"),
  
  email: z
    .string()
    .email("Email inválido")
    .min(5, "El email debe tener al menos 5 caracteres")
    .max(100, "El email no puede exceder 100 caracteres")
    .toLowerCase(),
  
  pais: z
    .string()
    .min(1, "Por favor selecciona un país"),
  
  mensaje: z
    .string()
    .min(10, "El mensaje debe tener al menos 10 caracteres")
    .max(1000, "El mensaje no puede exceder 1000 caracteres"),
});

/**
 * Tipo TypeScript inferido del schema
 */
export type ContactFormData = z.infer<typeof contactFormSchema>;

/**
 * Lista de países para el select
 */
export const paises = [
  "Argentina",
  "Bolivia",
  "Chile",
  "Colombia",
  "Costa Rica",
  "Ecuador",
  "El Salvador",
  "España",
  "Estados Unidos",
  "Guatemala",
  "Honduras",
  "México",
  "Nicaragua",
  "Panamá",
  "Paraguay",
  "Perú",
  "República Dominicana",
  "Uruguay",
  "Venezuela",
  "Otro",
] as const;

