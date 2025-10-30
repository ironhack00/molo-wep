import type { Metadata } from "next";
import FullScreenPdfViewer from "@/components/organisms/pdf/FullScreenPdfViewer";
import HideChrome from "@/components/atoms/HideChrome";

export const metadata: Metadata = {
  title: "Our Work | Portfolio PDF",
  description: "Portfolio completo de Molokaih en formato PDF.",
  alternates: { canonical: "/our-work" },
  robots: { index: true, follow: true },
};

export default function OurWorkPage() {
  return (
    <>
      <HideChrome />
      <FullScreenPdfViewer pdfUrl="/pdf/MolokaihES-Portafolio.pdf" />
    </>
  );
}


