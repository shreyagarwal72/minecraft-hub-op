import { useLiquidGlass } from "@/contexts/LiquidGlassContext";
import { useEffect, useState, useCallback, useMemo } from "react";

type AnimationType = 'float' | 'pulse' | 'drift' | 'orbit' | 'breathe';

interface Orb {
  id: number;
  size: number;
  left: string;
  top: string;
  animationDelay: string;
  baseDuration: number; // Base duration in seconds
  animationType: AnimationType;
  blur: number;
  opacity: number;
  parallaxSpeed: number;
  parallaxDirection: 'up' | 'down';
}

const FloatingGlassOrbs = () => {
  const { isLiquidGlass, animationSpeed, glassIntensity } = useLiquidGlass();
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
          baseDuration: Math.random() * 6 + 4,
          animationType: animationTypes[Math.floor(Math.random() * animationTypes.length)],
          blur: Math.random() * 20 + 20,
          opacity: Math.random() * 0.3 + 0.2,
          parallaxSpeed: Math.random() * 0.3 + 0.2,
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
          baseDuration: Math.random() * 8 + 6,
          animationType: animationTypes[Math.floor(Math.random() * animationTypes.length)],
          blur: Math.random() * 30 + 30,
          opacity: Math.random() * 0.25 + 0.15,
          parallaxSpeed: Math.random() * 0.15 + 0.1,
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
          baseDuration: Math.random() * 12 + 10,
          animationType: animationTypes[Math.floor(Math.random() * animationTypes.length)],
          blur: Math.random() * 40 + 40,
          opacity: Math.random() * 0.2 + 0.1,
          parallaxSpeed: Math.random() * 0.08 + 0.05,
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
          baseDuration: Math.random() * 15 + 12,
          animationType: 'breathe',
          blur: Math.random() * 60 + 50,
          opacity: Math.random() * 0.15 + 0.08,
          parallaxSpeed: Math.random() * 0.04 + 0.02,
          parallaxDirection: Math.random() > 0.5 ? 'up' : 'down',
        });
      }
      
      setOrbs(newOrbs);
    };

    generateOrbs();
  }, []);

  // Calculate adjusted duration based on animation speed
  const getAnimationDuration = useCallback((baseDuration: number): string => {
    return `${baseDuration / animationSpeed}s`;
  }, [animationSpeed]);

  const getAnimationStyle = useCallback((orb: Orb): string => {
    const duration = getAnimationDuration(orb.baseDuration);
    switch (orb.animationType) {
      case 'float':
        return `float-orb ${duration} ease-in-out infinite`;
      case 'pulse':
        return `pulse-orb ${duration} ease-in-out infinite`;
      case 'drift':
        return `drift-orb ${duration} linear infinite`;
      case 'orbit':
        return `orbit-orb ${duration} ease-in-out infinite`;
      case 'breathe':
        return `breathe-orb ${duration} ease-in-out infinite`;
      default:
        return `float-orb ${duration} ease-in-out infinite`;
    }
  }, [getAnimationDuration]);

  // Calculate opacity based on glass intensity
  const getAdjustedOpacity = useCallback((baseOpacity: number): number => {
    return baseOpacity * (glassIntensity / 100);
  }, [glassIntensity]);

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
            opacity: getAdjustedOpacity(orb.opacity),
            filter: `blur(${orb.blur}px)`,
            transform: getParallaxTransform(orb),
            transition: 'transform 0.1s linear, opacity 0.3s ease',
            background: `radial-gradient(
              circle at 30% 30%,
              hsl(var(--primary) / ${0.25 * (glassIntensity / 100)}) 0%,
              hsl(var(--primary) / ${0.12 * (glassIntensity / 100)}) 40%,
              rgba(255, 255, 255, ${0.08 * (glassIntensity / 100)}) 70%,
              transparent 100%
            )`,
            boxShadow: `
              inset 0 0 ${orb.size * 0.3}px hsl(var(--primary) / ${0.15 * (glassIntensity / 100)}),
              0 0 ${orb.size * 0.5}px hsl(var(--primary) / ${0.08 * (glassIntensity / 100)})
            `,
          }}
        />
      ))}
      
      {/* Corner accent orbs with parallax and intensity */}
      <div 
        className="absolute rounded-full will-change-transform"
        style={{
          width: 400,
          height: 400,
          left: '-15%',
          top: '10%',
          background: `radial-gradient(circle, hsl(var(--primary) / ${0.2 * (glassIntensity / 100)}) 0%, transparent 70%)`,
          filter: 'blur(80px)',
          animation: `breathe-orb ${12 / animationSpeed}s ease-in-out infinite`,
          opacity: getAdjustedOpacity(0.25),
          transform: `translateY(${scrollY * 0.03}px)`,
          transition: 'transform 0.1s linear, opacity 0.3s ease',
        }}
      />
      <div 
        className="absolute rounded-full will-change-transform"
        style={{
          width: 350,
          height: 350,
          right: '-10%',
          bottom: '5%',
          background: `radial-gradient(circle, hsl(var(--primary) / ${0.25 * (glassIntensity / 100)}) 0%, transparent 70%)`,
          filter: 'blur(70px)',
          animation: `breathe-orb ${15 / animationSpeed}s ease-in-out infinite reverse`,
          opacity: getAdjustedOpacity(0.2),
          transform: `translateY(${scrollY * -0.05}px)`,
          transition: 'transform 0.1s linear, opacity 0.3s ease',
        }}
      />
      <div 
        className="absolute rounded-full will-change-transform"
        style={{
          width: 300,
          height: 300,
          right: '20%',
          top: '-5%',
          background: `radial-gradient(circle, hsl(var(--primary) / ${0.18 * (glassIntensity / 100)}) 0%, transparent 70%)`,
          filter: 'blur(60px)',
          animation: `drift-orb ${20 / animationSpeed}s linear infinite`,
          opacity: getAdjustedOpacity(0.18),
          transform: `translateY(${scrollY * 0.08}px)`,
          transition: 'transform 0.1s linear, opacity 0.3s ease',
        }}
      />
      <div 
        className="absolute rounded-full will-change-transform"
        style={{
          width: 280,
          height: 280,
          left: '30%',
          bottom: '-8%',
          background: `radial-gradient(circle, hsl(var(--primary) / ${0.22 * (glassIntensity / 100)}) 0%, transparent 70%)`,
          filter: 'blur(65px)',
          animation: `pulse-orb ${10 / animationSpeed}s ease-in-out infinite`,
          opacity: getAdjustedOpacity(0.22),
          transform: `translateY(${scrollY * -0.04}px)`,
          transition: 'transform 0.1s linear, opacity 0.3s ease',
        }}
      />
    </div>
  );
};

export default FloatingGlassOrbs;
