import { describe, expect, it } from "vitest";
import { GET } from "../app/api/tasks/route";

describe("tasks api", () => {
  it("returns structured task list", async () => {
    const response = await GET();
    const body = await response.json();

    expect(body).toEqual({ tasks: [] });
  });
});
