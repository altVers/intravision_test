import { TasksSchema, TTasks } from "@/types/TTask";

export const fetchTasks = ():Promise<TTasks> => {
  return fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/odata/tasks?tenantguid=${process.env.NEXT_PUBLIC_GUID_KEY}`
  ).then((response) => response.json()).then((data) => data.value).then((data) => TasksSchema.parse(data));
};
