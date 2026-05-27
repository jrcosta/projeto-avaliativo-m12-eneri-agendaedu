import { describe, expect, it, vi, beforeEach } from "vitest";
import { PUT, DELETE } from "../app/api/tasks/[id]/route";
import { POST } from "../app/api/tasks/route";

// Mock do Repositório para não tentar conectar ao MongoDB real durante os testes
vi.mock("../infrastructure/persistence/mongodb/mongo-task-repository", () => {
  const tasks = new Map();
  return {
    MongoTaskRepository: vi.fn().mockImplementation(() => {
      return {
        create: vi.fn(async (task) => {
          tasks.set(task.id, task);
          return task;
        }),
        list: vi.fn(async () => Array.from(tasks.values())),
        findById: vi.fn(async (id) => tasks.get(id) || null),
        update: vi.fn(async (task) => {
          tasks.set(task.id, task);
          return task;
        }),
        delete: vi.fn(async (id) => tasks.delete(id)),
      };
    }),
  };
});

describe("tasks/[id] api", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.MONGODB_URI = "mongodb://dummy";
  });

  it("updates a task and returns 200 on valid PUT", async () => {
    // First create a task
    const postReq = new Request("http://localhost/api/tasks", {
      method: "POST",
      body: JSON.stringify({
        title: "Test API Task",
        subject: "Test Subject",
        type: "reading",
        dueDate: "2026-05-27",
        weight: "medium",
        urgency: "medium"
      })
    });
    const postRes = await POST(postReq);
    const postBody = await postRes.json();
    const taskId = postBody.task.id;

    // Now update it
    const req = new Request(`http://localhost/api/tasks/${taskId}`, {
      method: "PUT",
      body: JSON.stringify({
        title: "Updated Title",
        subject: "Test Subject",
        type: "reading",
        dueDate: "2026-05-27",
        weight: "medium",
        urgency: "medium"
      })
    });

    const response = await PUT(req, { params: { id: taskId } });
    expect(response.status).toBe(200);
    
    const body = await response.json();
    expect(body.task.title).toBe("Updated Title");
  });

  it("returns 404 on PUT if task not found", async () => {
    const req = new Request("http://localhost/api/tasks/invalid-id", {
      method: "PUT",
      body: JSON.stringify({
        title: "Updated Title",
        subject: "Test Subject",
        type: "reading",
        dueDate: "2026-05-27",
        weight: "medium",
        urgency: "medium"
      })
    });

    const response = await PUT(req, { params: { id: "invalid-id" } });
    expect(response.status).toBe(404);
  });

  it("returns 400 on PUT if validation fails", async () => {
    const req = new Request("http://localhost/api/tasks/any-id", {
      method: "PUT",
      body: JSON.stringify({ title: "" })
    });

    const response = await PUT(req, { params: { id: "any-id" } });
    expect(response.status).toBe(400);
  });

  it("deletes a task and returns 204 on valid DELETE", async () => {
     // First create a task
     const postReq = new Request("http://localhost/api/tasks", {
      method: "POST",
      body: JSON.stringify({
        title: "Task to delete",
        subject: "Test Subject",
        type: "reading",
        dueDate: "2026-05-27",
        weight: "medium",
        urgency: "medium"
      })
    });
    const postRes = await POST(postReq);
    const postBody = await postRes.json();
    const taskId = postBody.task.id;

    const req = new Request(`http://localhost/api/tasks/${taskId}`, { method: "DELETE" });

    const response = await DELETE(req, { params: { id: taskId } });
    expect(response.status).toBe(204);
  });

  it("returns 404 on DELETE if task not found", async () => {
    const req = new Request("http://localhost/api/tasks/invalid-id-delete", { method: "DELETE" });

    const response = await DELETE(req, { params: { id: "invalid-id-delete" } });
    expect(response.status).toBe(404);
  });
});
