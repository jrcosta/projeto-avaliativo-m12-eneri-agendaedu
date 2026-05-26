import type { TaskPriority, TaskUrgency } from "./task";

const HIGH_WEIGHT_THRESHOLD = 8;
const MEDIUM_WEIGHT_THRESHOLD = 5;
const SOON_DUE_DAYS = 3;
const DAY_IN_MS = 24 * 60 * 60 * 1000;

export function calculateTaskPriority(dueDate: string, weight: number, urgency: TaskUrgency): TaskPriority {
  if (urgency === "high" || weight >= HIGH_WEIGHT_THRESHOLD || isDueSoon(dueDate)) {
    return "high";
  }

  if (urgency === "medium" || weight >= MEDIUM_WEIGHT_THRESHOLD) {
    return "medium";
  }

  return "low";
}

function isDueSoon(dueDate: string) {
  const dueTime = new Date(dueDate).getTime();

  if (Number.isNaN(dueTime)) {
    return false;
  }

  const daysUntilDue = (dueTime - Date.now()) / DAY_IN_MS;

  return daysUntilDue <= SOON_DUE_DAYS;
}
