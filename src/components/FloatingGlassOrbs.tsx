import { useLiquidGlass } from "@/contexts/LiquidGlassContext";
import { useEffect, useState } from "react";

interface Orb {
  id: number;
  size: number;
  left: string;
  top: string;
  animationDelay: string;
  animationDuration: string;
}

const FloatingGlassOrbs = () => {
  const { isLiquidGlass } = useLiquidGlass();
  const [orbs, setOrbs] = useState<Orb[]>([]);

  useEffect(() => {
    // Generate random orbs
    const generateOrbs = () => {
      const newOrbs: Orb[] = [];
      const orbCount = 8;

      for (let i = 0; i < orbCount; i++) {
        newOrbs.push({
          id: i,
          size: Math.random() * 150 + 50, // 50-200px
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 5}s`,
          animationDuration: `${Math.random() * 10 + 8}s`, // 8-18s
        });
      }
      setOrbs(newOrbs);
    };

    generateOrbs();
  }, []);

  if (!isLiquidGlass) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {orbs.map((orb) => (
        <div
          key={orb.id}
          className="glass-orb animate-float-orb"
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.left,
            top: orb.top,
            animationDelay: orb.animationDelay,
            animationDuration: orb.animationDuration,
            background: `radial-gradient(
              circle at 30% 30%,
              hsl(var(--primary) / 0.15) 0%,
              hsl(var(--primary) / 0.08) 40%,
              rgba(255, 255, 255, 0.05) 70%,
              transparent 100%
            )`,
            boxShadow: `
              inset 0 0 20px hsl(var(--primary) / 0.1),
              0 0 40px hsl(var(--primary) / 0.05)
            `,
          }}
        />
      ))}
      
      {/* Extra large ambient orbs */}
      <div 
        className="absolute w-96 h-96 rounded-full opacity-20"
        style={{
          left: '-10%',
          top: '20%',
          background: `radial-gradient(circle, hsl(var(--primary) / 0.2) 0%, transparent 70%)`,
          filter: 'blur(60px)',
          animation: 'pulse-slow 10s ease-in-out infinite',
        }}
      />
      <div 
        className="absolute w-80 h-80 rounded-full opacity-15"
        style={{
          right: '-5%',
          bottom: '10%',
          background: `radial-gradient(circle, hsl(var(--primary) / 0.25) 0%, transparent 70%)`,
          filter: 'blur(50px)',
          animation: 'pulse-slow 12s ease-in-out infinite reverse',
        }}
      />
    </div>
  );
};

export default FloatingGlassOrbs;
