import React, { useEffect, useRef } from 'react';

export const DigitalGlobe: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 500);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 500);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    // Globe 3D Points
    const radius = Math.min(width, height) * 0.42;
    const points: { x: number; y: number; z: number }[] = [];
    const totalPoints = 320;

    for (let i = 0; i < totalPoints; i++) {
      const phi = Math.acos(-1 + (2 * i) / totalPoints);
      const theta = Math.sqrt(totalPoints * Math.PI) * phi;

      points.push({
        x: radius * Math.cos(theta) * Math.sin(phi),
        y: radius * Math.sin(theta) * Math.sin(phi),
        z: radius * Math.cos(phi),
      });
    }

    let rotY = 0;
    let rotX = 0.2;
    let targetRotY = 0;
    let mouseX = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      mouseX = x;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      rotY += 0.006 + mouseX * 0.005;
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      // Draw faint outer glow
      const grad = ctx.createRadialGradient(cx, cy, radius * 0.2, cx, cy, radius * 1.3);
      grad.addColorStop(0, 'rgba(37, 99, 235, 0.15)');
      grad.addColorStop(0.6, 'rgba(59, 130, 246, 0.05)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Draw latitude / longitude wireframe rings
      const rings = 5;
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.12)';
      ctx.lineWidth = 1;

      for (let r = 1; r <= rings; r++) {
        const ringRad = radius * Math.sin((r / (rings + 1)) * Math.PI);
        const ringY = radius * Math.cos((r / (rings + 1)) * Math.PI);

        // Project ring
        ctx.beginPath();
        for (let a = 0; a <= Math.PI * 2; a += 0.1) {
          const rx = ringRad * Math.cos(a);
          const rz = ringRad * Math.sin(a);

          // Rotate Y
          const x1 = rx * Math.cos(rotY) - rz * Math.sin(rotY);
          const z1 = rx * Math.sin(rotY) + rz * Math.cos(rotY);

          // Rotate X
          const y2 = ringY * Math.cos(rotX) - z1 * Math.sin(rotX);
          const z2 = ringY * Math.sin(rotX) + z1 * Math.cos(rotX);

          // Perspective scale
          const scale = 350 / (350 + z2);
          const px = cx + x1 * scale;
          const py = cy + y2 * scale;

          if (a === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.stroke();
      }

      // Draw Points
      for (let i = 0; i < points.length; i++) {
        const p = points[i];

        // Rotate Y
        const x1 = p.x * Math.cos(rotY) - p.z * Math.sin(rotY);
        const z1 = p.x * Math.sin(rotY) + p.z * Math.cos(rotY);

        // Rotate X
        const y2 = p.y * Math.cos(rotX) - z1 * Math.sin(rotX);
        const z2 = p.y * Math.sin(rotX) + z1 * Math.cos(rotX);

        if (z2 > -radius * 0.9) {
          const scale = 350 / (350 + z2);
          const px = cx + x1 * scale;
          const py = cy + y2 * scale;

          const alpha = (z2 + radius) / (2 * radius);
          const size = Math.max(0.8, (z2 + radius) / (radius * 0.8) * 1.6);

          ctx.beginPath();
          ctx.arc(px, py, size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(96, 165, 250, ${Math.min(1, alpha * 0.9)})`;
          ctx.fill();

          // Connect nearby dots
          if (i % 3 === 0 && alpha > 0.4) {
            ctx.shadowBlur = 8;
            ctx.shadowColor = 'rgba(59, 130, 246, 0.8)';
            ctx.fill();
            ctx.shadowBlur = 0;
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-[380px] flex items-center justify-center pointer-events-none">
      <canvas ref={canvasRef} className="w-full h-full max-w-[550px] max-h-[550px]" />
    </div>
  );
};
