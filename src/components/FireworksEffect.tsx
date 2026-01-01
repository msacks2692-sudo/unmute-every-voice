import { useEffect, useState, useCallback } from "react";
import { useAccessibility } from "@/contexts/AccessibilityContext";

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  life: number;
  maxLife: number;
}

interface Firework {
  id: number;
  x: number;
  targetY: number;
  currentY: number;
  exploded: boolean;
  particles: Particle[];
  color: string;
}

const colors = [
  "hsl(var(--primary))",
  "#ff6b6b",
  "#4ecdc4",
  "#ffe66d",
  "#95e1d3",
  "#f38181",
  "#aa96da",
  "#fcbad3",
  "#a8d8ea",
];

const FireworksEffect = () => {
  const { fireworksEnabled } = useAccessibility();
  const [fireworks, setFireworks] = useState<Firework[]>([]);

  const createParticles = useCallback((x: number, y: number, color: string): Particle[] => {
    const particles: Particle[] = [];
    const particleCount = 30 + Math.floor(Math.random() * 20);
    
    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.PI * 2 * i) / particleCount + Math.random() * 0.2;
      const velocity = 2 + Math.random() * 3;
      particles.push({
        id: i,
        x,
        y,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity,
        color,
        size: 2 + Math.random() * 2,
        life: 1,
        maxLife: 60 + Math.random() * 40,
      });
    }
    return particles;
  }, []);

  const launchFirework = useCallback(() => {
    const newFirework: Firework = {
      id: Date.now() + Math.random(),
      x: 10 + Math.random() * 80,
      targetY: 20 + Math.random() * 30,
      currentY: 100,
      exploded: false,
      particles: [],
      color: colors[Math.floor(Math.random() * colors.length)],
    };
    setFireworks(prev => [...prev, newFirework]);
  }, []);

  useEffect(() => {
    if (!fireworksEnabled) {
      setFireworks([]);
      return;
    }

    // Launch fireworks periodically
    const launchInterval = setInterval(() => {
      if (Math.random() > 0.3) {
        launchFirework();
      }
    }, 1500);

    // Animation loop
    const animationInterval = setInterval(() => {
      setFireworks(prev => {
        return prev
          .map(fw => {
            if (!fw.exploded) {
              // Rising phase
              const newY = fw.currentY - 1.5;
              if (newY <= fw.targetY) {
                return {
                  ...fw,
                  currentY: newY,
                  exploded: true,
                  particles: createParticles(fw.x, newY, fw.color),
                };
              }
              return { ...fw, currentY: newY };
            } else {
              // Explosion phase - update particles
              const updatedParticles = fw.particles
                .map(p => ({
                  ...p,
                  x: p.x + p.vx * 0.3,
                  y: p.y + p.vy * 0.3,
                  vy: p.vy + 0.05, // gravity
                  life: p.life - 1 / p.maxLife,
                }))
                .filter(p => p.life > 0);

              return { ...fw, particles: updatedParticles };
            }
          })
          .filter(fw => !fw.exploded || fw.particles.length > 0);
      });
    }, 16);

    return () => {
      clearInterval(launchInterval);
      clearInterval(animationInterval);
    };
  }, [fireworksEnabled, createParticles, launchFirework]);

  if (!fireworksEnabled) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      {fireworks.map(fw => (
        <div key={fw.id}>
          {/* Rising trail */}
          {!fw.exploded && (
            <div
              className="absolute w-1 h-4 rounded-full"
              style={{
                left: `${fw.x}%`,
                top: `${fw.currentY}%`,
                background: `linear-gradient(to top, ${fw.color}, transparent)`,
                boxShadow: `0 0 6px ${fw.color}`,
              }}
            />
          )}
          {/* Explosion particles */}
          {fw.particles.map(p => (
            <div
              key={p.id}
              className="absolute rounded-full"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: `${p.size}px`,
                height: `${p.size}px`,
                backgroundColor: p.color,
                opacity: p.life,
                boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
                transform: "translate(-50%, -50%)",
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default FireworksEffect;
