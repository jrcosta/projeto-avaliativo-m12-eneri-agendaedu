import type { Task } from "../../../domain/tasks/task";
import { TaskCard } from "./task-card";

type TaskBoardProps = {
  tasks: Task[];
  onEdit?: (task: Task) => void;
  onDelete?: (task: Task) => void;
  onStatusChange?: (id: string, status: TaskStatus) => void;
};

export function TaskBoard({ tasks, onEdit, onDelete, onStatusChange }: TaskBoardProps) {
  return (
    <section aria-label="Quadro de tarefas escolares" className="flex flex-col gap-3">
      {tasks.map((task) => (
        <TaskCard 
          key={task.id} 
          task={task} 
          onEdit={onEdit} 
          onDelete={onDelete}
          onStatusChange={onStatusChange}
        />
      ))}
    </section>
  );
}
