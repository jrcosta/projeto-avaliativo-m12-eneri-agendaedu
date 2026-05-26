import type { Task } from "../../../domain/tasks/task";
import type { TaskRepository } from "../../../application/tasks/ports/task-repository";

const tasks = new Map<string, Task>();

export class H2TaskRepository implements TaskRepository {
  async create(task: Task) {
    tasks.set(task.id, task);
    return task;
  }

  async list() {
    return Array.from(tasks.values());
  }

  async findById(id: string) {
    return tasks.get(id) ?? null;
  }

  async update(task: Task) {
    tasks.set(task.id, task);
    return task;
  }
}
