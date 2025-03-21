import { TaskSchema, TTask } from "@/types/TTask";

export const fetchTask = (id: number):Promise<TTask> => {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/${process.env.NEXT_PUBLIC_GUID_KEY}/Tasks/${id}`)
       .then(response => response.json())
       .then(data => TaskSchema.parse(data));
}