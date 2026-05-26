import { describe, expect, it } from "vitest";
import { listTasks } from "../domain/task-service";

describe("listTasks", () => {
  it("returns provided tasks", () => {
    expect(listTasks([])).toEqual([]);
  });
});
