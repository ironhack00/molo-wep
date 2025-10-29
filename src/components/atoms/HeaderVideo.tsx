"use client";

import { VideoBackground } from "./VideoBackground";

/**
 * Atom: HeaderVideo
 * Componente centralizado para el video de header
 * Usado en todas las hero sections de la aplicación
 */
interface HeaderVideoProps {
  /** Color overlay para teñir el video según la sección */
  colorOverlay?: string;
}

const HEADER_VIDEO_SRC = "https://molokaih.b-cdn.net/header_1.webm";
const HEADER_VIDEO_POSTER = "/images/design-ux-ui.webp";

export function HeaderVideo({ colorOverlay }: HeaderVideoProps) {
  return (
    <VideoBackground
      src={HEADER_VIDEO_SRC}
      poster={HEADER_VIDEO_POSTER}
      colorOverlay={colorOverlay}
    />
  );
}

