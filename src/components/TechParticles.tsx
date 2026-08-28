import React, { useRef, useEffect, useState } from 'react';

export const TechParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [particleMode, setParticleMode] = useState<number>(0); // 0: Quantum Sphere, 1: Cyber Vortex, 2: Neural Wave
  const [isHovered, setIsHovered] = useState(false);

  const modeConfigs = [
    {
      name: 'QUANTUM.SPHERE',
      tag: '量子粒子球',
      themeColor: '#38bdf8', // Cyan
      secondaryColor: '#818cf8', // Indigo
      lineAlpha: 0.15,
      speed: 0.008,
      particleCount: 160,
    },
    {
      name: 'CYBER.VORTEX',
      tag: '赛博引力涡旋',
      themeColor: '#a855f7', // Purple
      secondaryColor: '#ec4899', // Pink
      lineAlpha: 0.18,
      speed: 0.012,
      particleCount: 180,
    },
    {
      name: 'NEURAL.MATRIX',
      tag: '神经律动波场',
      themeColor: '#34d399', // Emerald
      secondaryColor: '#06b6d4', // Cyan
      lineAlpha: 0.2,
      speed: 0.009,
      particleCount: 170,
    },
  ];

  const currentConfig = modeConfigs[particleMode];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;
    let targetRotX = 0;
    let targetRotY = 0;
    let rotX = 0;
    let rotY = 0;
    let mouseX = 0;
    let mouseY = 0;
    let isMouseOver = false;

    // Shockwave click pulses
    const shockwaves: { x: number; y: number; radius: number; maxRadius: number; alpha: number }[] = [];

    // Resize handler
    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Generate 3D Base Particles
    interface Particle3D {
      x: number;
      y: number;
      z: number;
      baseX: number;
      baseY: number;
      baseZ: number;
      size: number;
      colorOffset: number;
      speedOffset: number;
      vx: number;
      vy: number;
      vz: number;
    }

    const count = 180;
    const particles: Particle3D[] = [];

    for (let i = 0; i < count; i++) {
      // Golden Spiral distribution on sphere surface + inner orbital cloud
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      const radius = 110 + (i % 5 === 0 ? Math.random() * 40 : 0);

      const px = radius * Math.cos(theta) * Math.sin(phi);
      const py = radius * Math.sin(theta) * Math.sin(phi);
      const pz = radius * Math.cos(phi);

      particles.push({
        x: px,
        y: py,
        z: pz,
        baseX: px,
        baseY: py,
        baseZ: pz,
        size: Math.random() * 2 + 1.2,
        colorOffset: Math.random(),
        speedOffset: Math.random() * 0.02 + 0.01,
        vx: 0,
        vy: 0,
        vz: 0,
      });
    }

    // Mouse listener
    const onMouseMove = (e: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left - rect.width / 2;
      mouseY = e.clientY - rect.top - rect.height / 2;
      targetRotY = (mouseX / (rect.width / 2)) * 0.6;
      targetRotX = -(mouseY / (rect.height / 2)) * 0.6;
      isMouseOver = true;
    };

    const onMouseLeave = () => {
      isMouseOver = false;
      targetRotX = 0;
      targetRotY = 0;
    };

    const onClickCanvas = (e: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      shockwaves.push({
        x: clickX,
        y: clickY,
        radius: 10,
        maxRadius: 180,
        alpha: 0.8,
      });
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', onMouseMove);
      container.addEventListener('mouseleave', onMouseLeave);
      container.addEventListener('click', onClickCanvas);
    }

    // Render loop
    const render = () => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const centerX = width / 2;
      const centerY = height / 2;

      ctx.clearRect(0, 0, width, height);

      time += currentConfig.speed;

      // Smooth rotation damping
      rotX += (targetRotX - rotX) * 0.05;
      rotY += (targetRotY - rotY) * 0.05;

      const totalRotY = time + rotY;
      const totalRotX = Math.sin(time * 0.5) * 0.2 + rotX;

      const cosY = Math.cos(totalRotY);
      const sinY = Math.sin(totalRotY);
      const cosX = Math.cos(totalRotX);
      const sinX = Math.sin(totalRotX);

      // 1. Ambient Background Core Aura
      const coreRadius = 140;
      const auraGrad = ctx.createRadialGradient(centerX, centerY, 10, centerX, centerY, coreRadius);
      auraGrad.addColorStop(0, `${currentConfig.themeColor}33`);
      auraGrad.addColorStop(0.5, `${currentConfig.secondaryColor}11`);
      auraGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = auraGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Transform and project 3D particles
      const projectedList: {
        px: number;
        py: number;
        pz: number;
        size: number;
        alpha: number;
        color: string;
      }[] = [];

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Mode specific mathematical deformations
        let curX = p.baseX;
        let curY = p.baseY;
        let curZ = p.baseZ;

        if (particleMode === 0) {
          // Quantum Sphere harmonic breathing
          const wave = Math.sin(time * 3 + p.colorOffset * 10) * 12;
          const factor = 1 + wave / 110;
          curX *= factor;
          curY *= factor;
          curZ *= factor;
        } else if (particleMode === 1) {
          // Cyber Vortex twist
          const dist = Math.sqrt(p.baseX * p.baseX + p.baseZ * p.baseZ);
          const twistAngle = (dist * 0.02) - time * 2;
          const cosT = Math.cos(twistAngle);
          const sinT = Math.sin(twistAngle);
          curX = p.baseX * cosT - p.baseZ * sinT;
          curZ = p.baseX * sinT + p.baseZ * cosT;
          curY = p.baseY + Math.sin(dist * 0.05 + time * 3) * 20;
        } else {
          // Neural Matrix undulating wave surface
          curY = p.baseY + Math.sin(p.baseX * 0.04 + time * 2) * 25 + Math.cos(p.baseZ * 0.04 + time * 2) * 20;
        }

        // 3D Y-Axis Rotation
        const x1 = curX * cosY + curZ * sinY;
        const z1 = -curX * sinY + curZ * cosY;

        // 3D X-Axis Rotation
        const y2 = curY * cosX - z1 * sinX;
        const z2 = curY * sinX + z1 * cosX;

        // Perspective projection (FOV)
        const fov = 340;
        const scale = fov / (fov + z2 + 80);
        const px = centerX + x1 * scale;
        const py = centerY + y2 * scale;

        const depthAlpha = Math.max(0.12, Math.min(1, (z2 + 180) / 300));
        const color = p.colorOffset > 0.45 ? currentConfig.themeColor : currentConfig.secondaryColor;

        projectedList.push({
          px,
          py,
          pz: z2,
          size: Math.max(0.8, p.size * scale),
          alpha: depthAlpha,
          color,
        });
      }

      // Sort by depth (painters algorithm)
      projectedList.sort((a, b) => a.pz - b.pz);

      // 3. Draw Connecting Neural Constellation Lines
      const maxConnectDistance = 58;
      ctx.lineWidth = 0.8;

      for (let i = 0; i < projectedList.length; i++) {
        const p1 = projectedList[i];
        if (p1.pz < -100) continue; // skip deeply hidden lines

        for (let j = i + 1; j < projectedList.length; j++) {
          const p2 = projectedList[j];
          const dx = p1.px - p2.px;
          const dy = p1.py - p2.py;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxConnectDistance) {
            const lineAlpha = (1 - dist / maxConnectDistance) * currentConfig.lineAlpha * ((p1.alpha + p2.alpha) / 2);
            ctx.strokeStyle = p1.color;
            ctx.globalAlpha = lineAlpha;
            ctx.beginPath();
            ctx.moveTo(p1.px, p1.py);
            ctx.lineTo(p2.px, p2.py);
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 1;

      // 4. Render Glowing Particle Nodes
      for (let i = 0; i < projectedList.length; i++) {
        const p = projectedList[i];
        
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.px, p.py, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;

        // Front glowing particles get a bloom shadow
        if (p.pz > 0) {
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 8;
        }

        ctx.fill();

        // Extra white specular spark for the most foreground particles
        if (p.pz > 60 && p.size > 1.8) {
          ctx.beginPath();
          ctx.arc(p.px - 0.5, p.py - 0.5, p.size * 0.4, 0, Math.PI * 2);
          ctx.fillStyle = '#ffffff';
          ctx.fill();
        }

        ctx.restore();
      }

      // 5. Draw Sci-Fi Circular Orbital HUD Rings
      ctx.save();
      ctx.translate(centerX, centerY);

      // Ring 1
      ctx.beginPath();
      ctx.ellipse(0, 0, 160, 60, totalRotY * 0.4, 0, Math.PI * 2);
      ctx.strokeStyle = `${currentConfig.themeColor}33`;
      ctx.lineWidth = 1;
      ctx.setLineDash([6, 8]);
      ctx.stroke();

      // Ring 2
      ctx.beginPath();
      ctx.ellipse(0, 0, 190, 80, -totalRotY * 0.3, 0, Math.PI * 2);
      ctx.strokeStyle = `${currentConfig.secondaryColor}22`;
      ctx.lineWidth = 1;
      ctx.setLineDash([12, 12]);
      ctx.stroke();

      ctx.restore();

      // 6. Draw Shockwaves
      for (let i = shockwaves.length - 1; i >= 0; i--) {
        const sw = shockwaves[i];
        sw.radius += 4.5;
        sw.alpha *= 0.94;

        ctx.save();
        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
        ctx.strokeStyle = currentConfig.themeColor;
        ctx.globalAlpha = sw.alpha;
        ctx.lineWidth = 2;
        ctx.shadowColor = currentConfig.themeColor;
        ctx.shadowBlur = 10;
        ctx.stroke();
        ctx.restore();

        if (sw.alpha < 0.02 || sw.radius > sw.maxRadius) {
          shockwaves.splice(i, 1);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (container) {
        container.removeEventListener('mousemove', onMouseMove);
        container.removeEventListener('mouseleave', onMouseLeave);
        container.removeEventListener('click', onClickCanvas);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, [particleMode, currentConfig]);

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setParticleMode((prev) => (prev + 1) % modeConfigs.length)}
      className="relative w-full max-w-[520px] h-[440px] sm:h-[500px] flex items-center justify-center select-none cursor-pointer group"
      title="点击切换粒子形态"
    >
      {/* Dynamic Background Glow */}
      <div
        className="absolute inset-0 rounded-full blur-[100px] pointer-events-none transition-all duration-700 opacity-40 group-hover:opacity-70"
        style={{
          background: `radial-gradient(circle, ${currentConfig.themeColor} 0%, ${currentConfig.secondaryColor} 40%, transparent 70%)`,
        }}
      />

      {/* Main 3D Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="relative z-10 w-full h-full object-contain pointer-events-none drop-shadow-[0_0_40px_rgba(56,189,248,0.25)]"
      />

      {/* Sci-Fi Top Right Status Badge */}
      <div className="absolute top-2 right-2 px-3 py-1 rounded-full bg-[#090d16]/80 border border-white/15 text-[10px] font-mono-code text-cyan-300 backdrop-blur-md shadow-lg flex items-center gap-2">
        <span
          className="w-1.5 h-1.5 rounded-full animate-ping"
          style={{ backgroundColor: currentConfig.themeColor }}
        />
        <span className="text-gray-300">FIELD // </span>
        <span className="font-semibold text-white">{currentConfig.name}</span>
      </div>

      {/* Bottom Left Interactive Tip */}
      <div className="absolute bottom-2 left-2 px-3.5 py-1 rounded-full bg-[#090d16]/80 border border-white/10 text-[10px] font-mono-code text-gray-400 backdrop-blur-md flex items-center gap-2 group-hover:text-white transition-colors">
        <span
          className="w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: currentConfig.themeColor }}
        />
        <span>点击切换粒子流形态 ({particleMode + 1}/3)</span>
      </div>
    </div>
  );
};
