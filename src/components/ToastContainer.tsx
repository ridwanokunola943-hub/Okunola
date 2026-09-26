import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div
      id="bigridz-toasts"
      className="fixed bottom-20 md:bottom-6 right-4 left-4 md:left-auto md:max-w-sm z-50 flex flex-col gap-2 pointer-events-none"
    >
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isError = toast.type === 'error';
        const isWarning = toast.type === 'warning';

        return (
          <div
            key={toast.id}
            className="pointer-events-auto flex items-center justify-between p-3 rounded-lg bg-[#141416] border border-[#29292D] shadow-xl backdrop-blur-xs transition-all animate-in slide-in-from-bottom-2 duration-150"
          >
            <div className="flex items-center gap-2 text-xs">
              {isSuccess && <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />}
              {isError && <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />}
              {isWarning && <AlertCircle className="w-4 h-4 text-[#D99A24] shrink-0" />}
              {!isSuccess && !isError && !isWarning && (
                <Info className="w-4 h-4 text-[#A1A1AA] shrink-0" />
              )}
              <span className="text-[#F5F5F5] font-medium leading-tight">{toast.message}</span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="p-1 text-[#A1A1AA] hover:text-[#F5F5F5] rounded transition-colors ml-2"
              aria-label="Dismiss toast"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
