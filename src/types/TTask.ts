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
});
export const TasksSchema = z.array(TaskSchema);

export type TTask = z.infer<typeof TaskSchema>;
export type TTasks = z.infer<typeof TasksSchema>;


export type TNewTask = {
  name: string, 
  description: string,
  comment: string,
  price: number, 
  taskTypeId: number, 
  statusId: number, 
  priorityId: number,
  serviceId: number,
  resolutionDatePlan: string,
  tags: number[],
  initiatorId: number,
  executorId: number,
  executorGroupId: number,
}