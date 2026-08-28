import React from 'react';
import { CheckCircle2, Info } from 'lucide-react';

interface ToastProps {
  message: string;
  type?: 'success' | 'info';
  onClose?: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type = 'success' }) => {
  return (
    <div
      id="portfolio-toast"
      className="fixed bottom-8 right-8 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl bg-[#0f172a]/95 border border-cyan-500/30 text-white shadow-2xl backdrop-blur-md transition-all duration-300 animate-bounce-short"
      style={{
        boxShadow: '0 10px 30px -5px rgba(0, 240, 255, 0.25)',
      }}
    >
      {type === 'success' ? (
        <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 animate-pulse" />
      ) : (
        <Info className="w-5 h-5 text-cyan-400 shrink-0" />
      )}
      <span className="text-sm font-medium tracking-wide text-slate-100">{message}</span>
    </div>
  );
};
