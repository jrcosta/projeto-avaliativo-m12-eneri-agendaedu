import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { TaskForm } from "../../presentation/components/tasks/task-form";
import type { Task } from "../../domain/tasks/task";

describe("TaskForm", () => {
  const mockTask: Task = {
    id: "1",
    title: "Old Title",
    subject: "Old Sub",
    type: "reading",
    dueDate: "2026-05-26",
    weight: "low",
    urgency: "low",
    priority: "low",
    status: "pending",
    createdAt: "",
    updatedAt: ""
  };

  beforeEach(() => {
    vi.clearAllMocks();
    global.fetch = vi.fn().mockResolvedValue({ 
      ok: true,
      json: () => Promise.resolve({ task: mockTask })
    });
  });

  it("renders in creation mode by default", () => {
    render(<TaskForm />);
    expect(screen.getByText(/Salvar Tarefa/i)).toBeInTheDocument();
  });

  it("renders in edit mode when initialTask is provided", () => {
    render(<TaskForm initialTask={mockTask} />);
    expect(screen.getByText(/Atualizar Tarefa/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Título/i)).toHaveValue("Old Title");
  });

  it("calls onSuccess after successful creation", async () => {
    const onSuccess = vi.fn();
    render(<TaskForm onSuccess={onSuccess} />);
    
    fireEvent.change(screen.getByLabelText(/Título/i), { target: { value: "New Task" } });
    fireEvent.change(screen.getByLabelText(/Matéria/i), { target: { value: "New Subject" } });
    fireEvent.change(screen.getByLabelText(/Prazo/i), { target: { value: "2026-05-27" } });
    
    fireEvent.click(screen.getByText(/Salvar Tarefa/i));
    
    await waitFor(() => expect(onSuccess).toHaveBeenCalled());
  });

  it("calls onSuccess after successful update", async () => {
    const onSuccess = vi.fn();
    render(<TaskForm initialTask={mockTask} onSuccess={onSuccess} />);
    
    fireEvent.click(screen.getByText(/Atualizar Tarefa/i));
    
    await waitFor(() => expect(onSuccess).toHaveBeenCalled());
  });

  it("calls onCancel when cancel button is clicked", () => {
    const onCancel = vi.fn();
    render(<TaskForm initialTask={mockTask} onCancel={onCancel} />);
    
    fireEvent.click(screen.getByText(/Cancelar/i));
    expect(onCancel).toHaveBeenCalled();
  });

  it("shows error message on fetch failure", async () => {
    global.fetch = vi.fn().mockResolvedValue({ 
      ok: false, 
      json: () => Promise.resolve({ errors: ["Invalid data"] }) 
    });
    
    render(<TaskForm />);
    
    // Fill fields to bypass HTML5 validation if any
    fireEvent.change(screen.getByLabelText(/Título/i), { target: { value: "Fail Task" } });
    fireEvent.change(screen.getByLabelText(/Matéria/i), { target: { value: "Fail Subject" } });
    fireEvent.change(screen.getByLabelText(/Prazo/i), { target: { value: "2026-05-27" } });

    fireEvent.click(screen.getByText(/Salvar Tarefa/i));
    
    await waitFor(() => expect(screen.getByText(/Invalid data/i)).toBeInTheDocument());
  });
});
