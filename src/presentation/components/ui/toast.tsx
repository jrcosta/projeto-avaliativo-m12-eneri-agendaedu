"use client";

import { useEffect } from "react";
import { X, CheckCircle, AlertCircle, Info } from "lucide-react";

export type ToastType = "success" | "error" | "info";

type ToastProps = {
  message: string;
  type: ToastType;
  onClose: () => void;
};

export function Toast({ message, type, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const styles = {
    success: "bg-green-50 border-green-200 text-green-800 dark:bg-green-900/30 dark:border-green-800 dark:text-green-300",
    error: "bg-red-50 border-red-200 text-red-800 dark:bg-red-900/30 dark:border-red-800 dark:text-red-300",
    info: "bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300",
  };

  const icons = {
    success: CheckCircle,
    error: AlertCircle,
    info: Info,
  };

  const Icon = icons[type];

  return (
    <div className={`fixed bottom-4 right-4 flex items-center gap-3 p-4 rounded-2xl border shadow-lg animate-in slide-in-from-right-full duration-300 z-50 ${styles[type]}`}>
      <Icon className="w-5 h-5 flex-shrink-0" />
      <p className="text-sm font-medium pr-4">{message}</p>
      <button onClick={onClose} className="p-1 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-colors">
        <X className="w-4 h-4 opacity-50" />
      </button>
    </div>
  );
}
