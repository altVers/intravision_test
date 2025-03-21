import { z } from "zod";

export const TagSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export const TagsSchema = z.array(TagSchema);

export type TTag = z.infer<typeof TagSchema>;
export type TTags = z.infer<typeof TagsSchema>;
