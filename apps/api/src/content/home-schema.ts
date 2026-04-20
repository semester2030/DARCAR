import { z } from "zod";

/** تحقق مرن لحفظ JSON الصفحة الرئيسية دون تقييد شكل كل block */
export const homePageJsonSchema = z.object({
  version: z.coerce.number().int().positive(),
  meta: z.object({
    titleAr: z.string().min(1),
    descriptionAr: z.string(),
  }),
  blocks: z.array(z.record(z.string(), z.unknown())),
});

export type HomePageJsonValidated = z.infer<typeof homePageJsonSchema>;
