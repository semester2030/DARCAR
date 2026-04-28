/**
 * Dar Car theme — TypeScript mirrors for motion/durations.
 * الألوان والظلال يُفضّل تعديلها في `dar-car-theme.css` فقط.
 */
export const dcMotion = {
  stagger: 0.08,
  fast: 0.2,
  base: 0.36,
  slow: 0.55,
  easeOut: [0.16, 1, 0.3, 1] as const,
  easeSpring: [0.34, 1.45, 0.64, 1] as const,
  /** دخول أقوى: طيران + تلاشي ضبابية */
  enterBlur: { amount: 10, y: 22 } as const,
} as const;

export const dcLayers = {
  header: 50,
  modal: 100,
} as const;
