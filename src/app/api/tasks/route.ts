import { TaskService } from "../../../application/tasks/task-service";
import { H2TaskRepository } from "../../../infrastructure/persistence/h2/h2-task-repository";

const taskService = new TaskService(new H2TaskRepository());

export async function GET() {
  const tasks = await taskService.listTasks();

  return Response.json({ tasks });
}

export async function POST(request: Request) {
  const input = await request.json();
  const result = await taskService.createTask(input);

  if (!result.ok) {
    return Response.json({ errors: result.errors }, { status: 400 });
  }

  return Response.json({ task: result.task }, { status: 201 });
}
