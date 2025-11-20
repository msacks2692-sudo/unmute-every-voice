import { useEffect, useState } from "react";

interface ReadingRulerProps {
  enabled: boolean;
}

export const ReadingRuler = ({ enabled }: ReadingRulerProps) => {
  const [position, setPosition] = useState(0);

  useEffect(() => {
    if (!enabled) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      {/* Reading ruler highlight */}
      <div
        className="fixed left-0 right-0 pointer-events-none z-[9999] transition-all duration-75"
        style={{
          top: `${position - 20}px`,
          height: "40px",
          backgroundColor: "rgba(255, 255, 0, 0.2)",
          borderTop: "2px solid rgba(255, 255, 0, 0.6)",
          borderBottom: "2px solid rgba(255, 255, 0, 0.6)",
        }}
      />
      {/* Dimming effect above and below */}
      <div
        className="fixed left-0 right-0 top-0 pointer-events-none z-[9998]"
        style={{
          height: `${position - 20}px`,
          backgroundColor: "rgba(0, 0, 0, 0.3)",
        }}
      />
      <div
        className="fixed left-0 right-0 bottom-0 pointer-events-none z-[9998]"
        style={{
          top: `${position + 20}px`,
          backgroundColor: "rgba(0, 0, 0, 0.3)",
        }}
      />
    </>
  );
};
