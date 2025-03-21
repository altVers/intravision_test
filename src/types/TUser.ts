import { z } from "zod";

export const UserSchema = z.object({
    id: z.number(),
    name: z.string(),
})

export const UsersSchema = z.array(UserSchema)

export type TUser = z.infer<typeof UserSchema>
export type TUsers = z.infer<typeof UsersSchema>