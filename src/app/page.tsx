"use client";

import { useEffect, useState } from "react";
import { TaskBoard } from "../presentation/components/tasks/task-board";
import { TaskForm } from "../presentation/components/tasks/task-form";
import type { Task } from "../domain/tasks/task";

export default function HomePage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      // Desabilitar cache para garantir dados frescos
      const response = await fetch("/api/tasks", { cache: "no-store" });
      const data = await response.json();
      setTasks(data.tasks || []);
    } catch (error) {
      console.error("Erro ao carregar tarefas:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <main className="min-h-screen p-8 max-w-4xl mx-auto space-y-8">
      <header className="text-center space-y-2">
        <h1 className="text-4xl font-bold tracking-tight text-blue-600">Agenda Edu</h1>
        <p className="text-gray-600 italic">Seu organizador escolar inteligente</p>
      </header>

      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Nova Tarefa</h2>
        <TaskForm onSuccess={fetchTasks} />
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">Minhas Tarefas</h2>
        {loading ? (
          <p className="text-center text-gray-500">Carregando tarefas...</p>
        ) : tasks.length > 0 ? (
          <TaskBoard tasks={tasks} />
        ) : (
          <div className="text-center py-12 border-2 border-dashed rounded-xl border-gray-200">
            <p className="text-gray-400">Nenhuma tarefa cadastrada ainda.</p>
          </div>
        )}
      </div>
    </main>
  );
}
