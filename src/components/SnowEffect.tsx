import { useEffect, useState } from "react";
import { useAccessibility } from "@/contexts/AccessibilityContext";

interface Snowflake {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  drift: number;
}

const SnowEffect = () => {
  const { snowEnabled } = useAccessibility();
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);

  useEffect(() => {
    const generateSnowflakes = () => {
      const flakes: Snowflake[] = [];
      for (let i = 0; i < 80; i++) {
        flakes.push({
          id: i,
          x: Math.random() * 100,
          size: Math.random() * 4 + 2,
          duration: Math.random() * 10 + 10,
          delay: Math.random() * 10,
          opacity: Math.random() * 0.6 + 0.2,
          drift: Math.random() * 20 - 10,
        });
      }
      setSnowflakes(flakes);
    };

    generateSnowflakes();
  }, []);

  if (!snowEnabled) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="absolute rounded-full animate-snowfall"
          style={{
            left: `${flake.x}%`,
            width: `${flake.size}px`,
            height: `${flake.size}px`,
            opacity: flake.opacity,
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            boxShadow: "0 0 4px rgba(255, 255, 255, 0.5)",
            animationDuration: `${flake.duration}s`,
            animationDelay: `${flake.delay}s`,
            ["--drift" as string]: `${flake.drift}px`,
          }}
        />
      ))}
    </div>
  );
};

export default SnowEffect;
