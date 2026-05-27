import type { Task, TaskStatus, TaskWeight, TaskUrgency, TaskType } from "../../../domain/tasks/task";
import { Calendar, BookOpen, AlertCircle, Clock, Trash2, Edit2, Play, CheckCircle2, Info } from "lucide-react";
import { useState } from "react";

// ── Score breakdown (mirrors domain/tasks/task-priority.ts) ──────────────────
const SOON_DUE_DAYS = 3;

function scoreWeight(v: TaskWeight)   { return v === "high" ? 3 : v === "medium" ? 2 : 1; }
function scoreUrgency(v: TaskUrgency) { return v === "high" ? 3 : v === "medium" ? 2 : 1; }
function scoreType(v: TaskType)       { return v === "exam" ? 3 : v === "assignment" ? 2 : 1; }
function scoreDue(dueDate: string) {
  const days = (new Date(dueDate).getTime() - Date.now()) / (24 * 60 * 60 * 1000);
  return !Number.isNaN(days) && days <= SOON_DUE_DAYS ? 3 : 1;
}

function buildScoreBreakdown(task: Task) {
  const w = scoreWeight(task.weight);
  const u = scoreUrgency(task.urgency);
  const t = scoreType(task.type);
  const d = scoreDue(task.dueDate);
  const total = w + u + t + d;
  const threshold = total >= 10 ? "≥ 10 → HIGH" : total >= 7 ? "≥ 7 → MEDIUM" : "< 7 → LOW";
  return { w, u, t, d, total, threshold };
}

const weightLabels:  Record<TaskWeight,  string> = { high: "Alto", medium: "Médio", low: "Baixo" };
const urgencyLabels: Record<TaskUrgency, string> = { high: "Alta",  medium: "Média", low: "Baixa" };
const typeScoreLabels: Record<TaskType, string>  = {
  exam: "Prova", assignment: "Trabalho", exercise: "Exercício", reading: "Leitura", other: "Outro",
};

type TaskCardProps = {
  task: Task;
  onEdit?: (task: Task) => void;
  onDelete?: (task: Task) => void;
  onStatusChange?: (id: string, status: TaskStatus) => void;
};

export function TaskCard({ task, onEdit, onDelete, onStatusChange }: TaskCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showScore, setShowScore] = useState(false);

  const score = buildScoreBreakdown(task);

  const priorityColors = {
    high: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800/50",
    medium: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800/50",
    low: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800/50",
  };

  const statusLabels = {
    pending: "Pendente",
    in_progress: "Em Andamento",
    done: "Concluída",
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

  const handleStatusUpdate = async (newStatus: TaskStatus) => {
    setIsUpdating(true);
    try {
      const response = await fetch(`/api/tasks/${task.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...task, status: newStatus }),
      });
      if (response.ok) {
        onStatusChange?.(task.id, newStatus);
      }
    } catch (err) {
      console.error("Erro ao atualizar status:", err);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <article className={`p-5 bg-white dark:bg-slate-800 rounded-2xl shadow-sm hover:shadow-md transition-all border flex flex-col md:flex-row md:items-center justify-between gap-5 group ${task.status === 'done' ? 'opacity-60 border-slate-100 dark:border-slate-700' : 'border-slate-200 dark:border-slate-700'}`}>
      <div className="space-y-2">
        <h3 className={`font-bold text-lg transition-colors ${task.status === 'done' ? 'text-slate-400 line-through' : 'text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400'}`}>
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
      
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
        <div className="flex gap-2 items-center">
          <span className={`px-3.5 py-1.5 rounded-full text-xs font-bold border tracking-wide shadow-sm flex items-center gap-1 transition-colors ${priorityColors[task.priority]}`}>
            {task.priority === 'high' && <AlertCircle className="w-3.5 h-3.5" />}
            {task.priority.toUpperCase()}
          </span>

          {/* Score tooltip */}
          <div className="relative" onMouseEnter={() => setShowScore(true)} onMouseLeave={() => setShowScore(false)}>
            <button
              type="button"
              className="w-5 h-5 rounded-full flex items-center justify-center text-slate-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
              aria-label="Ver cálculo de prioridade"
            >
              <Info className="w-4 h-4" />
            </button>

            {showScore && (
              <div className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 bg-slate-900 dark:bg-slate-950 text-white text-xs rounded-xl shadow-xl p-3 pointer-events-none border border-slate-700">
                <p className="font-bold text-slate-200 mb-2 text-center">Cálculo de Prioridade</p>
                <div className="space-y-1 text-slate-300">
                  <div className="flex justify-between">
                    <span>Peso ({weightLabels[task.weight]})</span>
                    <span className="font-mono font-bold text-blue-400">+{score.w}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Urgência ({urgencyLabels[task.urgency]})</span>
                    <span className="font-mono font-bold text-blue-400">+{score.u}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tipo ({typeScoreLabels[task.type]})</span>
                    <span className="font-mono font-bold text-blue-400">+{score.t}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Prazo {score.d === 3 ? "(≤ 3 dias)" : "(> 3 dias)"}</span>
                    <span className="font-mono font-bold text-blue-400">+{score.d}</span>
                  </div>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-700 flex justify-between items-center">
                  <span className="font-bold text-slate-100">Total</span>
                  <span className="font-mono font-bold text-white">{score.total} / 12</span>
                </div>
                <p className="mt-1 text-center text-slate-400 font-mono text-[10px]">{score.threshold}</p>
                {/* seta */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900 dark:border-t-slate-950" />
              </div>
            )}
          </div>

          <button
            onClick={() => {
              if (task.status === 'pending') handleStatusUpdate('in_progress');
              else if (task.status === 'in_progress') handleStatusUpdate('done');
              else handleStatusUpdate('pending');
            }}
            disabled={isUpdating}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold border tracking-wide shadow-sm flex items-center gap-1.5 transition-all ${
              task.status === 'done' 
                ? 'bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800/50'
                : task.status === 'in_progress'
                ? 'bg-amber-50 text-amber-600 border-amber-100 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800/50'
                : 'bg-slate-50 text-slate-600 border-slate-200 dark:bg-slate-700/50 dark:text-slate-300 dark:border-slate-600'
            }`}
          >
            {task.status === 'pending' && <Play className="w-3 h-3 fill-current" />}
            {task.status === 'in_progress' && <Clock className="w-3 h-3 animate-pulse" />}
            {task.status === 'done' && <CheckCircle2 className="w-3 h-3" />}
            {statusLabels[task.status].toUpperCase()}
          </button>
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
