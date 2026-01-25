import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface LiquidGlassContextType {
  isLiquidGlass: boolean;
  toggleLiquidGlass: () => void;
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

  useEffect(() => {
    localStorage.setItem("liquid-glass-mode", String(isLiquidGlass));
    
    // Add transition class for smooth effect
    document.documentElement.classList.add("glass-transitioning");
    
    if (isLiquidGlass) {
      document.documentElement.classList.add("liquid-glass");
    } else {
      document.documentElement.classList.remove("liquid-glass");
    }
    
    const timeout = setTimeout(() => {
      document.documentElement.classList.remove("glass-transitioning");
    }, 600);
    
    return () => clearTimeout(timeout);
  }, [isLiquidGlass]);

  const toggleLiquidGlass = () => {
    setIsLiquidGlass(prev => !prev);
  };

  return (
    <LiquidGlassContext.Provider value={{ isLiquidGlass, toggleLiquidGlass }}>
      {children}
    </LiquidGlassContext.Provider>
  );
};
