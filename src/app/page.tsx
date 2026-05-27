"use client";

import { useEffect, useState } from "react";
import { TaskBoard } from "../presentation/components/tasks/task-board";
import { TaskForm } from "../presentation/components/tasks/task-form";
import { TaskStats } from "../presentation/components/tasks/task-stats";
import { Toast, type ToastType } from "../presentation/components/ui/toast";
import type { Task, TaskPriority } from "../domain/tasks/task";
import { CalendarX2, Moon, Sun, Search } from "lucide-react";

export default function HomePage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"list" | "create">("list");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [taskToEdit, setTaskToEdit] = useState<Task | undefined>(undefined);

  // Filtros e Busca
  const [search, setSearch] = useState("");
  const [filterPriority, setFilterPriority] = useState<TaskPriority | "all">("all");
  const [sortBy, setSortBy] = useState<"dueDate" | "priority">("priority");

  // Notificações
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);

  const showToast = (message: string, type: ToastType = "success") => {
    setToast({ message, type });
  };

  useEffect(() => {
    // Check system preference on load
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    } else {
      setTheme("light");
      document.documentElement.classList.remove("dark");
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await fetch("/api/tasks", { cache: "no-store" });
      const data = await response.json();
      setTasks(data.tasks || []);
    } catch (error) {
      console.error("Erro ao carregar tarefas:", error);
      showToast("Erro ao carregar tarefas.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSuccess = () => {
    fetchTasks();
    const action = taskToEdit ? "atualizada" : "criada";
    showToast(`Tarefa ${action} com sucesso!`);
    setTaskToEdit(undefined);
    setActiveTab("list");
  };

  const handleEdit = (task: Task) => {
    setTaskToEdit(task);
    setActiveTab("create");
  };

  const handleCancelEdit = () => {
    setTaskToEdit(undefined);
    setActiveTab("list");
  };

  const handleStatusChange = (id: string, status: string) => {
    fetchTasks();
    const labels: Record<string, string> = {
      done: 'Concluída',
      in_progress: 'Em Andamento',
      pending: 'Pendente'
    };
    showToast(`Status atualizado: ${labels[status]}`);
  };

  const handleDelete = () => {
    fetchTasks();
    showToast("Tarefa excluída.");
  };

  const handleTabClick = (tab: "list" | "create") => {
    if (tab === "create" && activeTab !== "create") {
      setTaskToEdit(undefined);
    }
    setActiveTab(tab);
  };

  const filteredTasks = tasks
    .filter((task) => {
      const matchSearch = task.title.toLowerCase().includes(search.toLowerCase()) || 
                          task.subject.toLowerCase().includes(search.toLowerCase());
      const matchPriority = filterPriority === "all" || task.priority === filterPriority;
      return matchSearch && matchPriority;
    })
    .sort((a, b) => {
      if (sortBy === "dueDate") {
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      } else {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      }
    });

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 p-4 md:p-8 flex flex-col items-center transition-colors duration-300">
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}
      
      <div className="w-full max-w-4xl space-y-8 relative">
        <button
          onClick={toggleTheme}
          className="absolute right-0 top-6 p-2 rounded-full bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 shadow-sm border border-slate-200 dark:border-slate-700 transition-colors"
          aria-label="Alternar tema"
        >
          {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
        </button>

        <header className="text-center space-y-3 pt-6 pb-2">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white drop-shadow-sm transition-colors">
            Agenda <span className="text-blue-600 dark:text-blue-500">Edu</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg md:text-xl font-medium tracking-wide transition-colors">
            Seu organizador escolar inteligente
          </p>
        </header>

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden transition-colors duration-300">
          <div className="flex border-b border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50">
            <button
              onClick={() => handleTabClick("list")}
              className={`flex-1 py-4 text-sm md:text-base font-semibold transition-all duration-200 ${
                activeTab === "list"
                  ? "text-blue-600 dark:text-blue-400 bg-white dark:bg-slate-800 border-b-2 border-blue-600 dark:border-blue-400 shadow-sm"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/50"
              }`}
            >
              Minhas Tarefas
            </button>
            <button
              onClick={() => handleTabClick("create")}
              className={`flex-1 py-4 text-sm md:text-base font-semibold transition-all duration-200 ${
                activeTab === "create"
                  ? "text-blue-600 dark:text-blue-400 bg-white dark:bg-slate-800 border-b-2 border-blue-600 dark:border-blue-400 shadow-sm"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/50"
              }`}
            >
              {taskToEdit ? "Editar Tarefa" : "Cadastrar Tarefa"}
            </button>
          </div>

          <div className="p-6 md:p-8">
            {activeTab === "create" ? (
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6 transition-colors">
                  {taskToEdit ? "Editar Tarefa" : "Nova Tarefa"}
                </h2>
                <TaskForm 
                  initialTask={taskToEdit} 
                  onSuccess={handleSuccess} 
                  onCancel={handleCancelEdit} 
                />
              </div>
            ) : (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <TaskStats tasks={tasks} />

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 transition-colors flex items-center gap-3">
                    Minhas Tarefas
                    <span className="bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400 py-1 px-3 rounded-full text-xs font-bold transition-colors">
                      {filteredTasks.length}
                    </span>
                  </h2>
                  
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="relative flex-1 md:flex-none md:w-64">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input 
                        type="text"
                        placeholder="Buscar tarefa ou matéria..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 bg-slate-100 dark:bg-slate-700/50 border border-transparent focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-blue-500 rounded-xl outline-none transition-all text-sm"
                      />
                    </div>
                    <select 
                      value={filterPriority}
                      onChange={(e) => setFilterPriority(e.target.value as any)}
                      className="p-2 bg-slate-100 dark:bg-slate-700/50 border border-transparent rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none text-slate-600 dark:text-slate-300"
                    >
                      <option value="all">Todas Prioridades</option>
                      <option value="high">Alta</option>
                      <option value="medium">Média</option>
                      <option value="low">Baixa</option>
                    </select>
                    <select 
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as any)}
                      className="p-2 bg-slate-100 dark:bg-slate-700/50 border border-transparent rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none text-slate-600 dark:text-slate-300"
                    >
                      <option value="priority">Ordenar p/ Prioridade</option>
                      <option value="dueDate">Ordenar p/ Prazo</option>
                    </select>
                  </div>
                </div>
                
                {loading ? (
                  <div className="flex justify-center py-12">
                    <div className="animate-pulse flex space-x-2">
                      <div className="w-3 h-3 bg-blue-400 dark:bg-blue-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-blue-400 dark:bg-blue-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-blue-400 dark:bg-blue-500 rounded-full"></div>
                    </div>
                  </div>
                ) : filteredTasks.length > 0 ? (
                  <TaskBoard 
                    tasks={filteredTasks} 
                    onEdit={handleEdit} 
                    onDelete={handleDelete} 
                    onStatusChange={handleStatusChange}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center py-16 text-center bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-dashed border-slate-200 dark:border-slate-700 transition-colors">
                    <div className="bg-white dark:bg-slate-700 p-4 rounded-full shadow-sm mb-4 transition-colors">
                      <CalendarX2 className="w-8 h-8 text-blue-500 dark:text-blue-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200 mb-1 transition-colors">
                      {search || filterPriority !== "all" ? "Nenhum resultado encontrado" : "Nenhuma tarefa por aqui"}
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 max-w-sm transition-colors">
                      {search || filterPriority !== "all" 
                        ? "Tente ajustar seus filtros ou termos de busca para encontrar o que procura."
                        : "Você ainda não cadastrou nenhuma tarefa. Clique na aba acima para organizar seus estudos!"}
                    </p>
                    {(search || filterPriority !== "all") ? (
                      <button 
                        onClick={() => { setSearch(""); setFilterPriority("all"); }}
                        className="mt-6 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        Limpar filtros
                      </button>
                    ) : (
                      <button 
                        onClick={() => setActiveTab("create")}
                        className="mt-6 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:underline transition-all"
                      >
                        Criar primeira tarefa &rarr;
                      </button>
                    )}
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
