export const TASK_URGENCIES = ["low", "medium", "high"] as const;
export const TASK_PRIORITIES = ["low", "medium", "high"] as const;
export const TASK_STATUSES = ["pending", "in_progress", "done"] as const;

export type TaskUrgency = (typeof TASK_URGENCIES)[number];
export type TaskPriority = (typeof TASK_PRIORITIES)[number];
export type TaskStatus = (typeof TASK_STATUSES)[number];

export type Task = {
  id: string;
  title: string;
  subject: string;
  description?: string;
  dueDate: string;
  weight: number;
  urgency: TaskUrgency;
  priority: TaskPriority;
  status: TaskStatus;
  createdAt: string;
  updatedAt: string;
};

export type CreateTaskInput = {
  title: string;
  subject: string;
  description?: string;
  dueDate: string;
  weight: number;
  urgency: TaskUrgency;
};
