import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { TaskStats } from "../../presentation/components/tasks/task-stats";
import type { Task } from "../../domain/tasks/task";

describe("TaskStats", () => {
  const mockTasks: Task[] = [
    { id: "1", title: "T1", subject: "S1", type: "exam", dueDate: "2026-05-26", weight: "high", urgency: "high", priority: "high", status: "pending", createdAt: "", updatedAt: "" },
    { id: "2", title: "T2", subject: "S2", type: "exercise", dueDate: "2026-05-26", weight: "low", urgency: "low", priority: "low", status: "in_progress", createdAt: "", updatedAt: "" },
    { id: "3", title: "T3", subject: "S3", type: "assignment", dueDate: "2026-05-26", weight: "medium", urgency: "medium", priority: "medium", status: "done", createdAt: "", updatedAt: "" },
  ];

  it("renders statistics correctly", () => {
    render(<TaskStats tasks={mockTasks} />);

    expect(screen.getByText("3")).toBeInTheDocument(); // Total
    expect(screen.getAllByText("1")).toHaveLength(3); // Each status
  });

  it("renders labels correctly", () => {
    render(<TaskStats tasks={mockTasks} />);

    expect(screen.getByText("Total")).toBeInTheDocument();
    expect(screen.getByText("Pendentes")).toBeInTheDocument();
    expect(screen.getByText("Em curso")).toBeInTheDocument();
    expect(screen.getByText("Concluídas")).toBeInTheDocument();
  });
});
