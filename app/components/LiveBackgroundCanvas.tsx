"use client";

import { useEffect, useRef } from "react";

interface LiveBackgroundCanvasProps {
  loaded: boolean;
  enabled?: boolean;
}

export function LiveBackgroundCanvas({ loaded, enabled = true }: LiveBackgroundCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const shouldAnimateCanvas = window.matchMedia("(min-width: 761px) and (prefers-reduced-motion: no-preference)").matches;
    if (!shouldAnimateCanvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let dpr = 1;

    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      down: false,
    };

    interface Ripple {
      x: number;
      y: number;
      radius: number;
      maxRadius: number;
      alpha: number;
      speed: number;
    }
    const ripples: Ripple[] = [];

    interface Orb {
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      radius: number;
      color: string;
      phase: number;
      speed: number;
    }
    let orbs: Orb[] = [];

    interface Particle {
      x: number;
      y: number;
      size: number;
      vx: number;
      vy: number;
      baseAlpha: number;
      phase: number;
    }
    let particles: Particle[] = [];

    const initOrbs = (w: number, h: number) => {
      orbs = [
        {
          x: w * 0.25,
          y: h * 0.35,
          baseX: w * 0.25,
          baseY: h * 0.35,
          radius: Math.min(w, h) * 0.5,
          color: "rgba(244, 217, 211, 0.45)",
          phase: 0,
          speed: 0.006,
        },
        {
          x: w * 0.72,
          y: h * 0.4,
          baseX: w * 0.72,
          baseY: h * 0.4,
          radius: Math.min(w, h) * 0.45,
          color: "rgba(255, 232, 192, 0.38)",
          phase: Math.PI * 0.5,
          speed: 0.005,
        },
        {
          x: w * 0.5,
          y: h * 0.75,
          baseX: w * 0.5,
          baseY: h * 0.75,
          radius: Math.min(w, h) * 0.55,
          color: "rgba(200, 218, 255, 0.35)",
          phase: Math.PI,
          speed: 0.007,
        },
      ];
    };

    const initParticles = (w: number, h: number) => {
      const count = Math.min(Math.floor((w * h) / 85000), 18);
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          size: 1 + Math.random() * 2,
          vx: (Math.random() - 0.5) * 0.3,
          vy: -0.2 - Math.random() * 0.4,
          baseAlpha: 0.15 + Math.random() * 0.35,
          phase: Math.random() * Math.PI * 2,
        });
      }
    };

    const handleResize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.25);
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      initOrbs(width, height);
      initParticles(width, height);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const handlePointerMove = (e: PointerEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      if (mouse.x === -1000) {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
      }
    };

    const handlePointerDown = (e: PointerEvent) => {
      mouse.down = true;
      ripples.push({
        x: e.clientX,
        y: e.clientY,
        radius: 8,
        maxRadius: Math.max(width, height) * 0.4,
        alpha: 0.6,
        speed: 4,
      });
    };

    const handlePointerUp = () => {
      mouse.down = false;
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointerup", handlePointerUp);

    let lastFrame = 0;

    const render = (now = 0) => {
      if (document.hidden) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }
      if (now - lastFrame < 33) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }
      lastFrame = now;
      mouse.x += (mouse.targetX - mouse.x) * 0.12;
      mouse.y += (mouse.targetY - mouse.y) * 0.12;

      ctx.clearRect(0, 0, width, height);

      // 1. Soft Ambient Light Orbs (Floating continuously)
      orbs.forEach((orb) => {
        orb.phase += orb.speed;

        const floatX = Math.sin(orb.phase) * 50 + Math.cos(orb.phase * 0.7) * 25;
        const floatY = Math.cos(orb.phase * 0.8) * 40 + Math.sin(orb.phase * 0.5) * 20;

        const dx = mouse.x - (orb.baseX + floatX);
        const dy = mouse.y - (orb.baseY + floatY);
        const dist = Math.hypot(dx, dy);
        const pull = Math.max(0, 1 - dist / (orb.radius * 1.5)) * 35;

        const currentX = orb.baseX + floatX + (dist > 0 ? (dx / dist) * pull : 0);
        const currentY = orb.baseY + floatY + (dist > 0 ? (dy / dist) * pull : 0);

        const gradient = ctx.createRadialGradient(
          currentX,
          currentY,
          0,
          currentX,
          currentY,
          orb.radius
        );
        gradient.addColorStop(0, orb.color);
        gradient.addColorStop(0.7, orb.color.replace(/[\d.]+\)$/, "0.1)"));
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(currentX, currentY, orb.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // 2. Cursor Luminescence Aura
      if (mouse.x > 0 && mouse.y > 0) {
        const auraRadius = mouse.down ? 280 : 200;
        const mouseAura = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          auraRadius
        );
        mouseAura.addColorStop(0, "rgba(255, 255, 255, 0.35)");
        mouseAura.addColorStop(0.4, "rgba(230, 240, 255, 0.18)");
        mouseAura.addColorStop(1, "rgba(255, 255, 255, 0)");

        ctx.fillStyle = mouseAura;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, auraRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      // 3. Interactive Ripples on Click
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += r.speed;
        r.alpha -= 0.01;

        if (r.alpha <= 0 || r.radius >= r.maxRadius) {
          ripples.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 255, 255, ${r.alpha})`;
        ctx.lineWidth = 1.8;
        ctx.stroke();
        ctx.restore();
      }

      // 4. Subtle Shimmer Particles
      particles.forEach((p) => {
        p.phase += 0.02;
        p.x += p.vx + Math.sin(p.phase) * 0.2;
        p.y += p.vy;

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        const currentAlpha = p.baseAlpha + Math.sin(p.phase * 2) * 0.12;
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0, currentAlpha)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [enabled]);

  return (
    <canvas
      ref={canvasRef}
      className={`live-bg-canvas ${loaded ? "is-active" : ""}`}
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
        transition: "opacity 1.2s ease-out",
        opacity: loaded && enabled ? 1 : 0,
      }}
    />
  );
}
