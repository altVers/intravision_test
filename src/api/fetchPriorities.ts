import { PrioritiesSchema, TPriorities } from "@/types/TPriority";

export const fetchPriorities = (): Promise<TPriorities> => {
  return fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/${process.env.NEXT_PUBLIC_GUID_KEY}/Priorities`
  )
    .then((data) => data.json())
    .then((priorities) => PrioritiesSchema.parse(priorities));
};
