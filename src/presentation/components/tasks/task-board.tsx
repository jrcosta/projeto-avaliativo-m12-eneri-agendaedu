import type { Task } from "../../../domain/tasks/task";
import { TaskCard } from "./task-card";

type TaskBoardProps = {
  tasks: Task[];
};

export function TaskBoard({ tasks }: TaskBoardProps) {
  return (
    <section aria-label="Quadro de tarefas escolares" className="flex flex-col gap-3">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </section>
  );
}
