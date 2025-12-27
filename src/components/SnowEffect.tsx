import { useEffect, useState } from "react";
import { useSnow } from "@/contexts/SnowContext";

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
  const { snowEnabled } = useSnow();
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
          className="absolute rounded-full bg-foreground/80 animate-snowfall"
          style={{
            left: `${flake.x}%`,
            width: `${flake.size}px`,
            height: `${flake.size}px`,
            opacity: flake.opacity,
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
