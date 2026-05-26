"use client";

import { useState } from "react";
import type { TaskType, TaskUrgency, TaskWeight } from "../../../domain/tasks/task";

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
        <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r-md text-sm font-medium flex items-start">
          <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          {error}
        </div>
      )}
      <form 
        aria-label="Nova tarefa escolar" 
        className="grid grid-cols-1 md:grid-cols-2 gap-5"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Título</label>
          <input 
            name="title" 
            required
            placeholder="Ex: Prova de História" 
            className="p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-slate-700 placeholder-slate-400"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Matéria</label>
          <input 
            name="subject" 
            required
            placeholder="Ex: História" 
            className="p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-slate-700 placeholder-slate-400"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Tipo de Atividade</label>
          <select 
            name="type" 
            className="p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-slate-700 appearance-none"
          >
            <option value="exercise">Exercício</option>
            <option value="assignment">Trabalho</option>
            <option value="exam">Prova</option>
            <option value="reading">Leitura</option>
            <option value="other">Outro</option>
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Prazo</label>
          <input 
            name="dueDate" 
            type="date" 
            required
            className="p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-slate-700"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Peso Acadêmico</label>
          <select 
            name="weight" 
            className="p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-slate-700 appearance-none"
          >
            <option value="low">Baixo (Atividade simples)</option>
            <option value="medium">Médio (Trabalho/Seminário)</option>
            <option value="high">Alto (Prova/Projeto Final)</option>
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Urgência</label>
          <select 
            name="urgency" 
            className="p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-slate-700 appearance-none"
          >
            <option value="low">Baixa (Pode esperar)</option>
            <option value="medium">Média (Atenção necessária)</option>
            <option value="high">Alta (Imediata)</option>
          </select>
        </div>
        <div className="md:col-span-2 pt-4 mt-2 border-t border-slate-100">
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:bg-blue-300 text-white font-bold py-3.5 px-4 rounded-xl transition-all shadow-sm hover:shadow text-lg flex justify-center items-center gap-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Salvando tarefa...
              </>
            ) : "Salvar Tarefa"}
          </button>
        </div>
      </form>
    </div>
  );
}
