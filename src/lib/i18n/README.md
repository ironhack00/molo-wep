# 📖 Guía de Internacionalización (i18n)

## 🏗️ Estructura de Archivos

```
template-web-basicas/
├── messages/
│   ├── en.json                    # Traducciones en inglés
│   └── es.json                    # Traducciones en español
├── src/
│   ├── lib/i18n/
│   │   ├── IntlProvider.tsx       # Provider de React Context
│   │   └── README.md              # Esta guía
│   └── middleware.ts              # Detección de idioma por dominio
```

## 📝 Estructura de Mensajes

Los archivos de traducciones están organizados por secciones:

```json
{
  "nav": {},           // Navegación principal
  "services": {},      // Nombres de servicios
  "footer": {},        // Footer
  "home": {},          // Página home
  "about": {},         // Página about
  "contact": {},       // Página contact
  "faq": {},           // Página FAQ
  "automation": {},    // Página automation
  "development": {},   // Página development
  "marketing": {},     // Página marketing
  "custom": {},        // Página custom
  "servicesCards": {}, // Cards de servicios
  "whyChooseUs": {},   // Sección por qué elegirnos
  "common": {}         // Textos comunes reutilizables
}
```

## 🎯 Cómo Usar en Componentes

### 1. Componentes de Cliente ('use client')

```tsx
'use client';
import { useTranslations } from '@/lib/i18n/IntlProvider';

export function MiComponente() {
  // Obtener función de traducción para una sección
  const t = useTranslations('home');
  
  return (
    <div>
      <h1>{t('heroTitle')}</h1>
      <p>{t('heroDescription')}</p>
    </div>
  );
}
```

### 2. Múltiples Namespaces

```tsx
'use client';
import { useTranslations } from '@/lib/i18n/IntlProvider';

export function MiComponente() {
  const tNav = useTranslations('nav');
  const tCommon = useTranslations('common');
  
  return (
    <div>
      <nav>
        <a href="/">{tNav('home')}</a>
        <a href="/about">{tNav('aboutUs')}</a>
      </nav>
      <button>{tCommon('getStarted')}</button>
    </div>
  );
}
```

### 3. Obtener el Locale Actual

```tsx
'use client';
import { useLocale } from '@/lib/i18n/IntlProvider';

export function MiComponente() {
  const locale = useLocale(); // 'en' o 'es'
  
  return <p>Idioma actual: {locale}</p>;
}
```

## ✅ Mejores Prácticas

### 1. Organización de Traducciones

**✅ CORRECTO:**
```json
{
  "contact": {
    "title": "Contáctanos",
    "form": {
      "name": "Nombre",
      "email": "Email",
      "send": "Enviar"
    }
  }
}
```

**❌ INCORRECTO:**
```json
{
  "contactTitle": "Contáctanos",
  "contactFormName": "Nombre",
  "contactFormEmail": "Email"
}
```

### 2. Textos Reutilizables

Para textos que se usan en múltiples lugares, usa el namespace `common`:

```json
{
  "common": {
    "learnMore": "Saber Más",
    "getStarted": "Comenzar",
    "loading": "Cargando..."
  }
}
```

### 3. Nombres de Keys Descriptivos

**✅ CORRECTO:**
```json
{
  "home": {
    "heroTitle": "Bienvenido",
    "heroDescription": "Descripción..."
  }
}
```

**❌ INCORRECTO:**
```json
{
  "home": {
    "t1": "Bienvenido",
    "d1": "Descripción..."
  }
}
```

### 4. Consistencia Entre Idiomas

Asegúrate de que ambos archivos tengan las mismas keys:

**en.json:**
```json
{
  "nav": {
    "home": "Home",
    "about": "About"
  }
}
```

**es.json:**
```json
{
  "nav": {
    "home": "Inicio",
    "about": "Nosotros"
  }
}
```

## 🔄 Flujo de Trabajo

### 1. Agregar Nueva Traducción

1. Abre `messages/es.json` y `messages/en.json`
2. Agrega la misma key en ambos archivos
3. Úsala en tu componente con `useTranslations()`

### 2. Actualizar Componente Existente

**Antes (texto hardcodeado):**
```tsx
export function Hero() {
  return <h1>Servicios digitales</h1>;
}
```

**Después (con traducciones):**
```tsx
'use client';
import { useTranslations } from '@/lib/i18n/IntlProvider';

export function Hero() {
  const t = useTranslations('home');
  return <h1>{t('heroTitle')}</h1>;
}
```

## 🌐 Detección de Idioma

El idioma se detecta automáticamente por dominio:

- `miapp.com` → Inglés (en)
- `miapp.es` → Español (es)
- `localhost` → Inglés (por defecto)

El middleware en `src/middleware.ts` establece una cookie `NEXT_LOCALE` que el layout lee para cargar los mensajes correspondientes.

## 🧪 Pruebas

### Localhost (Inglés)
```bash
http://localhost:3000
```

### Simular Español
1. Edita `/etc/hosts`:
   ```
   127.0.0.1  local.miapp.es
   ```
2. Accede a:
   ```
   http://local.miapp.es:3000
   ```

## 📋 Checklist para Nueva Página

Cuando crees una nueva página:

- [ ] Agrega una sección en `messages/en.json`
- [ ] Agrega la misma sección en `messages/es.json`
- [ ] Usa `useTranslations('tuSeccion')` en tus componentes
- [ ] Verifica que funcione en ambos idiomas
- [ ] Documenta las keys especiales si las hay

## 🔍 Debugging

Si una traducción no aparece:

1. Verifica que la key existe en ambos archivos JSON
2. Verifica que el namespace es correcto
3. Revisa que el componente tenga `'use client'`
4. Limpia las cookies del navegador
5. Reinicia el servidor de desarrollo

## 📚 Recursos

- Provider: `src/lib/i18n/IntlProvider.tsx`
- Middleware: `src/middleware.ts`
- Mensajes ES: `messages/es.json`
- Mensajes EN: `messages/en.json`

---

**¿Dudas?** Revisa los componentes existentes como `HeroTitle.tsx` o `ServicesSection.tsx` para ver ejemplos de uso.

