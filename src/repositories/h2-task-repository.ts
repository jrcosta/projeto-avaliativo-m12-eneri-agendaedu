import type { Task } from "../domain/task";
import type { TaskRepository } from "./task-repository";

export class H2TaskRepository implements TaskRepository {
  async list(): Promise<Task[]> {
    return [];
  }
}
