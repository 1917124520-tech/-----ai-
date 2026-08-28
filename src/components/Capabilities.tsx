import React from 'react';
import { ADVANTAGES_DATA_6 } from '../data/portfolioData';

interface CapabilitiesProps {
  onOpenResume: () => void;
  onShowToast: (msg: string) => void;
}

export const Capabilities: React.FC<CapabilitiesProps> = ({ onOpenResume, onShowToast }) => {
  // Render custom neon futuristic icons matching the reference image
  const renderIcon = (type: string) => {
    switch (type) {
      case 'user':
        // User profile silhouette with soundwaves/thinking lines
        return (
          <svg className="w-12 h-12 text-blue-500 stroke-current" fill="none" viewBox="0 0 48 48" strokeWidth="1.5">
            <path d="M24 10a6 6 0 100 12 6 6 0 000-12z" />
            <path d="M12 36c0-6 5.373-10 12-10s12 4 12 10" />
            <path d="M38 18c2 2 2 6 0 8" strokeLinecap="round" opacity="0.6" />
            <path d="M42 15c3 4 3 12 0 16" strokeLinecap="round" opacity="0.4" />
          </svg>
        );
      case 'target':
        // Concentric circular target with crosshairs
        return (
          <svg className="w-12 h-12 text-blue-500 stroke-current" fill="none" viewBox="0 0 48 48" strokeWidth="1.5">
            <circle cx="24" cy="24" r="16" strokeOpacity="0.4" />
            <circle cx="24" cy="24" r="10" strokeOpacity="0.7" />
            <circle cx="24" cy="24" r="4" />
            <path d="M24 4v6M24 38v6M4 24h6M38 24h6" strokeLinecap="round" />
          </svg>
        );
      case 'code':
        // </> Code symbol with modern geometric cut
        return (
          <svg className="w-12 h-12 text-blue-500 stroke-current" fill="none" viewBox="0 0 48 48" strokeWidth="1.5">
            <path d="M16 16l-8 8 8 8M32 16l8 8-8 8M27 12l-6 24" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
      case 'chart':
        // Bar charts / data visualization pillars
        return (
          <svg className="w-12 h-12 text-blue-500 stroke-current" fill="none" viewBox="0 0 48 48" strokeWidth="1.5">
            <rect x="8" y="24" width="6" height="16" rx="1" />
            <rect x="18" y="16" width="6" height="24" rx="1" />
            <rect x="28" y="8" width="6" height="32" rx="1" />
            <rect x="38" y="20" width="6" height="20" rx="1" strokeOpacity="0.4" />
          </svg>
        );
      case 'orbit':
        // Circular orbit / continuous dynamic motion
        return (
          <svg className="w-12 h-12 text-blue-500 stroke-current" fill="none" viewBox="0 0 48 48" strokeWidth="1.5">
            <circle cx="24" cy="24" r="14" strokeDasharray="4 4" strokeOpacity="0.5" />
            <circle cx="36" cy="18" r="3" fill="currentColor" />
            <circle cx="14" cy="30" r="2" fill="currentColor" opacity="0.7" />
            <path d="M20 24a4 4 0 108 0 4 4 0 00-8 0z" />
          </svg>
        );
      case 'team':
        // Team / collaborative community nodes
        return (
          <svg className="w-12 h-12 text-blue-500 stroke-current" fill="none" viewBox="0 0 48 48" strokeWidth="1.5">
            <circle cx="24" cy="14" r="5" />
            <path d="M14 34c0-5 4.477-8 10-8s10 3 10 8" />
            <circle cx="37" cy="18" r="3.5" strokeOpacity="0.6" />
            <path d="M35 34c0-3 2.5-5 6-5" strokeOpacity="0.6" />
            <circle cx="11" cy="18" r="3.5" strokeOpacity="0.6" />
            <path d="M13 34c0-3-2.5-5-6-5" strokeOpacity="0.6" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <section
      id="advantages"
      className="relative py-24 bg-[#06080e] border-t border-white/[0.06] overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-blue-600/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-[1600px] mx-auto px-6 sm:px-12 lg:px-16">
        
        {/* Section Header */}
        <div className="space-y-3 mb-14 max-w-2xl">
          <span className="text-xs font-mono-code text-blue-400 uppercase tracking-widest font-semibold">
            MY ADVANTAGES // 核心优势
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display text-depth-sub">
            我的优势
          </h2>
          <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-normal">
            跨领域的综合能力结构，让我能在视觉创意、后期动效与工程落地交付中找到最佳平衡。
          </p>
        </div>

        {/* 2x3 Grid of 6 Advantage Cards matching reference */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ADVANTAGES_DATA_6.map((item) => (
            <div
              key={item.id}
              id={`advantage-card-${item.id}`}
              className="p-8 rounded-2xl ref-card flex items-start justify-between gap-6 hover:border-blue-500/40 group transition-all"
            >
              <div className="space-y-3 flex-1">
                <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Futuristic Neon Outline Icon on Right */}
              <div className="shrink-0 group-hover:scale-110 group-hover:drop-shadow-[0_0_12px_rgba(59,130,246,0.6)] transition-all duration-300">
                {renderIcon(item.iconType)}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
