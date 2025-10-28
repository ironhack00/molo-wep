import type { Metadata, Viewport } from "next";
import { Poppins, League_Spartan } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/pages/Navbar";
import Footer from "@/components/pages/Footer";
import { Analytics } from "@/components/atoms/Analytics";
import { SEO_CONFIG } from "@/data/seo";
import { IntlProvider } from '@/lib/i18n/IntlProvider';
import { LanguageSwitcher } from '@/components/atoms/LanguageSwitcher';
import { cookies } from 'next/headers';
import enMessages from '../../messages/en.json';
import esMessages from '../../messages/es.json';

/**
 * Configuración de fuentes optimizadas
 * League Spartan para H1, Poppins para el resto
 */
const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  subsets: ["latin"],
  display: 'swap',
  preload: true,
});

const leagueSpartan = League_Spartan({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-league-spartan",
  subsets: ["latin"],
  display: 'swap',
  preload: true,
});

/**
 * Metadatos globales optimizados para SEO y IAs
 * Siguiendo mejores prácticas nivel senior
 */
export const metadata: Metadata = {
  // Títulos
  title: {
    template: `%s | ${SEO_CONFIG.siteName}`,
    default: SEO_CONFIG.defaultTitle,
  },
  
  // Descripción
  description: SEO_CONFIG.defaultDescription,
  
  // Keywords (aunque Google los ignora, otras IAs los usan)
  keywords: [...SEO_CONFIG.keywords],
  
  // Autores y generador
  authors: [{ name: SEO_CONFIG.siteName, url: SEO_CONFIG.siteUrl }],
  creator: SEO_CONFIG.siteName,
  publisher: SEO_CONFIG.siteName,
  
  // URLs
  metadataBase: new URL(SEO_CONFIG.siteUrl),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/',
      'es-ES': '/es',
    },
  },
  
  // Open Graph para redes sociales
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SEO_CONFIG.siteUrl,
    title: SEO_CONFIG.defaultTitle,
    description: SEO_CONFIG.defaultDescription,
    siteName: SEO_CONFIG.siteName,
    images: [
      {
        url: SEO_CONFIG.ogImage,
        width: SEO_CONFIG.ogImageWidth,
        height: SEO_CONFIG.ogImageHeight,
        alt: `${SEO_CONFIG.siteName} - Soluciones Digitales`,
      },
    ],
  },
  
  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: SEO_CONFIG.defaultTitle,
    description: SEO_CONFIG.defaultDescription,
    images: [SEO_CONFIG.ogImage],
    creator: '@molokaih',
    site: '@molokaih',
  },
  
  // Robots
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  // Verificación (agregar tus códigos reales)
  verification: {
    google: 'tu-codigo-google-search-console',
    // yandex: 'tu-codigo-yandex',
    // bing: 'tu-codigo-bing',
  },
  
  // Categoría
  category: 'technology',
  
  // App links
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: SEO_CONFIG.siteName,
  },
};

/**
 * Viewport optimizado
 */
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#25d9d8' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Detectar locale desde cookie o URL
  const cookieStore = await cookies();
  const locale = cookieStore.get('locale')?.value || 'en';
  
  // Cargar mensajes según el locale
  const messages = locale === 'en' ? enMessages : esMessages;

  return (
    <html suppressHydrationWarning>
      <head>
        {/* Preconnect para recursos externos */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        
        {/* DNS Prefetch para mejor rendimiento */}
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        
        {/* Favicon y manifest */}
        <link rel="icon" href="/favicon-16x16.png" type="image/png" sizes="16x16" />
        <link rel="icon" href="/favicon-32x32.png" type="image/png" sizes="32x32" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/logo-192.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      
      <body className={`${poppins.variable} ${leagueSpartan.variable} antialiased text-white overflow-x-hidden`}>
        <IntlProvider locale={locale} messages={messages}>
          {/* Analytics optimizado para rendimiento */}
          <Analytics />
          
          {/* Indicador de idioma (solo en desarrollo) */}
          {process.env.NODE_ENV === 'development' && <LanguageSwitcher />}
          
          <Navbar />
          <main id="main-content" className="overflow-x-hidden">
            {children}
          </main>
          <Footer />
        </IntlProvider>
      </body>
    </html>
  );
}
