import type { Task } from "../../../domain/tasks/task";

type TaskCardProps = {
  task: Task;
};

export function TaskCard({ task }: TaskCardProps) {
  const priorityColors = {
    high: "bg-red-100 text-red-700 border-red-200",
    medium: "bg-yellow-100 text-yellow-700 border-yellow-200",
    low: "bg-green-100 text-green-700 border-green-200",
  };

  const typeLabels = {
    exam: "Prova",
    assignment: "Trabalho",
    exercise: "Exercício",
    reading: "Leitura",
    other: "Outro",
  };

  return (
    <article className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="space-y-1">
        <h3 className="font-bold text-lg text-gray-900">{task.title}</h3>
        <p className="text-sm text-gray-500">
          <span className="font-medium text-blue-600">{task.subject}</span> • {typeLabels[task.type]}
        </p>
        <p className="text-xs text-gray-400 italic">Prazo: {new Date(task.dueDate).toLocaleDateString("pt-BR")}</p>
      </div>
      
      <div className="flex gap-2 items-center">
        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${priorityColors[task.priority]}`}>
          {task.priority.toUpperCase()}
        </span>
        <span className="px-3 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-600 border border-gray-200 uppercase">
          {task.status.replace("_", " ")}
        </span>
      </div>
    </article>
  );
}
