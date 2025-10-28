# 🚀 API Routes - Molokaih

## Endpoints Disponibles

### `POST /api/contact`

Endpoint para enviar emails de contacto usando Resend.

**URL**: `/api/contact`  
**Método**: `POST`  
**Content-Type**: `application/json`

---

## Request Body

```typescript
{
  nombre: string;      // 2-50 caracteres, solo letras
  apellido: string;    // 2-50 caracteres, solo letras
  telefono: string;    // 10-20 caracteres, formato telefónico
  email: string;       // Email válido
  pais: string;        // Selección de lista predefinida
  mensaje: string;     // 10-1000 caracteres
}
```

---

## Validación

Todos los campos son validados con **Zod** antes de procesarse:

```typescript
// Ejemplo de validación
nombre: z.string()
  .min(2, "Mínimo 2 caracteres")
  .max(50, "Máximo 50 caracteres")
  .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, "Solo letras")
```

---

## Responses

### ✅ Success (200)

```json
{
  "success": true,
  "message": "Mensaje enviado exitosamente. Te contactaremos pronto!",
  "data": {
    "id": "email_id_from_resend"
  }
}
```

### ❌ Validation Error (400)

```json
{
  "success": false,
  "error": "Datos inválidos",
  "errors": [
    {
      "field": "email",
      "message": "Email inválido"
    }
  ]
}
```

### ❌ Server Error (500)

```json
{
  "success": false,
  "error": "Error al enviar el mensaje. Por favor intenta nuevamente."
}
```

---

## Ejemplo de Uso

### JavaScript/Fetch

```javascript
const response = await fetch('/api/contact', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    nombre: "Juan",
    apellido: "Pérez",
    telefono: "+1 234 567 890",
    email: "juan@example.com",
    pais: "Argentina",
    mensaje: "Hola, me gustaría más información sobre sus servicios."
  })
});

const result = await response.json();

if (result.success) {
  console.log('Email enviado:', result.message);
} else {
  console.error('Error:', result.error);
}
```

### cURL

```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Juan",
    "apellido": "Pérez",
    "telefono": "+1 234 567 890",
    "email": "juan@example.com",
    "pais": "Argentina",
    "mensaje": "Hola, me gustaría más información."
  }'
```

---

## Seguridad Implementada

### 1. **Validación con Zod**
- Todos los inputs son validados antes de procesarse
- Previene inyección de código malicioso

### 2. **Sanitización**
- `trim()` en todos los strings
- `toLowerCase()` en emails
- Escape de HTML en mensajes

### 3. **Rate Limiting** (Recomendado)
```typescript
// TODO: Implementar con Upstash Redis
// Limitar a 3 requests por hora por IP
```

### 4. **CORS** (Si es necesario)
```typescript
// next.config.ts
headers: [
  {
    source: '/api/:path*',
    headers: [
      { key: 'Access-Control-Allow-Origin', value: 'https://tudominio.com' }
    ]
  }
]
```

---

## Email Template

El email enviado incluye:

✅ **HTML Rich** - Diseño profesional con estilos  
✅ **Plain Text** - Fallback para clientes sin HTML  
✅ **Reply-To** - Configurado al email del contacto  
✅ **Timestamp** - Fecha/hora del envío  
✅ **Información Completa** - Todos los campos del formulario

**Preview del Email**:

```
📧 Asunto: Nuevo contacto de Juan Pérez

┌─────────────────────────────────┐
│  🎉 Nuevo Contacto desde el Website  │
├─────────────────────────────────┤
│ 👤 Nombre: Juan Pérez           │
│ 📧 Email: juan@example.com      │
│ 📱 Teléfono: +1 234 567 890     │
│ 🌍 País: Argentina              │
│                                 │
│ 💬 Mensaje:                     │
│ Hola, me gustaría más información...│
│                                 │
│ 📅 2025-10-14 10:30 AM          │
└─────────────────────────────────┘
```

---

## Variables de Entorno

Requeridas:

```bash
RESEND_API_KEY=re_your_api_key_here
```

Opcionales (configurar en `route.ts`):

```typescript
from: "Molokaih Website <no-reply@molokaih.com>",
to: ["hello@molokaih.com"],
```

---

## Testing

### Development

```bash
# 1. Asegurar .env.local configurado
cat .env.local

# 2. Iniciar servidor
npm run dev

# 3. Probar endpoint
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d @test-data.json

# O usar el formulario en: http://localhost:3000/contact
```

### Production

```bash
# Test en Vercel
curl -X POST https://molokaih.com/api/contact \
  -H "Content-Type: application/json" \
  -d '{...}'
```

---

## Logs & Debugging

Los logs incluyen:

```typescript
✅ Success: console.log("Email enviado exitosamente:", data);
❌ Error: console.error("Error enviando email:", error);
```

En producción, considera:
- **Sentry** para error tracking
- **LogDNA/DataDog** para logs centralizados
- **Resend Dashboard** para ver emails enviados

---

## Mejoras Futuras

### 1. Rate Limiting
```bash
npm install @upstash/ratelimit @upstash/redis
```

### 2. Webhooks de Resend
Recibir notificaciones cuando emails son:
- Delivered
- Opened
- Clicked
- Bounced

### 3. Captcha
```bash
npm install @hcaptcha/react-hcaptcha
# o
npm install react-google-recaptcha
```

### 4. Slack/Discord Notifications
Enviar notificación instantánea cuando llega un contacto

```typescript
await fetch(process.env.SLACK_WEBHOOK_URL, {
  method: 'POST',
  body: JSON.stringify({
    text: `Nuevo contacto de ${nombre} ${apellido}`
  })
});
```

---

## Troubleshooting

### Error: "Missing RESEND_API_KEY"
- Verifica `.env.local`
- Reinicia el servidor de desarrollo

### Error: "Unauthorized" de Resend
- API key incorrecta
- Dominio no verificado

### Emails no llegan
1. Revisa Resend Dashboard → Logs
2. Verifica spam folder
3. Confirma dominio verificado
4. Revisa el email `to` en `route.ts`

### Validation Errors
- Usa el schema de Zod para verificar formato
- Revisa mensajes de error en Response

---

## Links Útiles

- [Resend Docs](https://resend.com/docs)
- [Zod Docs](https://zod.dev)
- [Next.js Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [React Hook Form](https://react-hook-form.com)

---

¿Preguntas? Abre un issue en GitHub o contacta al equipo.

