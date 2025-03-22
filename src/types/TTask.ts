import { z } from "zod";

export const TaskSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  price: z.number(),
  taskTypeId: z.number(),
  taskTypeName: z.string(),
  statusId: z.number(),
  statusName: z.string(),
  statusRgb: z.string(),
  priorityId: z.number(),
  priorityName: z.string(),
  serviceId: z.number(),
  serviceName: z.string(),
  resolutionDatePlan: z.string(),
  initiatorId: z.number(),
  initiatorName: z.string(),
  executorId: z.number(),
  executorName: z.string(),
  executorGroupId: z.number(),
  executorGroupName: z.string(),
  tags: z.array(z.object({ id: z.number(), name: z.string() })),
  lifetimeItems: z
    .array(
      z.object({
        id: z.number(),
        userName: z.string(),
        lifetimeType: z.number(),
        createdAt: z.string(),
        comment: z.string().nullable(),
        fieldName: z.string().nullable(),
        oldFieldValue: z.string().nullable(),
        newFieldValue: z.string().nullable(),
      })
    )
    .optional(),
});
export const TasksSchema = z.array(TaskSchema);

export type TTask = z.infer<typeof TaskSchema>;
export type TTasks = z.infer<typeof TasksSchema>;

export type TNewTask = {
  name: string;
  description: string;
  comment: string;
  price: number;
  taskTypeId: number;
  statusId: number;
  priorityId: number;
  serviceId: number;
  resolutionDatePlan: string;
  tags: number[];
  initiatorId: number;
  executorId: number;
  executorGroupId: number;
};

export type TEditedTask = Partial<
  Omit<TNewTask, "statusId" | "executorId" | "id">
> & {
  id: number;
  statusId: number;
  executorId: number;
};
