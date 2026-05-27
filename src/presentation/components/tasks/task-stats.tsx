import type { Task } from "../../../domain/tasks/task";
import { CheckCircle2, Clock, AlertCircle, ListChecks } from "lucide-react";

type TaskStatsProps = {
  tasks: Task[];
};

export function TaskStats({ tasks }: TaskStatsProps) {
  const stats = {
    total: tasks.length,
    pending: tasks.filter(t => t.status === 'pending').length,
    inProgress: tasks.filter(t => t.status === 'in_progress').length,
    done: tasks.filter(t => t.status === 'done').length,
  };

  const cards = [
    { label: "Total", value: stats.total, icon: ListChecks, color: "text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400" },
    { label: "Pendentes", value: stats.pending, icon: Clock, color: "text-slate-600 bg-slate-50 dark:bg-slate-700/50 dark:text-slate-300" },
    { label: "Em curso", value: stats.inProgress, icon: AlertCircle, color: "text-amber-600 bg-amber-50 dark:bg-amber-900/20 dark:text-amber-400" },
    { label: "Concluídas", value: stats.done, icon: CheckCircle2, color: "text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {cards.map((card) => (
        <div key={card.label} className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm flex items-center gap-4 transition-all">
          <div className={`p-2.5 rounded-xl ${card.color}`}>
            <card.icon className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{card.label}</p>
            <p className="text-xl font-bold text-slate-800 dark:text-slate-100">{card.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
