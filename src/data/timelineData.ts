/**
 * Datos de la línea de tiempo (timeline)
 * Proceso de trabajo paso a paso
 * Los textos se obtienen de messages/[locale].json usando timeline.[id]
 */

export interface TimelineItem {
  id: string;
}

export const timelineData: TimelineItem[] = [
  { id: "step1" },
  { id: "step2" },
  { id: "step3" },
  { id: "step4" },
  { id: "step5" },
  { id: "step6" },
  { id: "step7" },
];
