import type { CreateTaskInput } from "../../domain/tasks/task";

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

  if (input.weight < 1 || input.weight > 10) {
    errors.push("weight must be between 1 and 10");
  }

  return errors;
}

function hasText(value: string) {
  return value.trim().length > 0;
}
