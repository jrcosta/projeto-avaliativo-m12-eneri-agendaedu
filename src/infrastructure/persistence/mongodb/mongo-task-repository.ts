import type { Task } from "../../../domain/tasks/task";
import type { TaskRepository } from "../../../application/tasks/ports/task-repository";
import { connectToDatabase } from "../../../lib/mongodb";
import { TaskModel } from "./task-model";

export class MongoTaskRepository implements TaskRepository {
  async create(task: Task) {
    await connectToDatabase();
    await TaskModel.create(task);
    return task;
  }

  async list() {
    await connectToDatabase();
    const tasks = await TaskModel.find({}).lean();
    return tasks as unknown as Task[];
  }

  async findById(id: string) {
    await connectToDatabase();
    const task = await TaskModel.findOne({ id }).lean();
    return (task as unknown as Task) ?? null;
  }

  async update(task: Task) {
    await connectToDatabase();
    await TaskModel.findOneAndUpdate({ id: task.id }, task);
    return task;
  }

  async delete(id: string) {
    await connectToDatabase();
    const result = await TaskModel.deleteOne({ id });
    return result.deletedCount === 1;
  }
}
