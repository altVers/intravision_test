import { TEditedTask } from "@/types/TTask"

export const editTask = (editedTask: TEditedTask) => {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/${process.env.NEXT_PUBLIC_GUID_KEY}/Tasks`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedTask),
    })
}