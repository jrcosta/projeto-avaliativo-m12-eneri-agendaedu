import type { TaskPriority, TaskUrgency, TaskWeight, TaskType } from "./task";

const SOON_DUE_DAYS = 3;
const DAY_IN_MS = 24 * 60 * 60 * 1000;

export function calculateTaskPriority(
  dueDate: string, 
  weight: TaskWeight, 
  urgency: TaskUrgency,
  type: TaskType
): TaskPriority {
  const isSoon = isDueSoon(dueDate);
  
  const weightScore = mapToScore(weight);
  const urgencyScore = mapToScore(urgency);
  const typeScore = mapTypeToScore(type);
  const dueScore = isSoon ? 3 : 1;

  // Max score: 3 (weight) + 3 (urgency) + 3 (type) + 3 (due) = 12
  // Min score: 1 + 1 + 1 + 1 = 4
  const totalScore = weightScore + urgencyScore + typeScore + dueScore;

  if (totalScore >= 10) return "high";
  if (totalScore >= 7) return "medium";
  return "low";
}

function mapToScore(value: TaskWeight | TaskUrgency): number {
  switch (value) {
    case "high": return 3;
    case "medium": return 2;
    case "low": return 1;
    default: return 1;
  }
}

function mapTypeToScore(type: TaskType): number {
  switch (type) {
    case "exam": return 3;
    case "assignment": return 2;
    case "exercise":
    case "reading":
    case "other": return 1;
    default: return 1;
  }
}

function isDueSoon(dueDate: string) {
  const dueTime = new Date(dueDate).getTime();

  if (Number.isNaN(dueTime)) {
    return false;
  }

  const daysUntilDue = (dueTime - Date.now()) / DAY_IN_MS;

  return daysUntilDue <= SOON_DUE_DAYS;
}
