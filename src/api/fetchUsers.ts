import { TUsers, UsersSchema } from "@/types/TUser";

export const fetchUsers = (): Promise<TUsers> => {
  return fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/${process.env.NEXT_PUBLIC_GUID_KEY}/Users`
  )
    .then((data) => data.json())
    .then((users) => UsersSchema.parse(users));
};
