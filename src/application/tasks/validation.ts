import type { CreateTaskInput } from "../../domain/tasks/task";
import { TASK_URGENCIES, TASK_WEIGHTS, TASK_TYPES } from "../../domain/tasks/task";

export function validateCreateTaskInput(input: CreateTaskInput) {
  const errors: string[] = [];

  if (!hasText(input.title)) {
    errors.push("title is required");
  }

  if (!hasText(input.subject)) {
    errors.push("subject is required");
  }

  if (!hasText(input.dueDate)) {
    errors.push("dueDate is required");
  }

  if (!TASK_WEIGHTS.includes(input.weight)) {
    errors.push("weight must be low, medium or high");
  }

  if (!TASK_URGENCIES.includes(input.urgency)) {
    errors.push("urgency must be low, medium or high");
  }

  if (!TASK_TYPES.includes(input.type)) {
    errors.push("type must be exam, assignment, exercise, reading or other");
  }

  return errors;
}

function hasText(value: any) {
  return typeof value === "string" && value.trim().length > 0;
}
