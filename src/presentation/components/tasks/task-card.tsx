import type { Task } from "../../../domain/tasks/task";

type TaskCardProps = {
  task: Task;
};

export function TaskCard({ task }: TaskCardProps) {
  return (
    <article>
      <h3>{task.title}</h3>
      <p>{task.subject}</p>
      <p>Prioridade: {task.priority}</p>
      <p>Status: {task.status}</p>
    </article>
  );
}
