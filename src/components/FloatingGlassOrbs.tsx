import { useLiquidGlass } from "@/contexts/LiquidGlassContext";
import { useEffect, useState, useCallback } from "react";

type AnimationType = 'float' | 'pulse' | 'drift' | 'orbit' | 'breathe';

interface Orb {
  id: number;
  size: number;
  left: string;
  top: string;
  animationDelay: string;
  animationDuration: string;
  animationType: AnimationType;
  blur: number;
  opacity: number;
  parallaxSpeed: number; // Multiplier for scroll effect
  parallaxDirection: 'up' | 'down'; // Direction of parallax movement
}

const FloatingGlassOrbs = () => {
  const { isLiquidGlass } = useLiquidGlass();
  const [orbs, setOrbs] = useState<Orb[]>([]);
  const [scrollY, setScrollY] = useState(0);

  // Throttled scroll handler for performance
  const handleScroll = useCallback(() => {
    requestAnimationFrame(() => {
      setScrollY(window.scrollY);
    });
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    const animationTypes: AnimationType[] = ['float', 'pulse', 'drift', 'orbit', 'breathe'];
    
    const generateOrbs = () => {
      const newOrbs: Orb[] = [];
      
      // Small orbs (20-60px) - 6 of them - fastest parallax
      for (let i = 0; i < 6; i++) {
        newOrbs.push({
          id: i,
          size: Math.random() * 40 + 20,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 5}s`,
          animationDuration: `${Math.random() * 6 + 4}s`,
          animationType: animationTypes[Math.floor(Math.random() * animationTypes.length)],
          blur: Math.random() * 20 + 20,
          opacity: Math.random() * 0.3 + 0.2,
          parallaxSpeed: Math.random() * 0.3 + 0.2, // 0.2-0.5
          parallaxDirection: Math.random() > 0.5 ? 'up' : 'down',
        });
      }
      
      // Medium orbs (60-120px) - 5 of them - medium parallax
      for (let i = 6; i < 11; i++) {
        newOrbs.push({
          id: i,
          size: Math.random() * 60 + 60,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 8}s`,
          animationDuration: `${Math.random() * 8 + 6}s`,
          animationType: animationTypes[Math.floor(Math.random() * animationTypes.length)],
          blur: Math.random() * 30 + 30,
          opacity: Math.random() * 0.25 + 0.15,
          parallaxSpeed: Math.random() * 0.15 + 0.1, // 0.1-0.25
          parallaxDirection: Math.random() > 0.5 ? 'up' : 'down',
        });
      }
      
      // Large orbs (120-200px) - 4 of them - slow parallax
      for (let i = 11; i < 15; i++) {
        newOrbs.push({
          id: i,
          size: Math.random() * 80 + 120,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 10}s`,
          animationDuration: `${Math.random() * 12 + 10}s`,
          animationType: animationTypes[Math.floor(Math.random() * animationTypes.length)],
          blur: Math.random() * 40 + 40,
          opacity: Math.random() * 0.2 + 0.1,
          parallaxSpeed: Math.random() * 0.08 + 0.05, // 0.05-0.13
          parallaxDirection: Math.random() > 0.5 ? 'up' : 'down',
        });
      }
      
      // Extra large ambient orbs (200-350px) - 3 of them - very slow parallax
      for (let i = 15; i < 18; i++) {
        newOrbs.push({
          id: i,
          size: Math.random() * 150 + 200,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 12}s`,
          animationDuration: `${Math.random() * 15 + 12}s`,
          animationType: 'breathe',
          blur: Math.random() * 60 + 50,
          opacity: Math.random() * 0.15 + 0.08,
          parallaxSpeed: Math.random() * 0.04 + 0.02, // 0.02-0.06
          parallaxDirection: Math.random() > 0.5 ? 'up' : 'down',
        });
      }
      
      setOrbs(newOrbs);
    };

    generateOrbs();
  }, []);

  const getAnimationStyle = (orb: Orb): string => {
    switch (orb.animationType) {
      case 'float':
        return `float-orb ${orb.animationDuration} ease-in-out infinite`;
      case 'pulse':
        return `pulse-orb ${orb.animationDuration} ease-in-out infinite`;
      case 'drift':
        return `drift-orb ${orb.animationDuration} linear infinite`;
      case 'orbit':
        return `orbit-orb ${orb.animationDuration} ease-in-out infinite`;
      case 'breathe':
        return `breathe-orb ${orb.animationDuration} ease-in-out infinite`;
      default:
        return `float-orb ${orb.animationDuration} ease-in-out infinite`;
    }
  };

  const getParallaxTransform = (orb: Orb): string => {
    const direction = orb.parallaxDirection === 'up' ? -1 : 1;
    const offset = scrollY * orb.parallaxSpeed * direction;
    return `translateY(${offset}px)`;
  };

  if (!isLiquidGlass) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {orbs.map((orb) => (
        <div
          key={orb.id}
          className="glass-orb will-change-transform"
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.left,
            top: orb.top,
            animationDelay: orb.animationDelay,
            animation: getAnimationStyle(orb),
            opacity: orb.opacity,
            filter: `blur(${orb.blur}px)`,
            transform: getParallaxTransform(orb),
            transition: 'transform 0.1s linear',
            background: `radial-gradient(
              circle at 30% 30%,
              hsl(var(--primary) / 0.25) 0%,
              hsl(var(--primary) / 0.12) 40%,
              rgba(255, 255, 255, 0.08) 70%,
              transparent 100%
            )`,
            boxShadow: `
              inset 0 0 ${orb.size * 0.3}px hsl(var(--primary) / 0.15),
              0 0 ${orb.size * 0.5}px hsl(var(--primary) / 0.08)
            `,
          }}
        />
      ))}
      
      {/* Corner accent orbs with parallax */}
      <div 
        className="absolute rounded-full will-change-transform"
        style={{
          width: 400,
          height: 400,
          left: '-15%',
          top: '10%',
          background: `radial-gradient(circle, hsl(var(--primary) / 0.2) 0%, transparent 70%)`,
          filter: 'blur(80px)',
          animation: 'breathe-orb 12s ease-in-out infinite',
          opacity: 0.25,
          transform: `translateY(${scrollY * 0.03}px)`,
          transition: 'transform 0.1s linear',
        }}
      />
      <div 
        className="absolute rounded-full will-change-transform"
        style={{
          width: 350,
          height: 350,
          right: '-10%',
          bottom: '5%',
          background: `radial-gradient(circle, hsl(var(--primary) / 0.25) 0%, transparent 70%)`,
          filter: 'blur(70px)',
          animation: 'breathe-orb 15s ease-in-out infinite reverse',
          opacity: 0.2,
          transform: `translateY(${scrollY * -0.05}px)`,
          transition: 'transform 0.1s linear',
        }}
      />
      <div 
        className="absolute rounded-full will-change-transform"
        style={{
          width: 300,
          height: 300,
          right: '20%',
          top: '-5%',
          background: `radial-gradient(circle, hsl(var(--primary) / 0.18) 0%, transparent 70%)`,
          filter: 'blur(60px)',
          animation: 'drift-orb 20s linear infinite',
          opacity: 0.18,
          transform: `translateY(${scrollY * 0.08}px)`,
          transition: 'transform 0.1s linear',
        }}
      />
      <div 
        className="absolute rounded-full will-change-transform"
        style={{
          width: 280,
          height: 280,
          left: '30%',
          bottom: '-8%',
          background: `radial-gradient(circle, hsl(var(--primary) / 0.22) 0%, transparent 70%)`,
          filter: 'blur(65px)',
          animation: 'pulse-orb 10s ease-in-out infinite',
          opacity: 0.22,
          transform: `translateY(${scrollY * -0.04}px)`,
          transition: 'transform 0.1s linear',
        }}
      />
    </div>
  );
};

export default FloatingGlassOrbs;
