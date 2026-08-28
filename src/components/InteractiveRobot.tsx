import React, { useRef, useEffect, useState } from 'react';

export const InteractiveRobot: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [coreMode, setCoreMode] = useState<number>(0); // 0: Quantum Cyan, 1: Deep Violet, 2: Cyber Emerald
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Core visual modes
  const modes = [
    {
      name: 'QUANTUM.AI',
      primary: '#38bdf8', // Cyan/Sky blue
      secondary: '#2563eb',
      glow: 'rgba(56, 189, 248, 0.45)',
      ringColor: 'rgba(56, 189, 248, 0.25)',
      tagColor: 'text-cyan-400 border-cyan-500/30 bg-cyan-950/40',
      visorBg: 'from-cyan-950/80 via-slate-950 to-black',
    },
    {
      name: 'NEURAL.CORE',
      primary: '#a855f7', // Purple/Violet
      secondary: '#6366f1',
      glow: 'rgba(168, 85, 247, 0.45)',
      ringColor: 'rgba(168, 85, 247, 0.25)',
      tagColor: 'text-purple-400 border-purple-500/30 bg-purple-950/40',
      visorBg: 'from-purple-950/80 via-slate-950 to-black',
    },
    {
      name: 'CYBER.SENTINEL',
      primary: '#34d399', // Emerald/Matrix
      secondary: '#059669',
      glow: 'rgba(52, 211, 153, 0.45)',
      ringColor: 'rgba(52, 211, 153, 0.25)',
      tagColor: 'text-emerald-400 border-emerald-500/30 bg-emerald-950/40',
      visorBg: 'from-emerald-950/80 via-slate-950 to-black',
    },
  ];

  const currentMode = modes[coreMode];

  // Mouse tracking with smooth damping
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const rawX = (e.clientX - centerX) / (window.innerWidth / 2);
      const rawY = (e.clientY - centerY) / (window.innerHeight / 2);

      setMousePos({
        x: Math.max(-1, Math.min(1, rawX)),
        y: Math.max(-1, Math.min(1, rawY)),
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const rotateY = mousePos.x * 16;
  const rotateX = -mousePos.y * 14;
  const eyeShiftX = mousePos.x * 14;
  const eyeShiftY = mousePos.y * 10;

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setCoreMode((prev) => (prev + 1) % modes.length)}
      className="relative w-full max-w-[500px] h-[440px] sm:h-[500px] flex items-center justify-center select-none cursor-pointer group"
    >
      {/* 1. Deep Space Hologram Background Orbits & Matrix Grids */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* Soft Ambient Core Flare */}
        <div
          className="w-[360px] h-[360px] rounded-full blur-[90px] transition-all duration-700 opacity-60"
          style={{ backgroundColor: currentMode.glow }}
        />

        {/* Holographic Concentric Precision Rings */}
        <div className="absolute w-[360px] h-[360px] rounded-full border border-white/[0.06]" />
        
        <div
          className="absolute w-[310px] h-[310px] rounded-full border border-dashed animate-[spin_40s_linear_infinite]"
          style={{ borderColor: currentMode.ringColor }}
        />

        <div
          className="absolute w-[260px] h-[260px] rounded-full border border-dotted animate-[spin_28s_linear_infinite_reverse]"
          style={{ borderColor: currentMode.ringColor }}
        />

        {/* Crosshair coordinate markers */}
        <div className="absolute w-[400px] h-[1px] bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
        <div className="absolute h-[400px] w-[1px] bg-gradient-to-b from-transparent via-white/[0.08] to-transparent" />
      </div>

      {/* 2. Floating Cybernetic Robot Head Container */}
      <div
        className="relative z-10 flex flex-col items-center justify-center transition-transform duration-200 ease-out"
        style={{
          transform: `perspective(1000px) rotateY(${rotateY}deg) rotateX(${rotateX}deg) translateY(${isHovered ? '-12px' : '0px'})`,
        }}
      >
        {/* Top Floating Sensor Crest & Antenna Array */}
        <div className="relative flex flex-col items-center mb-[-12px] z-30">
          <div className="flex items-center gap-2">
            {/* Left satellite fin */}
            <div className="w-1.5 h-6 bg-gradient-to-t from-slate-600 to-slate-400 rounded-t-sm -rotate-12 border-t border-white/30" />
            
            {/* Center Main Crystal Spike with Laser Emission */}
            <div className="relative flex flex-col items-center">
              <div
                className="w-3 h-3 rounded-full border border-white/60 shadow-lg transition-colors duration-500 animate-pulse"
                style={{
                  backgroundColor: currentMode.primary,
                  boxShadow: `0 0 16px ${currentMode.primary}`,
                }}
              />
              <div className="w-1 h-5 bg-gradient-to-b from-slate-300 via-slate-500 to-slate-800" />
            </div>

            {/* Right satellite fin */}
            <div className="w-1.5 h-6 bg-gradient-to-t from-slate-600 to-slate-400 rounded-t-sm rotate-12 border-t border-white/30" />
          </div>
        </div>

        {/* Robot Cybernetic Helmet (Multi-layered Armor Plating) */}
        <div className="relative w-64 sm:w-72 h-52 sm:h-56 rounded-[38px] bg-gradient-to-b from-[#1a1f2c] via-[#0d121d] to-[#06080e] border border-white/20 shadow-[0_30px_70px_rgba(0,0,0,0.9),inset_0_2px_12px_rgba(255,255,255,0.18)] p-4 flex flex-col items-center justify-center overflow-hidden">
          
          {/* Carbon Fiber / High-tech Chamfered Edge Accents */}
          <div className="absolute top-0 inset-x-8 h-[2px] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          <div className="absolute top-2 left-4 text-[8px] font-mono-code text-gray-500 tracking-widest">
            HEX-09 // MK.IV
          </div>
          <div className="absolute top-2 right-4 text-[8px] font-mono-code text-gray-500 tracking-widest">
            NEURAL.LINK
          </div>

          {/* Left & Right Mechanical Temporal Nodes */}
          <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-4 h-16 rounded-l-lg bg-gradient-to-r from-slate-800 to-slate-900 border-l border-y border-white/20 flex flex-col items-center justify-around py-1.5 shadow-md">
            <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
            <div
              className="w-1 h-6 rounded-full transition-colors duration-500"
              style={{ backgroundColor: currentMode.primary, boxShadow: `0 0 8px ${currentMode.primary}` }}
            />
            <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
          </div>

          <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-4 h-16 rounded-r-lg bg-gradient-to-l from-slate-800 to-slate-900 border-r border-y border-white/20 flex flex-col items-center justify-around py-1.5 shadow-md">
            <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
            <div
              className="w-1 h-6 rounded-full transition-colors duration-500"
              style={{ backgroundColor: currentMode.primary, boxShadow: `0 0 8px ${currentMode.primary}` }}
            />
            <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
          </div>

          {/* Holographic Obsidian Visor Screen */}
          <div className={`relative w-full h-full rounded-[28px] bg-gradient-to-b ${currentMode.visorBg} border border-white/15 overflow-hidden flex flex-col items-center justify-center shadow-[inset_0_0_40px_rgba(0,0,0,0.95)]`}>
            
            {/* CRT / Sci-Fi Hologram Scanlines */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none opacity-60" />
            
            {/* Visor Specular Glass Reflection */}
            <div className="absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-white/[0.12] to-transparent pointer-events-none rounded-t-[28px]" />

            {/* Futuristic Optics / HUD Ocular System */}
            <div className="relative flex items-center gap-9 z-10">
              
              {/* Left High-Tech Ocular Lens */}
              <div className="relative w-16 h-12 rounded-xl bg-black/90 border border-white/20 flex items-center justify-center overflow-hidden shadow-[inset_0_0_15px_rgba(0,0,0,0.9)] group-hover:border-white/40 transition-all">
                {/* Optical Reticle Rings */}
                <div
                  className="absolute inset-1 rounded-lg border border-dashed animate-[spin_12s_linear_infinite]"
                  style={{ borderColor: currentMode.ringColor }}
                />
                
                {/* Interactive Dynamic Optical Core */}
                <div
                  className="relative w-8 h-8 rounded-lg flex items-center justify-center transition-transform duration-75"
                  style={{
                    transform: `translate(${eyeShiftX}px, ${eyeShiftY}px)`,
                  }}
                >
                  <div
                    className="w-5 h-5 rounded-md transition-colors duration-500 flex items-center justify-center"
                    style={{
                      backgroundColor: currentMode.primary,
                      boxShadow: `0 0 18px ${currentMode.primary}`,
                    }}
                  >
                    <div className="w-2 h-2 rounded-sm bg-white shadow-[0_0_6px_#fff]" />
                  </div>
                </div>
              </div>

              {/* Center HUD Bridge / Data Stream Bar */}
              <div className="flex flex-col items-center gap-0.5">
                <div className="w-2.5 h-0.5 bg-white/40" />
                <div
                  className="w-4 h-1 rounded-full transition-colors duration-500 animate-pulse"
                  style={{ backgroundColor: currentMode.primary }}
                />
                <div className="w-2.5 h-0.5 bg-white/40" />
              </div>

              {/* Right High-Tech Ocular Lens */}
              <div className="relative w-16 h-12 rounded-xl bg-black/90 border border-white/20 flex items-center justify-center overflow-hidden shadow-[inset_0_0_15px_rgba(0,0,0,0.9)] group-hover:border-white/40 transition-all">
                {/* Optical Reticle Rings */}
                <div
                  className="absolute inset-1 rounded-lg border border-dashed animate-[spin_12s_linear_infinite_reverse]"
                  style={{ borderColor: currentMode.ringColor }}
                />

                {/* Interactive Dynamic Optical Core */}
                <div
                  className="relative w-8 h-8 rounded-lg flex items-center justify-center transition-transform duration-75"
                  style={{
                    transform: `translate(${eyeShiftX}px, ${eyeShiftY}px)`,
                  }}
                >
                  <div
                    className="w-5 h-5 rounded-md transition-colors duration-500 flex items-center justify-center"
                    style={{
                      backgroundColor: currentMode.primary,
                      boxShadow: `0 0 18px ${currentMode.primary}`,
                    }}
                  >
                    <div className="w-2 h-2 rounded-sm bg-white shadow-[0_0_6px_#fff]" />
                  </div>
                </div>
              </div>

            </div>

            {/* Lower Cyber Audio Visualizer / Audio Waveform Grid */}
            <div className="mt-4 flex items-center gap-1.5 z-10">
              <div className="w-1.5 h-1.5 bg-white/30 rounded-sm" />
              <div className="w-1.5 h-3 bg-white/50 rounded-sm animate-pulse" />
              <div
                className="w-6 h-1 rounded-full transition-colors duration-500"
                style={{ backgroundColor: currentMode.primary, boxShadow: `0 0 8px ${currentMode.primary}` }}
              />
              <div className="w-1.5 h-3 bg-white/50 rounded-sm animate-pulse delay-75" />
              <div className="w-1.5 h-1.5 bg-white/30 rounded-sm" />
            </div>

          </div>
        </div>

        {/* Hydraulic Cervical Neck Pivot */}
        <div className="w-16 h-3.5 bg-gradient-to-r from-slate-800 via-slate-600 to-slate-800 rounded-b-md shadow-lg border-x border-b border-white/20 flex items-center justify-around px-2">
          <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
          <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
          <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
        </div>

        {/* Reinforced Exo-Torso Collar Plating */}
        <div className="w-52 sm:w-60 h-14 rounded-t-[32px] bg-gradient-to-b from-[#131722] to-[#07090e] border-t border-x border-white/20 shadow-2xl flex items-center justify-between px-6 relative overflow-hidden">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-ping" />
            <span className="text-[9px] font-mono-code text-gray-400 tracking-wider">SYNC // 100%</span>
          </div>

          <div
            className="w-12 h-1.5 rounded-full transition-colors duration-500"
            style={{ backgroundColor: currentMode.primary, boxShadow: `0 0 10px ${currentMode.primary}` }}
          />

          <span className="text-[9px] font-mono-code text-gray-400 tracking-wider">PORT // ACTIVE</span>
        </div>

      </div>

      {/* 3. Futuristic Floating HUD Status Chips */}
      <div className={`absolute top-2 right-2 px-3 py-1 rounded-full border text-[10px] font-mono-code backdrop-blur-md transition-colors duration-500 flex items-center gap-1.5 shadow-lg ${currentMode.tagColor}`}>
        <span className="w-1.5 h-1.5 rounded-full bg-current animate-ping" />
        <span>MODE // {currentMode.name}</span>
      </div>

      <div className="absolute bottom-2 left-2 px-3.5 py-1 rounded-full bg-black/70 border border-white/10 text-[10px] font-mono-code text-gray-400 backdrop-blur-md flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
        <span>点击切换能量模式</span>
      </div>
    </div>
  );
};
