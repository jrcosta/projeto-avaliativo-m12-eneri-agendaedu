import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { TaskCard } from "../../presentation/components/tasks/task-card";
import type { Task } from "../../domain/tasks/task";

describe("TaskCard", () => {
  const mockTask: Task = {
    id: "1",
    title: "Test Task",
    subject: "Math",
    type: "exam",
    dueDate: "2026-05-26",
    weight: "high",
    urgency: "high",
    priority: "high",
    status: "pending",
    createdAt: "",
    updatedAt: ""
  };

  beforeEach(() => {
    vi.clearAllMocks();
    global.fetch = vi.fn().mockResolvedValue({ ok: true });
    window.confirm = vi.fn().mockReturnValue(true);
  });

  it("renders task details", () => {
    render(<TaskCard task={mockTask} />);
    expect(screen.getByText("Test Task")).toBeInTheDocument();
    expect(screen.getByText("Math")).toBeInTheDocument();
    expect(screen.getByText("HIGH")).toBeInTheDocument();
  });

  it("calls onEdit when edit button is clicked", () => {
    const onEdit = vi.fn();
    render(<TaskCard task={mockTask} onEdit={onEdit} />);
    
    const editButton = screen.getByTitle("Editar tarefa");
    fireEvent.click(editButton);
    expect(onEdit).toHaveBeenCalledWith(mockTask);
  });

  it("calls onDelete after successful fetch on delete button click", async () => {
    const onDelete = vi.fn();
    render(<TaskCard task={mockTask} onDelete={onDelete} />);
    
    const deleteButton = screen.getByTitle("Excluir tarefa");
    fireEvent.click(deleteButton);
    
    expect(window.confirm).toHaveBeenCalled();
    await waitFor(() => expect(onDelete).toHaveBeenCalledWith(mockTask));
  });

  it("calls onStatusChange when status button is clicked", async () => {
    const onStatusChange = vi.fn();
    render(<TaskCard task={mockTask} onStatusChange={onStatusChange} />);
    
    const statusButton = screen.getByText("PENDENTE");
    fireEvent.click(statusButton);
    
    await waitFor(() => expect(onStatusChange).toHaveBeenCalledWith("1", "in_progress"));
  });

  it("cycles through statuses correctly", async () => {
    const onStatusChange = vi.fn();
    
    // Pending -> In Progress
    const { rerender } = render(<TaskCard task={mockTask} onStatusChange={onStatusChange} />);
    fireEvent.click(screen.getByText("PENDENTE"));
    await waitFor(() => expect(onStatusChange).toHaveBeenCalledWith("1", "in_progress"));

    // In Progress -> Done
    rerender(<TaskCard task={{ ...mockTask, status: "in_progress" }} onStatusChange={onStatusChange} />);
    fireEvent.click(screen.getByText("EM ANDAMENTO"));
    await waitFor(() => expect(onStatusChange).toHaveBeenCalledWith("1", "done"));

    // Done -> Pending
    rerender(<TaskCard task={{ ...mockTask, status: "done" }} onStatusChange={onStatusChange} />);
    fireEvent.click(screen.getByText("CONCLUÍDA"));
    await waitFor(() => expect(onStatusChange).toHaveBeenCalledWith("1", "pending"));
  });
});
