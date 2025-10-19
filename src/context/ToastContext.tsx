import React, { createContext, useContext, useState, ReactNode } from "react";

type ToastType = "success" | "danger" | "info" | "warning";

type ToastContextType = {
  showToast: (message: string, type?: ToastType) => void;
};

const ToastContext = createContext<ToastContextType | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);

  function showToast(message: string, type: ToastType = "success") {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }

  // Map toast types to Tailwind classes
  const typeClasses: Record<ToastType, string> = {
    success: "bg-green-500",
    danger: "bg-red-500",
    info: "bg-blue-500",
    warning: "bg-yellow-500",
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {toast && (
        <div className="fixed top-5 right-5 z-50">
          <div
            className={`flex items-center justify-between max-w-sm w-full px-4 py-3 rounded shadow-md text-white ${typeClasses[toast.type]}`}
          >
            <div>{toast.message}</div>
            <button
              onClick={() => setToast(null)}
              className="ml-4 text-white font-bold hover:text-gray-200"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used inside ToastProvider");
  return context;
}
