import { calculateTaskPriority } from "../../domain/tasks/task-priority";
import type { CreateTaskInput, Task, TaskStatus } from "../../domain/tasks/task";
import type { TaskClock, TaskIdGenerator, TaskRepository } from "./ports/task-repository";
import { validateCreateTaskInput } from "./validation";

export class TaskService {
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly generateId: TaskIdGenerator = () => crypto.randomUUID(),
    private readonly clock: TaskClock = () => new Date(),
  ) {}

  async createTask(input: CreateTaskInput) {
    const errors = validateCreateTaskInput(input);

    if (errors.length > 0) {
      return { ok: false as const, errors };
    }

    const now = this.clock().toISOString();
    const task: Task = {
      ...input,
      id: this.generateId(),
      priority: calculateTaskPriority(input.dueDate, input.weight, input.urgency, input.type),
      status: "pending",
      createdAt: now,
      updatedAt: now,
    };

    return { ok: true as const, task: await this.taskRepository.create(task) };
  }

  async listTasks() {
    return this.taskRepository.list();
  }

  async updateTaskStatus(id: string, status: TaskStatus) {
    const task = await this.taskRepository.findById(id);

    if (!task) {
      return { ok: false as const, errors: ["task not found"] };
    }

    const updatedTask: Task = {
      ...task,
      status,
      updatedAt: this.clock().toISOString(),
    };

    return { ok: true as const, task: await this.taskRepository.update(updatedTask) };
  }
}
