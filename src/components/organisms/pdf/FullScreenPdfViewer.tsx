"use client";

import React from "react";
import { usePDFSlick } from "@pdfslick/react";
import type { PDFSlickOptions } from "@pdfslick/core";
import "pdfjs-dist/web/pdf_viewer.css";

type FullScreenPdfViewerProps = {
  /** Ruta del PDF en `public/` (por ejemplo: "/pdf/MolokaihES-Portafolio.pdf") */
  pdfUrl?: string;
  /** Opcional: opciones avanzadas de PDFSlick */
  options?: PDFSlickOptions;
  /** Clase extra para el contenedor */
  className?: string;
};

/**
 * Componente aislado y reutilizable para mostrar un PDF a pantalla completa (responsive) con @pdfslick/react.
 * Para reutilizarlo en otras páginas, copia este archivo y cambia solo `pdfUrl`.
 */
export function FullScreenPdfViewer({
  pdfUrl = "/pdf/MolokaihES-Portafolio.pdf",
  options,
  className,
}: FullScreenPdfViewerProps) {
  const { PDFSlickViewer, viewerRef, usePDFSlickStore, error } = usePDFSlick(pdfUrl, {
    // Ajustes razonables para UX y rendimiento
    singlePageViewer: false,
    removePageBorders: true,
    useOnlyCssZoom: true,
    textLayerMode: 2,
    printResolution: 150,
    maxCanvasPixels: 4096 * 4096,
    ...options,
  });
  const isLoaded = usePDFSlickStore(s => s.isDocumentLoaded);

  if (error) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-white">
        Error al cargar el PDF
      </div>
    );
  }

  return (
    <div className={"w-screen h-screen overflow-hidden bg-black " + (className || "")}
         style={{ WebkitTapHighlightColor: "transparent" }}>
      <div className="relative w-full h-full flex flex-col">
        {/* Toolbar superior (visible hasta 517px, luego se oculta por media query) */}
        <div>
          <PdfToolbar usePDFSlickStore={usePDFSlickStore} />
        </div>
        {/* Botón descargar solo mobile */}
        <MobileDownload usePDFSlickStore={usePDFSlickStore} />
        {/* Área del visor debajo de la barra (en desktop) */}
        <div className="relative w-full flex-1 mt-0 md:mt-2">
          {/* Loader mientras carga, sin romper layout */}
          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-black">
              <div className="w-10 h-10 border-2 border-white/30 border-t-white rounded-full animate-spin" aria-label="Cargando PDF" />
            </div>
          )}
          {/* Visor */}
          <PDFSlickViewer
            viewerRef={viewerRef}
            usePDFSlickStore={usePDFSlickStore}
            className="absolute inset-0"
          />
        </div>
        <style jsx global>{`
          /* Asegurar que el contenedor del visor siempre ocupe el alto y no colapse en responsive */
          #viewerContainer, .viewerContainer {
            height: 100% !important;
            max-height: 100% !important;
            background: #000 !important;
          }
          .pdfViewer { background: #000 !important; }
        `}</style>
      </div>
    </div>
  );
}

export default FullScreenPdfViewer;

type ToolbarProps = {
  usePDFSlickStore: ReturnType<typeof usePDFSlick>['usePDFSlickStore'];
};

function PdfToolbar({ usePDFSlickStore }: ToolbarProps) {
  const pageNumber = usePDFSlickStore(s => s.pageNumber);
  const numPages = usePDFSlickStore(s => s.numPages);
  const scale = usePDFSlickStore(s => s.scale);
  const pdfSlick = usePDFSlickStore(s => s.pdfSlick);

  const disabled = !pdfSlick || !numPages;

  const goto = (n: number) => pdfSlick?.gotoPage(Math.min(Math.max(n, 1), numPages));
  const zoomIn = () => pdfSlick?.increaseScale();
  const zoomOut = () => pdfSlick?.decreaseScale();
  const fitWidth = () => { if (pdfSlick) pdfSlick.currentScaleValue = 'page-width'; };
  const fitPage = () => { if (pdfSlick) pdfSlick.currentScaleValue = 'page-fit'; };
  const download = () => pdfSlick?.downloadOrSave();
  const print = () => pdfSlick?.triggerPrinting();

  return (
    <div className="pdf-toolbar-container pointer-events-auto w-full z-10">
      <div className="mx-auto max-w-7xl px-3 sm:px-4 pt-2">
        <div className="flex items-center gap-2 sm:gap-3 rounded-3xl bg-black/60 backdrop-blur-md border border-white/10 px-3 py-2 text-white shadow-lg">
          <button className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#25d9d8]/30 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed flex items-center justify-center" onClick={() => goto(1)} disabled={disabled || pageNumber <= 1} aria-label="Primera">⏮</button>
          <button className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#25d9d8]/30 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed flex items-center justify-center" onClick={() => goto(pageNumber - 1)} disabled={disabled || pageNumber <= 1} aria-label="Anterior">◀</button>
          <span className="px-3 py-1 rounded-full bg-white/10 text-sm whitespace-nowrap min-w-[92px] text-center">{pageNumber || 0} / {numPages || 0}</span>
          <button className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#25d9d8]/30 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed flex items-center justify-center" onClick={() => goto(pageNumber + 1)} disabled={disabled || pageNumber >= numPages} aria-label="Siguiente">▶</button>
          <button className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#25d9d8]/30 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed flex items-center justify-center" onClick={() => goto(numPages)} disabled={disabled || pageNumber >= numPages} aria-label="Última">⏭</button>

          <div className="mx-2 h-5 w-px bg-white/20" />

          <button className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#25d9d8]/30 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed flex items-center justify-center" onClick={zoomOut} disabled={disabled} aria-label="Alejar">−</button>
          <span className="w-10 h-10 rounded-full bg-white/10 text-xs sm:text-sm flex items-center justify-center text-center select-none">{Math.round((scale || 1) * 100)}%</span>
          <button className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#25d9d8]/30 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed flex items-center justify-center" onClick={zoomIn} disabled={disabled} aria-label="Acercar">＋</button>
         {/*  <button className="ml-1 px-2 py-1 rounded bg-white/10 hover:bg-white/20 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed" onClick={fitWidth} disabled={disabled}>Ajustar ancho</button> */}
         {/*  <button className="px-2 py-1 rounded bg-white/10 hover:bg-white/20 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed" onClick={fitPage} disabled={disabled}>Ajustar página</button> */}

          <div className="ml-auto flex items-center gap-2">
            <button className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#25d9d8]/30 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed flex items-center justify-center" onClick={download} disabled={disabled} aria-label="Descargar">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
            </button>
            {/* <button className="px-2 py-1 rounded bg-white/10 hover:bg-white/20 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed" onClick={print} disabled={disabled}>Imprimir</button> */}
          </div>
        </div>
      </div>
      <style jsx global>{`
        /* Ocultar la barra solo en <= 517px */
        @media (max-width: 517px) {
          .pdf-toolbar-container { display: none !important; }
        }
      `}</style>
    </div>
  );
}

function MobileDownload({ usePDFSlickStore }: ToolbarProps) {
  const pdfSlick = usePDFSlickStore(s => s.pdfSlick);
  const disabled = !pdfSlick;
  const download = () => pdfSlick?.downloadOrSave();

  return (
    <div className="mobile-download-btn absolute top-4 right-4 z-10">
      <button
        className="p-3 rounded-full bg-white/10 hover:bg-[#25d9d8]/30 text-white border border-white/20 shadow-lg cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
        onClick={download}
        disabled={disabled}
        aria-label="Descargar"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="7 10 12 15 17 10"/>
          <line x1="12" y1="15" x2="12" y2="3"/>
        </svg>
      </button>
      <style jsx global>{`
        /* Mostrar botón solo en <= 517px */
        .mobile-download-btn { display: none; }
        @media (max-width: 517px) {
          .mobile-download-btn { display: block; }
        }
      `}</style>
    </div>
  );
}


