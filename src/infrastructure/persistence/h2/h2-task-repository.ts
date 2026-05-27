import type { Task } from "../../../domain/tasks/task";
import type { TaskRepository } from "../../../application/tasks/ports/task-repository";

// Inicializa com uma tarefa de exemplo para não ficar vazio após reload no Next.js
const initialTask: Task = {
  id: "demo-task-1",
  title: "Apresentar projeto de avaliação",
  subject: "Tecnologia",
  type: "exam",
  dueDate: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Amanhã
  weight: "high",
  urgency: "high",
  priority: "high",
  status: "pending",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

const tasks = new Map<string, Task>([
  [initialTask.id, initialTask]
]);

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

  async delete(id: string) {
    return tasks.delete(id);
  }
}
