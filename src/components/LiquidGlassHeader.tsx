import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import TorchThemeToggle from "./TorchThemeToggle";
import { useLiquidGlass } from "@/contexts/LiquidGlassContext";
import { cn } from "@/lib/utils";

const LiquidGlassHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { isLiquidGlass, toggleLiquidGlass } = useLiquidGlass();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Worlds", href: "/worlds" },
    { name: "Modpacks", href: "/modpacks" },
    { name: "Shaders", href: "/shaders" },
    { name: "Convert", href: "/patch" },
    { name: "Downloads", href: "/downloads" },
    { name: "FAQ", href: "/faq" },
  ];

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 border-b transition-all duration-500",
      isLiquidGlass 
        ? "liquid-glass-surface border-white/20" 
        : "bg-gaming-surface/90 backdrop-blur-xl border-border"
    )}>
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo - Clickable to toggle liquid glass */}
          <button 
            onClick={toggleLiquidGlass}
            className="flex items-center group cursor-pointer focus:outline-none"
            aria-label="Toggle liquid glass effect"
          >
            <h1 className={cn(
              "text-2xl font-bold transition-all duration-300",
              isLiquidGlass 
                ? "liquid-glass-text" 
                : "text-primary",
              "group-hover:scale-105 group-active:scale-95"
            )}>
              Minecraft Java Hub
            </h1>
            {isLiquidGlass && (
              <span className="ml-2 text-xs bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded-full text-white/80 animate-fade-in">
                Glass
              </span>
            )}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-baseline space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  data-magnetic
                  className={cn(
                    "transition-colors duration-300 px-3 py-2 text-sm font-medium",
                    isLiquidGlass
                      ? "text-white/90 hover:text-white hover:bg-white/10 rounded-lg"
                      : "text-gaming-text hover:text-primary"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Theme Toggle and CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <TorchThemeToggle />
            <Button 
              data-magnetic
              className={cn(
                "transition-all duration-300",
                isLiquidGlass 
                  ? "liquid-glass-button" 
                  : "btn-gaming btn-3d"
              )}
              onClick={() => navigate('/faq')}
            >
              Get Started
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={cn(
                isLiquidGlass 
                  ? "text-white/90 hover:text-white hover:bg-white/10" 
                  : "text-gaming-text hover:text-primary"
              )}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden animate-fade-in">
            <div className={cn(
              "px-2 pt-2 pb-3 space-y-1 rounded-lg mt-2 border transition-all duration-300",
              isLiquidGlass
                ? "liquid-glass-surface border-white/20"
                : "bg-gaming-surface border-border"
            )}>
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "block px-3 py-2 text-base font-medium transition-colors duration-300 rounded-lg",
                    isLiquidGlass
                      ? "text-white/90 hover:text-white hover:bg-white/10"
                      : "text-gaming-text hover:text-primary"
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="px-3 py-2 flex flex-col items-center gap-4">
                <TorchThemeToggle />
                <Button 
                  className={cn(
                    "w-full transition-all duration-300",
                    isLiquidGlass 
                      ? "liquid-glass-button" 
                      : "btn-gaming"
                  )}
                  onClick={() => {
                    navigate('/faq');
                    setIsMenuOpen(false);
                  }}
                >
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default LiquidGlassHeader;
