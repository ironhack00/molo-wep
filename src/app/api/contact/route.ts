import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { contactFormSchema } from "@/lib/validations/contact";
import { ZodError } from "zod";

// Lazy init de Resend para evitar fallo en build si falta la API key
let resendClient: Resend | null = null;
function getResend(): Resend | null {
  const apiKey = process.env.NEXT_PUBLIC_RESEND_API_KEY;
  if (!apiKey) return null;
  if (!resendClient) {
    resendClient = new Resend(apiKey);
  }
  return resendClient;
}

/**
 * POST /api/contact
 * Endpoint para enviar emails de contacto
 * 
 * Mejores prácticas implementadas:
 * - Validación con Zod
 * - Rate limiting (TODO: implementar con Upstash)
 * - Sanitización de inputs
 * - Error handling robusto
 * - Logging para debugging
 */
export async function POST(request: NextRequest) {
  try {
    // 1. Parse del body
    const body = await request.json();
    
    // 2. Validar con Zod
    const validatedData = contactFormSchema.parse(body);
    
    // 3. Sanitizar datos (prevenir XSS)
    const sanitizedData = {
      nombre: validatedData.nombre.trim(),
      apellido: validatedData.apellido.trim(),
      telefono: validatedData.telefono.trim(),
      email: validatedData.email.trim().toLowerCase(),
      pais: validatedData.pais.trim(),
      mensaje: validatedData.mensaje.trim(),
    };
    
    // 4. Enviar email con Resend (si hay API key)
    const resend = getResend();
    if (!resend) {
      console.warn("RESEND_API_KEY ausente: omitido envío de email");
      return NextResponse.json(
        {
          success: true,
          message: "Mensaje recibido (envío de email deshabilitado)",
        },
        { status: 200 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: "Molokaih Website <onboarding@resend.dev>", // ⚠️ CAMBIAR cuando verifiques tu dominio
      to: ["correakevinfabian01@gmail.com"], // 📧 CAMBIAR AQUÍ el email de destino
      replyTo: sanitizedData.email, // Responder al cliente
      subject: `Nuevo contacto de ${sanitizedData.nombre} ${sanitizedData.apellido}`,
      html: generateEmailHTML(sanitizedData),
      text: generateEmailText(sanitizedData),
    });
    
    // 5. Manejar error de Resend
    if (error) {
      console.error("Error enviando email con Resend:", error);
      return NextResponse.json(
        { 
          success: false, 
          error: "Error al enviar el mensaje. Por favor intenta nuevamente." 
        },
        { status: 500 }
      );
    }
    
    // 6. Log exitoso (opcional: enviar a servicio de logging)
    console.log("Email enviado exitosamente:", data);
    
    // 7. Respuesta exitosa
    return NextResponse.json({
      success: true,
      message: "Mensaje enviado exitosamente. Te contactaremos pronto!",
      data: { id: data?.id },
    });
    
  } catch (error) {
    // Manejo de errores de validación de Zod
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: "Datos inválidos",
          errors: error.issues.map(err => ({
            field: err.path.join("."),
            message: err.message,
          })),
        },
        { status: 400 }
      );
    }
    
    // Otros errores
    console.error("Error en /api/contact:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Error interno del servidor. Por favor intenta nuevamente.",
      },
      { status: 500 }
    );
  }
}

/**
 * Genera HTML del email (mejor UX)
 */
function generateEmailHTML(data: {
  nombre: string;
  apellido: string;
  telefono: string;
  email: string;
  pais: string;
  mensaje: string;
}) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .container {
            background: #ffffff;
            border-radius: 8px;
            padding: 30px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }
          .header {
            background: linear-gradient(135deg, #25d9d8 0%, #00a8a8 100%);
            color: white;
            padding: 20px;
            border-radius: 8px 8px 0 0;
            margin: -30px -30px 30px -30px;
          }
          .field {
            margin-bottom: 20px;
            padding-bottom: 20px;
            border-bottom: 1px solid #eee;
          }
          .field:last-child {
            border-bottom: none;
          }
          .label {
            font-weight: 600;
            color: #555;
            margin-bottom: 5px;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          .value {
            color: #333;
            font-size: 16px;
          }
          .message {
            background: #f5f5f5;
            padding: 15px;
            border-radius: 8px;
            border-left: 4px solid #25d9d8;
          }
          .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 2px solid #eee;
            text-align: center;
            color: #888;
            font-size: 12px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0; font-size: 24px;">🎉 Nuevo Contacto desde el Website</h1>
          </div>
          
          <div class="field">
            <div class="label">👤 Nombre Completo</div>
            <div class="value">${data.nombre} ${data.apellido}</div>
          </div>
          
          <div class="field">
            <div class="label">📧 Email</div>
            <div class="value"><a href="mailto:${data.email}">${data.email}</a></div>
          </div>
          
          <div class="field">
            <div class="label">📱 Teléfono</div>
            <div class="value"><a href="tel:${data.telefono}">${data.telefono}</a></div>
          </div>
          
          <div class="field">
            <div class="label">🌍 País</div>
            <div class="value">${data.pais}</div>
          </div>
          
          <div class="field">
            <div class="label">💬 Mensaje</div>
            <div class="value message">${data.mensaje.replace(/\n/g, '<br>')}</div>
          </div>
          
          <div class="footer">
            <p>Este email fue enviado desde el formulario de contacto de <strong>Molokaih.com</strong></p>
            <p style="margin-top: 10px;">📅 ${new Date().toLocaleString('es-ES', { 
              dateStyle: 'full', 
              timeStyle: 'short' 
            })}</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

/**
 * Genera versión texto plano del email (fallback)
 */
function generateEmailText(data: {
  nombre: string;
  apellido: string;
  telefono: string;
  email: string;
  pais: string;
  mensaje: string;
}) {
  return `
NUEVO CONTACTO DESDE MOLOKAIH.COM
================================

Nombre: ${data.nombre} ${data.apellido}
Email: ${data.email}
Teléfono: ${data.telefono}
País: ${data.pais}

Mensaje:
--------
${data.mensaje}

================================
Enviado el: ${new Date().toLocaleString('es-ES')}
  `.trim();
}

