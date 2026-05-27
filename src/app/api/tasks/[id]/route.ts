import { TaskService } from "../../../../application/tasks/task-service";
import { JsonTaskRepository } from "../../../../infrastructure/persistence/json/json-task-repository";

const taskService = new TaskService(new JsonTaskRepository());

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const input = await request.json();
  const result = await taskService.updateTask(params.id, input);

  if (!result.ok) {
    if (result.errors.includes("task not found")) {
      return Response.json({ errors: result.errors }, { status: 404 });
    }
    return Response.json({ errors: result.errors }, { status: 400 });
  }

  return Response.json({ task: result.task }, { status: 200 });
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const result = await taskService.deleteTask(params.id);

  if (!result.ok) {
    return Response.json({ errors: result.errors }, { status: 404 });
  }

  return new Response(null, { status: 204 });
}
