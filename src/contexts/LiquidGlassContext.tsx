import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface LiquidGlassContextType {
  isLiquidGlass: boolean;
  toggleLiquidGlass: () => void;
  glassIntensity: number;
  setGlassIntensity: (value: number) => void;
  animationSpeed: number;
  setAnimationSpeed: (value: number) => void;
  glassTransitionKey: number;
}

const LiquidGlassContext = createContext<LiquidGlassContextType | undefined>(undefined);

export const useLiquidGlass = () => {
  const context = useContext(LiquidGlassContext);
  if (!context) {
    throw new Error("useLiquidGlass must be used within a LiquidGlassProvider");
  }
  return context;
};

interface LiquidGlassProviderProps {
  children: ReactNode;
}

export const LiquidGlassProvider = ({ children }: LiquidGlassProviderProps) => {
  const [isLiquidGlass, setIsLiquidGlass] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("liquid-glass-mode");
      return saved === "true";
    }
    return false;
  });

  const [glassIntensity, setGlassIntensityState] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("glass-intensity");
      return saved ? parseInt(saved, 10) : 70;
    }
    return 70;
  });

  const [animationSpeed, setAnimationSpeedState] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("animation-speed");
      return saved ? parseFloat(saved) : 1;
    }
    return 1;
  });

  const [glassTransitionKey, setGlassTransitionKey] = useState(0);

  // Apply glass intensity as CSS variable
  useEffect(() => {
    localStorage.setItem("glass-intensity", String(glassIntensity));
    document.documentElement.style.setProperty("--glass-intensity", `${glassIntensity / 100}`);
    document.documentElement.style.setProperty("--glass-blur", `${(glassIntensity / 100) * 20}px`);
    document.documentElement.style.setProperty("--glass-glow", `${(glassIntensity / 100) * 0.3}`);
  }, [glassIntensity]);

  // Apply animation speed as CSS variable
  useEffect(() => {
    localStorage.setItem("animation-speed", String(animationSpeed));
    document.documentElement.style.setProperty("--animation-speed", String(animationSpeed));
    document.documentElement.style.setProperty("--shimmer-duration", `${3 / animationSpeed}s`);
    document.documentElement.style.setProperty("--orb-duration", `${8 / animationSpeed}s`);
  }, [animationSpeed]);

  useEffect(() => {
    localStorage.setItem("liquid-glass-mode", String(isLiquidGlass));
    
    // Add transition class for smooth effect
    document.documentElement.classList.add("glass-transitioning");
    
    if (isLiquidGlass) {
      document.documentElement.classList.add("liquid-glass");
    } else {
      document.documentElement.classList.remove("liquid-glass");
    }
    
    // Trigger entrance animation by updating key
    setGlassTransitionKey(prev => prev + 1);
    
    const timeout = setTimeout(() => {
      document.documentElement.classList.remove("glass-transitioning");
    }, 600);
    
    return () => clearTimeout(timeout);
  }, [isLiquidGlass]);

  const toggleLiquidGlass = () => {
    setIsLiquidGlass(prev => !prev);
  };

  const setGlassIntensity = (value: number) => {
    setGlassIntensityState(value);
  };

  const setAnimationSpeed = (value: number) => {
    setAnimationSpeedState(value);
  };

  return (
    <LiquidGlassContext.Provider value={{ 
      isLiquidGlass, 
      toggleLiquidGlass,
      glassIntensity,
      setGlassIntensity,
      animationSpeed,
      setAnimationSpeed,
      glassTransitionKey
    }}>
      {children}
    </LiquidGlassContext.Provider>
  );
};
