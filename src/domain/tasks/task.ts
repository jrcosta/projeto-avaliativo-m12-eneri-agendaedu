export const TASK_URGENCIES = ["low", "medium", "high"] as const;
export const TASK_WEIGHTS = ["low", "medium", "high"] as const;
export const TASK_TYPES = ["exam", "assignment", "exercise", "reading", "other"] as const;
export const TASK_PRIORITIES = ["low", "medium", "high"] as const;
export const TASK_STATUSES = ["pending", "in_progress", "done"] as const;

export type TaskUrgency = (typeof TASK_URGENCIES)[number];
export type TaskWeight = (typeof TASK_WEIGHTS)[number];
export type TaskType = (typeof TASK_TYPES)[number];
export type TaskPriority = (typeof TASK_PRIORITIES)[number];
export type TaskStatus = (typeof TASK_STATUSES)[number];

export type Task = {
  id: string;
  title: string;
  subject: string;
  type: TaskType;
  description?: string;
  dueDate: string;
  weight: TaskWeight;
  urgency: TaskUrgency;
  priority: TaskPriority;
  status: TaskStatus;
  createdAt: string;
  updatedAt: string;
};

export type CreateTaskInput = {
  title: string;
  subject: string;
  type: TaskType;
  description?: string;
  dueDate: string;
  weight: TaskWeight;
  urgency: TaskUrgency;
};
