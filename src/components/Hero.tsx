import React from 'react';

interface HeroProps {
  onOpenResume?: () => void;
  onShowToast?: (msg: string) => void;
}

export const Hero: React.FC<HeroProps> = () => {
  return (
    <section
      id="hero"
      className="relative min-h-[85vh] sm:min-h-screen w-full flex items-center justify-center bg-[#06080e] text-[#f1f5f9] overflow-hidden selection:bg-blue-600/30 selection:text-white px-6 sm:px-12"
    >
      {/* Subtle Atmospheric Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[800px] h-[400px] bg-blue-600/[0.05] rounded-full blur-[160px]" />
      </div>

      {/* Pure Centered Typography */}
      <div className="relative z-10 text-center space-y-6 max-w-4xl mx-auto px-4">
        {/* Subtle English Eyebrow */}
        <div className="text-xs sm:text-sm font-mono-code tracking-[0.35em] text-blue-400/80 uppercase font-medium">
          PORTFOLIO
        </div>

        {/* Main Prominent Centered Title */}
        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[96px] font-black text-white tracking-[-0.03em] font-display leading-tight select-none">
          个人作品集
        </h1>

        {/* Minimal Subtle Accent Line */}
        <div className="w-12 h-[2px] bg-blue-500/40 mx-auto rounded-full" />
      </div>
    </section>
  );
};
