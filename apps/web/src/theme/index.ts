/**
 * Dar Car theme — TypeScript mirrors for motion/durations.
 * الألوان والظلال يُفضّل تعديلها في `dar-car-theme.css` فقط.
 */
export const dcMotion = {
  stagger: 0.07,
  fast: 0.18,
  base: 0.28,
  slow: 0.48,
  easeOut: [0.16, 1, 0.3, 1] as const,
  easeSpring: [0.34, 1.56, 0.64, 1] as const,
} as const;

export const dcLayers = {
  header: 50,
  modal: 100,
} as const;
