import type { Task } from "../../../domain/tasks/task";
import type { TaskRepository } from "../../../application/tasks/ports/task-repository";
import fs from "node:fs/promises";
import path from "node:path";

const DATA_DIR = path.join(process.cwd(), "data");
const FILE_PATH = path.join(DATA_DIR, "tasks.json");

export class JsonTaskRepository implements TaskRepository {
  private async ensureDataFile() {
    try {
      await fs.access(DATA_DIR);
    } catch {
      await fs.mkdir(DATA_DIR, { recursive: true });
    }

    try {
      await fs.access(FILE_PATH);
    } catch {
      // Inicia com a tarefa de exemplo para não ficar vazio
      const initialTask: Task = {
        id: "demo-task-persistent",
        title: "Explorar o Agenda Edu Persistente",
        subject: "Tecnologia",
        type: "reading",
        dueDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
        weight: "medium",
        urgency: "medium",
        priority: "medium",
        status: "pending",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      await fs.writeFile(FILE_PATH, JSON.stringify([initialTask], null, 2), "utf-8");
    }
  }

  private async readTasks(): Promise<Task[]> {
    await this.ensureDataFile();
    const content = await fs.readFile(FILE_PATH, "utf-8");
    return JSON.parse(content);
  }

  private async writeTasks(tasks: Task[]): Promise<void> {
    await this.ensureDataFile();
    await fs.writeFile(FILE_PATH, JSON.stringify(tasks, null, 2), "utf-8");
  }

  async create(task: Task) {
    const tasks = await this.readTasks();
    tasks.push(task);
    await this.writeTasks(tasks);
    return task;
  }

  async list() {
    return this.readTasks();
  }

  async findById(id: string) {
    const tasks = await this.readTasks();
    return tasks.find((t) => t.id === id) ?? null;
  }

  async update(task: Task) {
    const tasks = await this.readTasks();
    const index = tasks.findIndex((t) => t.id === task.id);
    if (index !== -1) {
      tasks[index] = task;
      await this.writeTasks(tasks);
    }
    return task;
  }

  async delete(id: string) {
    const tasks = await this.readTasks();
    const filtered = tasks.filter((t) => t.id !== id);
    if (filtered.length < tasks.length) {
      await this.writeTasks(filtered);
      return true;
    }
    return false;
  }
}
