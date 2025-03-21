import { StatusesSchema, TStatuses } from "@/types/TStatus";

export const fetchStatuses = (): Promise<TStatuses> => {
  return fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/${process.env.NEXT_PUBLIC_GUID_KEY}/Statuses`
  )
    .then((data) => data.json())
    .then((statuses) => StatusesSchema.parse(statuses));
};
