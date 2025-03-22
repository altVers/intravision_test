import { z } from "zod";

export const PrioritySchema = z.object({
  id: z.number(),
  name: z.string(),
  rgb: z.string(),
});

export const PrioritiesSchema = z.array(PrioritySchema);

export type TPriority = z.infer<typeof PrioritySchema>;
export type TPriorities = z.infer<typeof PrioritiesSchema>;
