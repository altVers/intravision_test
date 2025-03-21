import { z } from "zod";

export const StatusSchema = z.object({
    rgb: z.string(),
    id: z.number(),
    name: z.string(),
})

export const StatusesSchema = z.array(StatusSchema)

export type TStatus = z.infer<typeof StatusSchema>
export type TStatuses = z.infer<typeof StatusesSchema>