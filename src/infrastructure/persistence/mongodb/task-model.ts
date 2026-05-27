import mongoose, { Schema } from "mongoose";
import type { Task } from "../../../domain/tasks/task";

const TaskSchema = new Schema<Task>(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    subject: { type: String, required: true },
    type: { type: String, required: true },
    dueDate: { type: String, required: true },
    weight: { type: String, required: true },
    urgency: { type: String, required: true },
    priority: { type: String, required: true },
    status: { type: String, required: true },
    createdAt: { type: String, required: true },
    updatedAt: { type: String, required: true },
  },
  { collection: "tasks" }
);

export const TaskModel = mongoose.models.Task || mongoose.model<Task>("Task", TaskSchema);
