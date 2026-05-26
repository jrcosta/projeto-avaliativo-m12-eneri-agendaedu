import { describe, expect, it, beforeEach } from "vitest";
import { H2TaskRepository } from "../infrastructure/persistence/h2/h2-task-repository";
import type { Task } from "../domain/tasks/task";

describe("H2TaskRepository", () => {
  let repository: H2TaskRepository;

  beforeEach(() => {
    repository = new H2TaskRepository();
  });

  const mockTask: Task = {
    id: "test-id-1",
    title: "Test Task",
    subject: "Test Subject",
    type: "exercise",
    dueDate: "2026-05-26",
    weight: "low",
    urgency: "low",
    priority: "low",
    status: "pending",
    createdAt: "2026-05-26T00:00:00.000Z",
    updatedAt: "2026-05-26T00:00:00.000Z"
  };

  it("creates and retrieves a task", async () => {
    await repository.create(mockTask);
    const retrieved = await repository.findById("test-id-1");
    expect(retrieved).toEqual(mockTask);
  });

  it("returns null when task is not found", async () => {
    const retrieved = await repository.findById("non-existent-id");
    expect(retrieved).toBeNull();
  });

  it("lists all tasks including the initial mock task", async () => {
    await repository.create(mockTask);
    const tasks = await repository.list();
    // initial task + mockTask
    expect(tasks.length).toBeGreaterThanOrEqual(1);
    expect(tasks.find(t => t.id === "test-id-1")).toEqual(mockTask);
  });

  it("updates an existing task", async () => {
    await repository.create(mockTask);
    
    const updatedTask = { ...mockTask, status: "done" as const };
    await repository.update(updatedTask);
    
    const retrieved = await repository.findById("test-id-1");
    expect(retrieved?.status).toBe("done");
  });
});
