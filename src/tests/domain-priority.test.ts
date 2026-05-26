import { describe, expect, it } from "vitest";
import { calculateTaskPriority } from "../domain/tasks/task-priority";

describe("calculateTaskPriority", () => {
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
  const nextWeek = new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0];

  it("returns high priority for exam, high urgency, high weight (due soon)", () => {
    // Score: 3(high weight) + 3(high urgency) + 3(exam) + 3(due soon) = 12 >= 10 (high)
    expect(calculateTaskPriority(tomorrow, "high", "high", "exam")).toBe("high");
  });

  it("returns medium priority for assignment, medium urgency, medium weight (not soon)", () => {
    // Score: 2(med weight) + 2(med urgency) + 2(assignment) + 1(not soon) = 7 >= 7 (medium)
    expect(calculateTaskPriority(nextWeek, "medium", "medium", "assignment")).toBe("medium");
  });

  it("returns low priority for other, low urgency, low weight (not soon)", () => {
    // Score: 1(low weight) + 1(low urgency) + 1(other) + 1(not soon) = 4 < 7 (low)
    expect(calculateTaskPriority(nextWeek, "low", "low", "other")).toBe("low");
  });

  it("handles fallback to low if weight or urgency are undefined", () => {
    // @ts-ignore
    expect(calculateTaskPriority(nextWeek, "invalid", "invalid", "reading")).toBe("low");
  });

  it("handles invalid dates as not due soon", () => {
    // Score: 1(low) + 1(low) + 1(other) + 1(invalid date) = 4 < 7 (low)
    expect(calculateTaskPriority("invalid-date", "low", "low", "other")).toBe("low");
  });

  it("handles all specific types correctly", () => {
    expect(calculateTaskPriority(nextWeek, "high", "high", "exam")).toBe("high"); // 3+3+3+1 = 10
    expect(calculateTaskPriority(nextWeek, "low", "medium", "assignment")).toBe("low"); // 1+2+2+1 = 6 < 7
    expect(calculateTaskPriority(nextWeek, "low", "medium", "exercise")).toBe("low"); // 1+2+1+1 = 5
    // @ts-ignore
    expect(calculateTaskPriority(nextWeek, "low", "medium", "invalid")).toBe("low"); 
  });
});
