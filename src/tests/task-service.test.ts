import { describe, expect, it, vi } from "vitest";
import { TaskService } from "../application/tasks/task-service";
import type { TaskRepository } from "../application/tasks/ports/task-repository";
import type { Task } from "../domain/tasks/task";

const mockRepository: TaskRepository = {
  create: vi.fn((task: Task) => Promise.resolve(task)),
  list: vi.fn(() => Promise.resolve([])),
  findById: vi.fn(() => Promise.resolve(null)),
  update: vi.fn((task: Task) => Promise.resolve(task)),
};

describe("TaskService", () => {
  const service = new TaskService(
    mockRepository,
    () => "task-1",
    () => new Date("2026-05-26T00:00:00.000Z"),
  );

  it("creates task with calculated high priority", async () => {
    const result = await service.createTask({
      title: "Estudar matemática",
      subject: "Matemática",
      type: "exam",
      dueDate: "2026-05-27",
      weight: "high",
      urgency: "high",
    });

    expect(result).toEqual({
      ok: true,
      task: {
        id: "task-1",
        title: "Estudar matemática",
        subject: "Matemática",
        type: "exam",
        dueDate: "2026-05-27",
        weight: "high",
        urgency: "high",
        priority: "high",
        status: "pending",
        createdAt: "2026-05-26T00:00:00.000Z",
        updatedAt: "2026-05-26T00:00:00.000Z",
      },
    });
  });

  it("rejects task without required fields", async () => {
    const result = await service.createTask({
      title: "",
      subject: "",
      dueDate: "",
      weight: "medium",
      urgency: "medium",
      type: "exercise",
    });

    expect(result.ok).toBe(false);
    expect(result.errors).toContain("title is required");
  });

  it("lists tasks via repository", async () => {
    const tasks = await service.listTasks();
    expect(tasks).toEqual([]);
    expect(mockRepository.list).toHaveBeenCalled();
  });

  it("updates task status", async () => {
    const updatedMockTask: Task = {
      id: "task-1",
      title: "Estudar matemática",
      subject: "Matemática",
      type: "exam",
      dueDate: "2026-05-27",
      weight: "high",
      urgency: "high",
      priority: "high",
      status: "pending",
      createdAt: "2026-05-26T00:00:00.000Z",
      updatedAt: "2026-05-26T00:00:00.000Z",
    };

    mockRepository.findById = vi.fn().mockResolvedValue(updatedMockTask);

    const result = await service.updateTaskStatus("task-1", "done");

    expect(result.ok).toBe(true);
    // @ts-ignore
    expect(result.task.status).toBe("done");
    expect(result.task?.updatedAt).toBe("2026-05-26T00:00:00.000Z"); // From mock clock
    expect(mockRepository.update).toHaveBeenCalled();
  });

  it("fails to update status if task not found", async () => {
    mockRepository.findById = vi.fn().mockResolvedValue(null);

    const result = await service.updateTaskStatus("invalid-id", "done");

    expect(result.ok).toBe(false);
    expect(result.errors).toContain("task not found");
  });
});
