import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import HomePage from "../../app/page";

describe("HomePage", () => {
  const mockTasks = [
    { id: "1", title: "Math Exam", subject: "Math", type: "exam", dueDate: "2026-05-30", weight: "high", urgency: "high", priority: "high", status: "pending" },
    { id: "2", title: "History Reading", subject: "History", type: "reading", dueDate: "2026-06-05", weight: "low", urgency: "low", priority: "low", status: "done" },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    global.fetch = vi.fn().mockImplementation((url) => {
      if (url === "/api/tasks") {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ tasks: mockTasks }),
        });
      }
      return Promise.resolve({ ok: true, json: () => Promise.resolve({}) });
    });
  });

  it("renders the dashboard and task list by default", async () => {
    await act(async () => {
      render(<HomePage />);
    });
    
    expect(screen.getByText(/Agenda/i)).toBeInTheDocument();
    expect(screen.getByText(/Edu/i)).toBeInTheDocument();
    expect(screen.getByText("Total")).toBeInTheDocument();
    await waitFor(() => expect(screen.getByText("Math Exam")).toBeInTheDocument());
    expect(screen.getByText("History Reading")).toBeInTheDocument();
  });

  it("switches tabs between list and creation", async () => {
    await act(async () => {
      render(<HomePage />);
    });
    
    const createTab = screen.getByText("Cadastrar Tarefa");
    fireEvent.click(createTab);
    
    expect(screen.getByRole("heading", { name: /Nova Tarefa/i })).toBeInTheDocument();
    expect(screen.queryByText("Math Exam")).not.toBeInTheDocument();
    
    const listTab = screen.getByText("Minhas Tarefas");
    fireEvent.click(listTab);
    expect(screen.getByText("Math Exam")).toBeInTheDocument();
  });

  it("filters tasks by search input", async () => {
    await act(async () => {
      render(<HomePage />);
    });
    
    const searchInput = screen.getByPlaceholderText("Buscar tarefa ou matéria...");
    fireEvent.change(searchInput, { target: { value: "Math" } });
    
    expect(screen.getByText("Math Exam")).toBeInTheDocument();
    expect(screen.queryByText("History Reading")).not.toBeInTheDocument();
  });

  it("filters tasks by priority", async () => {
    await act(async () => {
      render(<HomePage />);
    });
    
    const prioritySelect = screen.getByDisplayValue("Todas Prioridades");
    fireEvent.change(prioritySelect, { target: { value: "high" } });
    
    expect(screen.getByText("Math Exam")).toBeInTheDocument();
    expect(screen.queryByText("History Reading")).not.toBeInTheDocument();
  });

  it("toggles theme correctly", async () => {
    await act(async () => {
      render(<HomePage />);
    });
    
    const themeButton = screen.getByLabelText("Alternar tema");
    fireEvent.click(themeButton);
    
    expect(document.documentElement.classList.contains("dark")).toBe(true);
    
    fireEvent.click(themeButton);
    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });

  it("enters edit mode when a task is edited", async () => {
    await act(async () => {
      render(<HomePage />);
    });
    
    await waitFor(() => screen.getByText("Math Exam"));
    const editButton = screen.getAllByTitle("Editar tarefa")[0];
    fireEvent.click(editButton);
    
    expect(screen.getByRole("heading", { name: /Editar Tarefa/i })).toBeInTheDocument();
    expect(screen.getByDisplayValue("Math Exam")).toBeInTheDocument();
  });

  it("sorts tasks by due date", async () => {
    await act(async () => {
      render(<HomePage />);
    });
    
    await waitFor(() => screen.getByText("Math Exam"));
    const sortSelect = screen.getByDisplayValue("Ordenar p/ Prioridade");
    fireEvent.change(sortSelect, { target: { value: "dueDate" } });
    
    const taskTitles = screen.getAllByRole("heading", { level: 3 }).map(h => h.textContent);
    expect(taskTitles[0]).toBe("Math Exam"); // May 30
    expect(taskTitles[1]).toBe("History Reading"); // June 05
  });
});
