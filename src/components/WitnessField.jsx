// src/components/WitnessField.jsx
import React, { useRef, useEffect } from "react";

function WitnessField({ canvasHeight = 260, particleCount = 70 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let animationFrameId;
    let particles = [];

    const resize = () => {
      const parent = canvas.parentElement;
      width = parent?.clientWidth || window.innerWidth;
      height = canvasHeight;

      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const createParticles = () => {
      particles = Array.from({ length: particleCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: 1 + Math.random() * 1.5,
        phase: Math.random() * Math.PI * 2,
      }));
    };

    const draw = (time) => {
      if (!width || !height) {
        animationFrameId = requestAnimationFrame(draw);
        return;
      }

      // Background
      const bg = ctx.createLinearGradient(0, 0, width, height);
      bg.addColorStop(0, "#050714");
      bg.addColorStop(1, "#050915");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, width, height);

      // Subtle central glow
      const cx = width / 2;
      const cy = height / 2;
      const hue = (time * 0.02) % 360;
      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(width, height));
      glow.addColorStop(0, `hsla(${hue}, 80%, 65%, 0.35)`);
      glow.addColorStop(0.4, "rgba(0, 0, 0, 0)");
      glow.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);

      // Particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges
        if (p.x < 0) p.x += width;
        if (p.x > width) p.x -= width;
        if (p.y < 0) p.y += height;
        if (p.y > height) p.y -= height;

        p.phase += 0.02;
        const alpha = 0.3 + 0.3 * Math.sin(p.phase);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${hue}, 80%, 70%, ${alpha})`;
        ctx.fill();
      });

      // Connections
      const maxDist = 110;
      ctx.lineWidth = 0.7;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) {
            const lineAlpha = 0.15 * (1 - dist / maxDist);
            ctx.strokeStyle = `hsla(${hue}, 70%, 70%, ${lineAlpha})`;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    const handleResize = () => {
      resize();
      createParticles();
    };

    handleResize();
    animationFrameId = requestAnimationFrame(draw);
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [canvasHeight, particleCount]);

  return (
    <canvas
      ref={canvasRef}
      className="witness-field"
      aria-hidden="true"
    />
  );
}

export default WitnessField;
