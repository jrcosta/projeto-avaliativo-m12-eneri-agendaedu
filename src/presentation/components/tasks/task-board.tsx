import type { Task } from "../../../domain/tasks/task";
import { TaskCard } from "./task-card";

type TaskBoardProps = {
  tasks: Task[];
  onEdit?: (task: Task) => void;
  onDelete?: (task: Task) => void;
};

export function TaskBoard({ tasks, onEdit, onDelete }: TaskBoardProps) {
  return (
    <section aria-label="Quadro de tarefas escolares" className="flex flex-col gap-3">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </section>
  );
}
