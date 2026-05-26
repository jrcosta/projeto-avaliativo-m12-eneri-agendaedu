import { describe, expect, it } from "vitest";
import { TaskService } from "../application/tasks/task-service";
import type { TaskRepository } from "../application/tasks/ports/task-repository";
import type { Task } from "../domain/tasks/task";

class InMemoryTaskRepository implements TaskRepository {
  private readonly tasks = new Map<string, Task>();

  async create(task: Task) {
    this.tasks.set(task.id, task);
    return task;
  }

  async list() {
    return Array.from(this.tasks.values());
  }

  async findById(id: string) {
    return this.tasks.get(id) ?? null;
  }

  async update(task: Task) {
    this.tasks.set(task.id, task);
    return task;
  }
}

describe("TaskService", () => {
  it("creates task with calculated high priority", async () => {
    const service = new TaskService(new InMemoryTaskRepository(), () => "task-1", () => new Date("2026-05-26T00:00:00.000Z"));

    const result = await service.createTask({
      title: "Estudar matemática",
      subject: "Matemática",
      dueDate: "2026-05-27",
      weight: 9,
      urgency: "medium",
    });

    expect(result).toEqual({
      ok: true,
      task: {
        id: "task-1",
        title: "Estudar matemática",
        subject: "Matemática",
        dueDate: "2026-05-27",
        weight: 9,
        urgency: "medium",
        priority: "high",
        status: "pending",
        createdAt: "2026-05-26T00:00:00.000Z",
        updatedAt: "2026-05-26T00:00:00.000Z",
      },
    });
  });

  it("rejects task without required fields", async () => {
    const service = new TaskService(new InMemoryTaskRepository());

    const result = await service.createTask({
      title: "",
      subject: "",
      dueDate: "",
      weight: 0,
      urgency: "low",
    });

    expect(result).toEqual({
      ok: false,
      errors: ["title is required", "subject is required", "dueDate is required", "weight must be between 1 and 10"],
    });
  });
});
