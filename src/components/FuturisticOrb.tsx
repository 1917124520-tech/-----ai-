import React, { useRef, useEffect } from 'react';

export const FuturisticOrb: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let angleX = 0;
    let angleY = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    // Create 3D points for an Icosahedron / Geodesic Sphere + Core Rings
    const rings = 4;
    const segments = 24;
    const nodes: { x: number; y: number; z: number; size: number; alpha: number }[] = [];

    // Core central nodes
    for (let r = 0; r < rings; r++) {
      const radius = 100 + r * 28;
      const inclination = (Math.PI / (rings + 1)) * (r + 1);
      for (let s = 0; s < segments; s++) {
        const azimuth = (Math.PI * 2 / segments) * s;
        nodes.push({
          x: radius * Math.sin(inclination) * Math.cos(azimuth),
          y: radius * Math.cos(inclination) - 20,
          z: radius * Math.sin(inclination) * Math.sin(azimuth),
          size: r === 0 ? 3 : 2,
          alpha: 0.3 + (r / rings) * 0.5,
        });
      }
    }

    // Outer orbiting particles
    const particles: { x: number; y: number; z: number; speed: number; radius: number; phi: number }[] = [];
    for (let i = 0; i < 40; i++) {
      particles.push({
        x: 0,
        y: 0,
        z: 0,
        radius: 170 + Math.random() * 60,
        phi: Math.random() * Math.PI * 2,
        speed: (Math.random() * 0.01 + 0.005) * (Math.random() > 0.5 ? 1 : -1),
      });
    }

    const render = () => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const centerX = width / 2;
      const centerY = height / 2;

      ctx.clearRect(0, 0, width, height);

      angleX += 0.006;
      angleY += 0.009;

      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);

      // 1. Draw glowing background radial aura
      const radial = ctx.createRadialGradient(centerX, centerY, 10, centerX, centerY, 220);
      radial.addColorStop(0, 'rgba(59, 130, 246, 0.18)');
      radial.addColorStop(0.5, 'rgba(99, 102, 241, 0.06)');
      radial.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = radial;
      ctx.fillRect(0, 0, width, height);

      // 2. Draw core inner glowing energy reactor
      ctx.save();
      ctx.beginPath();
      ctx.arc(centerX, centerY, 52, 0, Math.PI * 2);
      const coreGrad = ctx.createRadialGradient(centerX - 10, centerY - 10, 5, centerX, centerY, 52);
      coreGrad.addColorStop(0, '#ffffff');
      coreGrad.addColorStop(0.2, '#60a5fa');
      coreGrad.addColorStop(0.6, '#1e3a8a');
      coreGrad.addColorStop(1, 'rgba(15, 23, 42, 0.8)');
      ctx.fillStyle = coreGrad;
      ctx.shadowColor = '#3b82f6';
      ctx.shadowBlur = 30;
      ctx.fill();
      ctx.restore();

      // 3. Project and draw connecting wireframe lines
      const projectedNodes = nodes.map((node) => {
        // Rotate Y
        const x1 = node.x * cosY + node.z * sinY;
        const z1 = -node.x * sinY + node.z * cosY;

        // Rotate X
        const y2 = node.y * cosX - z1 * sinX;
        const z2 = node.y * sinX + z1 * cosX;

        // Perspective projection
        const fov = 400;
        const scale = fov / (fov + z2);
        return {
          px: centerX + x1 * scale,
          py: centerY + y2 * scale,
          scale,
          z: z2,
          alpha: node.alpha,
          size: node.size,
        };
      });

      // Draw latitude / longitude connections
      ctx.strokeStyle = 'rgba(96, 165, 250, 0.16)';
      ctx.lineWidth = 1;
      ctx.beginPath();

      for (let i = 0; i < projectedNodes.length; i++) {
        const n1 = projectedNodes[i];
        // Connect to neighbor in same ring
        const nextInRing = (i % segments === segments - 1) ? i - (segments - 1) : i + 1;
        const n2 = projectedNodes[nextInRing];
        
        ctx.moveTo(n1.px, n1.py);
        ctx.lineTo(n2.px, n2.py);

        // Connect to next ring
        if (i + segments < projectedNodes.length) {
          const n3 = projectedNodes[i + segments];
          ctx.moveTo(n1.px, n1.py);
          ctx.lineTo(n3.px, n3.py);
        }
      }
      ctx.stroke();

      // 4. Draw node dots
      projectedNodes.forEach((node) => {
        if (node.z < -180) return; // depth clipping
        const dotAlpha = Math.max(0.1, (node.z + 200) / 400);
        ctx.fillStyle = node.z > 0 ? `rgba(255, 255, 255, ${dotAlpha * 0.9})` : `rgba(59, 130, 246, ${dotAlpha * 0.6})`;
        ctx.beginPath();
        ctx.arc(node.px, node.py, node.size * node.scale, 0, Math.PI * 2);
        ctx.fill();
      });

      // 5. Outer glowing orbital ellipses
      const drawOrbitRing = (tiltX: number, tiltY: number, radiusX: number, radiusY: number, color: string, speedMult: number) => {
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(angleY * speedMult);
        ctx.beginPath();
        ctx.ellipse(0, 0, radiusX, radiusY, tiltX, 0, Math.PI * 2);
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.2;
        ctx.shadowColor = '#60a5fa';
        ctx.shadowBlur = 12;
        ctx.stroke();
        ctx.restore();
      };

      drawOrbitRing(0.4, 0, 185, 80, 'rgba(147, 197, 253, 0.45)', 0.5);
      drawOrbitRing(-0.6, 0, 210, 95, 'rgba(59, 130, 246, 0.35)', -0.4);
      drawOrbitRing(1.1, 0, 230, 65, 'rgba(99, 102, 241, 0.25)', 0.3);

      // 6. Floating orbital spark particles
      particles.forEach((p) => {
        p.phi += p.speed;
        const px = p.radius * Math.cos(p.phi);
        const pz = p.radius * Math.sin(p.phi);
        const py = Math.sin(p.phi * 2) * 35;

        // Apply global rotation
        const rx = px * cosY + pz * sinY;
        const rz = -px * sinY + pz * cosY;
        const ry = py * cosX - rz * sinX;
        const fz = py * sinX + rz * cosX;

        const fov = 400;
        const scale = fov / (fov + fz);
        const screenX = centerX + rx * scale;
        const screenY = centerY + ry * scale;

        ctx.fillStyle = 'rgba(224, 242, 254, 0.85)';
        ctx.shadowColor = '#93c5fd';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(screenX, screenY, 1.8 * scale, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative w-full max-w-[480px] h-[380px] sm:h-[460px] flex items-center justify-center">
      <canvas
        ref={canvasRef}
        className="w-full h-full object-contain filter drop-shadow-[0_0_50px_rgba(59,130,246,0.3)] pointer-events-none"
      />
      
      {/* Floating UI HUD elements around the model */}
      <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-blue-950/40 border border-blue-500/20 text-[10px] font-mono-code text-blue-300 backdrop-blur-md">
        SYS.MODEL // GEODESIC.3D
      </div>
      <div className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-black/50 border border-white/10 text-[10px] font-mono-code text-gray-400 backdrop-blur-md flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span>STATUS // ONLINE</span>
      </div>
    </div>
  );
};
