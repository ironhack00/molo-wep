import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Molokaih - Soluciones Digitales',
    short_name: 'Molokaih',
    description: 'Desarrollo web, marketing digital y automatización',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#25d9d8',
    icons: [
      {
        src: '/logo-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/logo-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}

