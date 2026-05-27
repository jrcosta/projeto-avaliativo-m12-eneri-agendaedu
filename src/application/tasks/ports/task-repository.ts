import type { CreateTaskInput, Task } from "../../../domain/tasks/task";

export type TaskRepository = {
  create(input: Task): Promise<Task>;
  list(): Promise<Task[]>;
  findById(id: string): Promise<Task | null>;
  update(task: Task): Promise<Task>;
  delete(id: string): Promise<boolean>;
};

export type TaskIdGenerator = () => string;
export type TaskClock = () => Date;
export type TaskInput = CreateTaskInput;
