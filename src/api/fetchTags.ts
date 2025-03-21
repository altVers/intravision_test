import { TagsSchema, TTags } from "@/types/TTag";

export const fetchTags = (): Promise<TTags> => {
  return fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/${process.env.NEXT_PUBLIC_GUID_KEY}/Tags`
  )
    .then((data) => data.json())
    .then((tags) => TagsSchema.parse(tags));
};
