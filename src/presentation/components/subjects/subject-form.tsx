"use client";

import { useEffect, useState } from "react";
import { AlertCircle, BookOpen, Loader2, Plus, Trash2 } from "lucide-react";
import type { Subject } from "../../../domain/subjects/subject";

type SubjectFormProps = {
  onSubjectsChange?: () => void;
};

export function SubjectForm({ onSubjectsChange }: SubjectFormProps) {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);

  const fetchSubjects = async () => {
    try {
      const response = await fetch("/api/subjects", { cache: "no-store" });
      const data = await response.json();
      setSubjects(data.subjects || []);
    } catch {
      setError("Erro ao carregar matérias.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSaving(true);

    try {
      const response = await fetch("/api/subjects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      if (response.ok) {
        setName("");
        await fetchSubjects();
        onSubjectsChange?.();
      } else {
        const result = await response.json();
        setError(result.errors?.join(", ") || "Erro ao cadastrar matéria.");
      }
    } catch {
      setError("Erro de conexão ao cadastrar matéria.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      const response = await fetch(`/api/subjects/${id}`, { method: "DELETE" });
      if (response.ok) {
        await fetchSubjects();
        onSubjectsChange?.();
      } else {
        setError("Erro ao excluir matéria.");
      }
    } catch {
      setError("Erro de conexão ao excluir matéria.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-900/30 border-l-4 border-red-500 text-red-700 dark:text-red-400 rounded-r-md text-sm font-medium flex items-start">
          <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex gap-3">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          maxLength={100}
          placeholder="Ex: Matemática, Física, Português..."
          className="flex-1 p-3 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-slate-700 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500"
        />
        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 disabled:bg-blue-300 dark:disabled:bg-blue-800/50 text-white font-bold py-3 px-5 rounded-xl transition-all shadow-sm hover:shadow"
        >
          {saving ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Plus className="w-5 h-5" />
          )}
          Adicionar
        </button>
      </form>

      <div>
        <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
          Matérias Cadastradas
          <span className="ml-2 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400 py-0.5 px-2 rounded-full text-xs font-bold">
            {subjects.length}
          </span>
        </h3>

        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-pulse flex space-x-2">
              <div className="w-2.5 h-2.5 bg-blue-400 rounded-full"></div>
              <div className="w-2.5 h-2.5 bg-blue-400 rounded-full"></div>
              <div className="w-2.5 h-2.5 bg-blue-400 rounded-full"></div>
            </div>
          </div>
        ) : subjects.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-dashed border-slate-200 dark:border-slate-700">
            <BookOpen className="w-8 h-8 text-slate-400 dark:text-slate-500 mb-2" />
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              Nenhuma matéria cadastrada ainda. Adicione a primeira acima!
            </p>
          </div>
        ) : (
          <ul className="space-y-2">
            {subjects.map((subject) => (
              <li
                key={subject.id}
                className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700/40 border border-slate-200 dark:border-slate-600 rounded-xl transition-colors group"
              >
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-100 font-medium">
                  <BookOpen className="w-4 h-4 text-blue-500 dark:text-blue-400 shrink-0" />
                  {subject.name}
                </div>
                <button
                  onClick={() => handleDelete(subject.id)}
                  disabled={deletingId === subject.id}
                  aria-label={`Excluir ${subject.name}`}
                  className="p-1.5 text-slate-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all disabled:opacity-50"
                >
                  {deletingId === subject.id ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Trash2 className="w-4 h-4" />
                  )}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
