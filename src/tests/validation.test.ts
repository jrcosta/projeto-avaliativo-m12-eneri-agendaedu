import { describe, expect, it } from "vitest";
import { validateCreateTaskInput } from "../application/tasks/validation";

describe("validateCreateTaskInput", () => {
  it("returns no errors for valid input", () => {
    const errors = validateCreateTaskInput({
      title: "Valid title",
      subject: "Valid subject",
      dueDate: "2026-05-26",
      weight: "high",
      urgency: "medium",
      type: "exam"
    });
    expect(errors).toHaveLength(0);
  });

  it("returns errors for empty string fields", () => {
    const errors = validateCreateTaskInput({
      title: "   ",
      subject: "",
      dueDate: "",
      weight: "high",
      urgency: "medium",
      type: "exam"
    });
    expect(errors).toContain("title is required");
    expect(errors).toContain("subject is required");
    expect(errors).toContain("dueDate is required");
  });

  it("returns errors for undefined/null string fields", () => {
    const errors = validateCreateTaskInput({
      // @ts-ignore
      title: null,
      // @ts-ignore
      subject: undefined,
      dueDate: "2026-05-26",
      weight: "high",
      urgency: "medium",
      type: "exam"
    });
    expect(errors).toContain("title is required");
    expect(errors).toContain("subject is required");
  });

  it("returns errors for invalid weight", () => {
    const errors = validateCreateTaskInput({
      title: "Title", subject: "Sub", dueDate: "2026-05-26",
      // @ts-ignore
      weight: "invalid", urgency: "medium", type: "exam"
    });
    expect(errors).toContain("weight must be low, medium or high");
  });

  it("returns errors for invalid urgency", () => {
    const errors = validateCreateTaskInput({
      title: "Title", subject: "Sub", dueDate: "2026-05-26",
      // @ts-ignore
      weight: "high", urgency: "invalid", type: "exam"
    });
    expect(errors).toContain("urgency must be low, medium or high");
  });

  it("returns errors for invalid type", () => {
    const errors = validateCreateTaskInput({
      title: "Title", subject: "Sub", dueDate: "2026-05-26",
      // @ts-ignore
      weight: "high", urgency: "medium", type: "invalid"
    });
    expect(errors).toContain("type must be exam, assignment, exercise, reading or other");
  });
});
