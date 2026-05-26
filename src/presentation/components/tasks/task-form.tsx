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
        <div className="p-3 bg-red-100 border border-red-200 text-red-700 rounded-md text-sm">
          {error}
        </div>
      )}
      <form 
        aria-label="Nova tarefa escolar" 
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Título</label>
          <input 
            name="title" 
            required
            placeholder="Ex: Prova de História" 
            className="p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none text-gray-900"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Matéria</label>
          <input 
            name="subject" 
            required
            placeholder="Ex: História" 
            className="p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none text-gray-900"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Tipo de Atividade</label>
          <select 
            name="type" 
            className="p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none bg-white text-gray-900"
          >
            <option value="exercise">Exercício</option>
            <option value="assignment">Trabalho</option>
            <option value="exam">Prova</option>
            <option value="reading">Leitura</option>
            <option value="other">Outro</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Prazo</label>
          <input 
            name="dueDate" 
            type="date" 
            required
            className="p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none text-gray-900"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Peso Acadêmico</label>
          <select 
            name="weight" 
            className="p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none bg-white text-gray-900"
          >
            <option value="low">Baixo (Atividade simples)</option>
            <option value="medium">Médio (Trabalho/Seminário)</option>
            <option value="high">Alto (Prova/Projeto Final)</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Urgência</label>
          <select 
            name="urgency" 
            className="p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none bg-white text-gray-900"
          >
            <option value="low">Baixa (Pode esperar)</option>
            <option value="medium">Média (Atenção necessária)</option>
            <option value="high">Alta (Imediata)</option>
          </select>
        </div>
        <div className="md:col-span-2 pt-2">
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-bold py-2 px-4 rounded-md transition-colors"
          >
            {loading ? "Criando..." : "Criar tarefa"}
          </button>
        </div>
      </form>
    </div>
  );
}
