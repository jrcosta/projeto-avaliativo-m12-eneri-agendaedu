import { describe, expect, it, vi, beforeEach } from "vitest";
import { MongoTaskRepository } from "../infrastructure/persistence/mongodb/mongo-task-repository";
import { TaskModel } from "../infrastructure/persistence/mongodb/task-model";
import type { Task } from "../domain/tasks/task";

vi.mock("../infrastructure/persistence/mongodb/task-model");
vi.mock("../lib/mongodb", () => ({
  connectToDatabase: vi.fn().mockResolvedValue({}),
}));

describe("MongoTaskRepository", () => {
  let repository: MongoTaskRepository;

  beforeEach(() => {
    vi.clearAllMocks();
    repository = new MongoTaskRepository();
    process.env.MONGODB_URI = "mongodb://dummy";
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

  it("creates a task", async () => {
    vi.mocked(TaskModel.create).mockResolvedValue(mockTask as any);
    const result = await repository.create(mockTask);
    expect(result).toEqual(mockTask);
    expect(TaskModel.create).toHaveBeenCalledWith(mockTask);
  });

  it("lists tasks", async () => {
    vi.mocked(TaskModel.find).mockReturnValue({
      lean: vi.fn().mockResolvedValue([mockTask]),
    } as any);
    const tasks = await repository.list();
    expect(tasks).toEqual([mockTask]);
  });

  it("finds task by id", async () => {
    vi.mocked(TaskModel.findOne).mockReturnValue({
      lean: vi.fn().mockResolvedValue(mockTask),
    } as any);
    const result = await repository.findById("test-id-1");
    expect(result).toEqual(mockTask);
  });

  it("returns null if task not found", async () => {
    vi.mocked(TaskModel.findOne).mockReturnValue({
      lean: vi.fn().mockResolvedValue(null),
    } as any);
    const result = await repository.findById("invalid");
    expect(result).toBeNull();
  });

  it("updates a task", async () => {
    vi.mocked(TaskModel.findOneAndUpdate).mockResolvedValue(mockTask as any);
    const result = await repository.update(mockTask);
    expect(result).toEqual(mockTask);
    expect(TaskModel.findOneAndUpdate).toHaveBeenCalled();
  });

  it("deletes a task", async () => {
    vi.mocked(TaskModel.deleteOne).mockResolvedValue({ deletedCount: 1 } as any);
    const result = await repository.delete("test-id-1");
    expect(result).toBe(true);
  });
});
