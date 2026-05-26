export type TaskUrgency = "low" | "medium" | "high";
export type TaskPriority = "low" | "medium" | "high";
export type TaskStatus = "pending" | "in_progress" | "done";

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
