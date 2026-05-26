"use client";

import { useState } from "react";
import type { TaskType, TaskUrgency, TaskWeight } from "../../../domain/tasks/task";
import { AlertCircle, Loader2, Save } from "lucide-react";

type TaskFormProps = {
  onSuccess?: () => void;
};

export function TaskForm({ onSuccess }: TaskFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = {
      title: formData.get("title") as string,
      subject: formData.get("subject") as string,
      type: formData.get("type") as TaskType,
      dueDate: formData.get("dueDate") as string,
      weight: formData.get("weight") as TaskWeight,
      urgency: formData.get("urgency") as TaskUrgency,
    };

    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        form.reset();
        // Pequeno delay para garantir que o H2 (memória) processou
        setTimeout(() => {
          onSuccess?.();
        }, 100);
      } else {
        const result = await response.json();
        setError(result.errors?.join(", ") || "Erro desconhecido do servidor");
      }
    } catch (err: any) {
      console.error("Erro completo:", err);
      setError("Erro interno: " + (err.message || "Falha na conexão"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-900/30 border-l-4 border-red-500 text-red-700 dark:text-red-400 rounded-r-md text-sm font-medium flex items-start">
          <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
          {error}
        </div>
      )}
      <form 
        aria-label="Nova tarefa escolar" 
        className="grid grid-cols-1 md:grid-cols-2 gap-5"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Título</label>
          <input 
            name="title" 
            required
            placeholder="Ex: Prova de História" 
            className="p-3 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-slate-700 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Matéria</label>
          <input 
            name="subject" 
            required
            placeholder="Ex: História" 
            className="p-3 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-slate-700 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Tipo de Atividade</label>
          <select 
            name="type" 
            className="p-3 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-slate-700 dark:text-slate-100 appearance-none"
          >
            <option value="exercise">Exercício</option>
            <option value="assignment">Trabalho</option>
            <option value="exam">Prova</option>
            <option value="reading">Leitura</option>
            <option value="other">Outro</option>
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Prazo</label>
          <input 
            name="dueDate" 
            type="date" 
            required
            className="p-3 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-slate-700 dark:text-slate-100"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Peso Acadêmico</label>
          <select 
            name="weight" 
            className="p-3 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-slate-700 dark:text-slate-100 appearance-none"
          >
            <option value="low">Baixo (Atividade simples)</option>
            <option value="medium">Médio (Trabalho/Seminário)</option>
            <option value="high">Alto (Prova/Projeto Final)</option>
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Urgência</label>
          <select 
            name="urgency" 
            className="p-3 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-slate-700 dark:text-slate-100 appearance-none"
          >
            <option value="low">Baixa (Pode esperar)</option>
            <option value="medium">Média (Atenção necessária)</option>
            <option value="high">Alta (Imediata)</option>
          </select>
        </div>
        <div className="md:col-span-2 pt-4 mt-2 border-t border-slate-100 dark:border-slate-700">
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 active:bg-blue-800 disabled:bg-blue-300 dark:disabled:bg-blue-800/50 text-white font-bold py-3.5 px-4 rounded-xl transition-all shadow-sm hover:shadow text-lg flex justify-center items-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin text-white" />
                Salvando tarefa...
              </>
            ) : (
              <>
                <Save className="w-5 h-5 mr-2 text-white" />
                Salvar Tarefa
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
