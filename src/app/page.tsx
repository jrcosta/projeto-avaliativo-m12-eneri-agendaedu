"use client";

import { useEffect, useState } from "react";
import { TaskBoard } from "../presentation/components/tasks/task-board";
import { TaskForm } from "../presentation/components/tasks/task-form";
import type { Task } from "../domain/tasks/task";
import { CalendarX2 } from "lucide-react";

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
    <main className="min-h-screen bg-slate-50 text-slate-800 p-4 md:p-8 flex flex-col items-center">
      <div className="w-full max-w-4xl space-y-8">
        <header className="text-center space-y-3 pt-6 pb-2">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 drop-shadow-sm">
            Agenda <span className="text-blue-600">Edu</span>
          </h1>
          <p className="text-slate-500 text-lg md:text-xl font-medium tracking-wide">
            Seu organizador escolar inteligente
          </p>
        </header>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="flex border-b border-slate-100 bg-slate-50/50">
            <button
              onClick={() => setActiveTab("list")}
              className={`flex-1 py-4 text-sm md:text-base font-semibold transition-all duration-200 ${
                activeTab === "list"
                  ? "text-blue-600 bg-white border-b-2 border-blue-600 shadow-sm"
                  : "text-slate-500 hover:text-slate-700 hover:bg-slate-100"
              }`}
            >
              Minhas Tarefas
            </button>
            <button
              onClick={() => setActiveTab("create")}
              className={`flex-1 py-4 text-sm md:text-base font-semibold transition-all duration-200 ${
                activeTab === "create"
                  ? "text-blue-600 bg-white border-b-2 border-blue-600 shadow-sm"
                  : "text-slate-500 hover:text-slate-700 hover:bg-slate-100"
              }`}
            >
              Cadastrar Tarefa
            </button>
          </div>

          <div className="p-6 md:p-8">
            {activeTab === "create" ? (
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                <h2 className="text-2xl font-bold text-slate-800 mb-6">Nova Tarefa</h2>
                <TaskForm onSuccess={handleSuccess} />
              </div>
            ) : (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-slate-800">Minhas Tarefas</h2>
                  <span className="bg-blue-100 text-blue-700 py-1 px-3 rounded-full text-xs font-bold">
                    {tasks.length} {tasks.length === 1 ? 'tarefa' : 'tarefas'}
                  </span>
                </div>
                
                {loading ? (
                  <div className="flex justify-center py-12">
                    <div className="animate-pulse flex space-x-2">
                      <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                    </div>
                  </div>
                ) : tasks.length > 0 ? (
                  <TaskBoard tasks={tasks} />
                ) : (
                  <div className="flex flex-col items-center justify-center py-16 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200">
                    <div className="bg-white p-4 rounded-full shadow-sm mb-4">
                      <CalendarX2 className="w-8 h-8 text-blue-500" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-700 mb-1">Nenhuma tarefa por aqui</h3>
                    <p className="text-slate-500 max-w-sm">
                      Você ainda não cadastrou nenhuma tarefa. Clique na aba acima para organizar seus estudos!
                    </p>
                    <button 
                      onClick={() => setActiveTab("create")}
                      className="mt-6 text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline transition-all"
                    >
                      Criar primeira tarefa &rarr;
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
