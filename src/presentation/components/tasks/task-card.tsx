import type { Task } from "../../../domain/tasks/task";
import { Calendar, BookOpen, AlertCircle, Clock, Trash2, Edit2 } from "lucide-react";
import { useState } from "react";

type TaskCardProps = {
  task: Task;
  onEdit?: (task: Task) => void;
  onDelete?: (task: Task) => void;
};

export function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const priorityColors = {
    high: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800/50",
    medium: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800/50",
    low: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800/50",
  };

  const typeLabels = {
    exam: "Prova",
    assignment: "Trabalho",
    exercise: "Exercício",
    reading: "Leitura",
    other: "Outro",
  };

  const handleDelete = async () => {
    if (confirm(`Tem certeza que deseja excluir "${task.title}"?`)) {
      setIsDeleting(true);
      try {
        const response = await fetch(`/api/tasks/${task.id}`, { method: "DELETE" });
        if (response.ok) {
          onDelete?.(task);
        } else {
          alert("Erro ao excluir a tarefa.");
        }
      } catch (err) {
        alert("Erro de conexão ao tentar excluir.");
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <article className="p-5 bg-white dark:bg-slate-800 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-slate-200 dark:border-slate-700 flex flex-col md:flex-row md:items-center justify-between gap-5 group">
      <div className="space-y-2">
        <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {task.title}
        </h3>
        <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
          <span className="font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-700/50 px-2.5 py-0.5 rounded-md flex items-center gap-1.5 transition-colors">
            <BookOpen className="w-3.5 h-3.5" />
            {task.subject}
          </span>
          <span className="text-slate-300 dark:text-slate-600">•</span>
          <span>{typeLabels[task.type]}</span>
          <span className="text-slate-300 dark:text-slate-600">•</span>
          <span className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
            <Calendar className="w-4 h-4" />
            {new Date(task.dueDate).toLocaleDateString("pt-BR")}
          </span>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
        <div className="flex gap-2 items-center">
          <span className={`px-3.5 py-1.5 rounded-full text-xs font-bold border tracking-wide shadow-sm flex items-center gap-1 transition-colors ${priorityColors[task.priority]}`}>
            {task.priority === 'high' && <AlertCircle className="w-3.5 h-3.5" />}
            {task.priority.toUpperCase()}
          </span>
          <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-600 uppercase tracking-wide flex items-center gap-1.5 transition-colors">
            {task.status === 'pending' && <Clock className="w-3.5 h-3.5" />}
            {task.status.replace("_", " ")}
          </span>
        </div>
        
        <div className="flex gap-2 mt-2 sm:mt-0 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={() => onEdit?.(task)}
            className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-full transition-colors"
            title="Editar tarefa"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button 
            onClick={handleDelete}
            disabled={isDeleting}
            className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-full transition-colors disabled:opacity-50"
            title="Excluir tarefa"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </article>
  );
}
