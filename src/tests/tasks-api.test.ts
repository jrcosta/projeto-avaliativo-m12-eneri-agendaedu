import { describe, expect, it, vi, afterEach } from "vitest";
import { GET, POST } from "../app/api/tasks/route";

describe("tasks api", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns structured task list on GET", async () => {
    const response = await GET();
    const body = await response.json();

    expect(body.tasks).toBeDefined();
    expect(Array.isArray(body.tasks)).toBe(true);
  });

  it("creates a task and returns 201 on valid POST", async () => {
    const req = new Request("http://localhost/api/tasks", {
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

    const response = await POST(req);
    expect(response.status).toBe(201);
    
    const body = await response.json();
    expect(body.task).toBeDefined();
    expect(body.task.title).toBe("Test API Task");
  });

  it("returns 400 on invalid POST", async () => {
    const req = new Request("http://localhost/api/tasks", {
      method: "POST",
      body: JSON.stringify({
        title: "", // invalid
        subject: "Test Subject",
        type: "reading",
        dueDate: "2026-05-27",
        weight: "medium",
        urgency: "medium"
      })
    });

    const response = await POST(req);
    expect(response.status).toBe(400);
    
    const body = await response.json();
    expect(body.errors).toBeDefined();
    expect(body.errors).toContain("title is required");
  });
});
