"use client";

import { useEffect, useState } from "react";
import { TaskBoard } from "../presentation/components/tasks/task-board";
import { TaskForm } from "../presentation/components/tasks/task-form";
import type { Task } from "../domain/tasks/task";

export default function HomePage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"list" | "create">("list");

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

  const handleSuccess = () => {
    fetchTasks();
    setActiveTab("list");
  };

  return (
    <main className="min-h-screen p-8 max-w-4xl mx-auto space-y-8">
      <header className="text-center space-y-2">
        <h1 className="text-4xl font-bold tracking-tight text-blue-600">Agenda Edu</h1>
        <p className="text-gray-600 italic">Seu organizador escolar inteligente</p>
      </header>

      <div className="flex justify-center border-b border-gray-200">
        <button
          onClick={() => setActiveTab("list")}
          className={`px-6 py-3 font-semibold transition-colors border-b-2 ${
            activeTab === "list"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          }`}
        >
          Minhas Tarefas
        </button>
        <button
          onClick={() => setActiveTab("create")}
          className={`px-6 py-3 font-semibold transition-colors border-b-2 ${
            activeTab === "create"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          }`}
        >
          Cadastrar Tarefa
        </button>
      </div>

      <div className="mt-8">
        {activeTab === "create" ? (
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Nova Tarefa</h2>
            <TaskForm onSuccess={handleSuccess} />
          </div>
        ) : (
          <div className="space-y-4">
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
        )}
      </div>
    </main>
  );
}
