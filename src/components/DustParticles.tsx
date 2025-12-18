import { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  parallaxSpeed: number; // Different speeds for depth effect
}

const DustParticles = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const generateParticles = () => {
      const newParticles: Particle[] = [];
      for (let i = 0; i < 50; i++) {
        const size = Math.random() * 6 + 2; // Larger particles (2-8px)
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size,
          duration: Math.random() * 10 + 15,
          delay: Math.random() * 5,
          parallaxSpeed: Math.random() * 0.4 + 0.1,
        });
      }
      setParticles(newParticles);
    };

    generateParticles();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-5">
      {particles.map((particle) => {
        const parallaxOffset = scrollY * particle.parallaxSpeed;
        
        return (
          <div
            key={particle.id}
            className="absolute rounded-full animate-dust-float"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animationDuration: `${particle.duration}s`,
              animationDelay: `${particle.delay}s`,
              transform: `translateY(${parallaxOffset}px)`,
              background: particle.size > 5 
                ? 'radial-gradient(circle, hsl(var(--primary) / 0.15) 0%, transparent 70%)' 
                : 'hsl(var(--foreground) / 0.08)',
              boxShadow: particle.size > 5 ? '0 0 8px hsl(var(--primary) / 0.1)' : 'none',
            }}
          />
        );
      })}
      
      {/* Cracked texture overlay */}
      <div className="absolute inset-0 opacity-5 cracked-texture" />
    </div>
  );
};

export default DustParticles;
