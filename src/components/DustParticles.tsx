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
      for (let i = 0; i < 40; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 4 + 1,
          duration: Math.random() * 10 + 15,
          delay: Math.random() * 5,
          parallaxSpeed: Math.random() * 0.5 + 0.1, // 0.1 to 0.6 for varied depth
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
            className="absolute rounded-full bg-foreground/5 animate-dust-float"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animationDuration: `${particle.duration}s`,
              animationDelay: `${particle.delay}s`,
              transform: `translateY(${parallaxOffset}px)`,
              opacity: particle.size > 3 ? 0.08 : 0.04, // Larger particles slightly more visible
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
