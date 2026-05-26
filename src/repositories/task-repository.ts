import type { Task } from "../domain/task";

export type TaskRepository = {
  list(): Promise<Task[]>;
};
