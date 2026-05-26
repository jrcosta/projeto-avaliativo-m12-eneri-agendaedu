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
    <article className="p-5 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-5 group">
      <div className="space-y-2">
        <h3 className="font-bold text-lg text-slate-800 group-hover:text-blue-600 transition-colors">
          {task.title}
        </h3>
        <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
          <span className="font-semibold text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-md">
            {task.subject}
          </span>
          <span className="text-slate-300">•</span>
          <span>{typeLabels[task.type]}</span>
          <span className="text-slate-300">•</span>
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {new Date(task.dueDate).toLocaleDateString("pt-BR")}
          </span>
        </div>
      </div>
      
      <div className="flex gap-3 items-center">
        <span className={`px-3.5 py-1.5 rounded-full text-xs font-bold border tracking-wide shadow-sm ${priorityColors[task.priority]}`}>
          {task.priority.toUpperCase()}
        </span>
        <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-slate-100 text-slate-600 border border-slate-200 uppercase tracking-wide">
          {task.status.replace("_", " ")}
        </span>
      </div>
    </article>
  );
}
