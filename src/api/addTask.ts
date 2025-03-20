import { TNewTask } from "@/types/TTask";

export const addTask = (task: TNewTask) => {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/${process.env.NEXT_PUBLIC_GUID_KEY}/Tasks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
    })
}