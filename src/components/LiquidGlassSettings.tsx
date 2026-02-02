import { useLiquidGlass } from "@/contexts/LiquidGlassContext";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Settings, X, Sparkles, Gauge } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const LiquidGlassSettings = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { 
    isLiquidGlass, 
    toggleLiquidGlass,
    glassIntensity,
    setGlassIntensity,
    animationSpeed,
    setAnimationSpeed
  } = useLiquidGlass();

  return (
    <>
      {/* Settings Toggle Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        data-magnetic
        className={cn(
          "fixed bottom-6 right-6 z-50 rounded-full w-12 h-12 transition-all duration-300",
          isLiquidGlass 
            ? "liquid-glass-button" 
            : "bg-primary hover:bg-primary-glow text-primary-foreground"
        )}
        aria-label="Glass settings"
      >
        <Settings className={cn("h-5 w-5 transition-transform duration-500", isOpen && "rotate-180")} />
      </Button>

      {/* Settings Panel */}
      <div className={cn(
        "fixed bottom-20 right-6 z-50 w-80 transition-all duration-500 transform",
        isOpen 
          ? "opacity-100 translate-y-0 scale-100" 
          : "opacity-0 translate-y-4 scale-95 pointer-events-none",
        isLiquidGlass 
          ? "liquid-glass-card" 
          : "bg-card border border-border rounded-2xl shadow-lg"
      )}>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <h3 className={cn(
              "text-lg font-semibold",
              isLiquidGlass ? "liquid-glass-text" : "text-foreground"
            )}>
              Glass Settings
            </h3>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="h-8 w-8 rounded-full"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Glass Mode Toggle */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Label htmlFor="glass-mode" className="text-sm font-medium">
                Liquid Glass Mode
              </Label>
            </div>
            <Switch
              id="glass-mode"
              checked={isLiquidGlass}
              onCheckedChange={toggleLiquidGlass}
            />
          </div>

          {/* Glass Intensity */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                Glass Intensity
              </Label>
              <span className="text-xs text-muted-foreground">{glassIntensity}%</span>
            </div>
            <Slider
              value={[glassIntensity]}
              onValueChange={(value) => setGlassIntensity(value[0])}
              min={20}
              max={100}
              step={5}
              disabled={!isLiquidGlass}
              className={cn(!isLiquidGlass && "opacity-50")}
            />
            <p className="text-xs text-muted-foreground">
              Controls blur, glow, and shimmer effects
            </p>
          </div>

          {/* Animation Speed */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium flex items-center gap-2">
                <Gauge className="h-4 w-4 text-primary" />
                Animation Speed
              </Label>
              <span className="text-xs text-muted-foreground">
                {animationSpeed <= 0.5 ? "Slow" : animationSpeed <= 1 ? "Normal" : "Fast"}
              </span>
            </div>
            <Slider
              value={[animationSpeed * 100]}
              onValueChange={(value) => setAnimationSpeed(value[0] / 100)}
              min={25}
              max={200}
              step={25}
              disabled={!isLiquidGlass}
              className={cn(!isLiquidGlass && "opacity-50")}
            />
            <p className="text-xs text-muted-foreground">
              Orb floating and shimmer animation speed
            </p>
          </div>

          {/* Quick Presets */}
          <div className="pt-4 border-t border-border">
            <Label className="text-sm font-medium mb-3 block">Quick Presets</Label>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  if (!isLiquidGlass) toggleLiquidGlass();
                  setGlassIntensity(40);
                  setAnimationSpeed(0.5);
                }}
                className="flex-1 text-xs"
              >
                Subtle
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  if (!isLiquidGlass) toggleLiquidGlass();
                  setGlassIntensity(70);
                  setAnimationSpeed(1);
                }}
                className="flex-1 text-xs"
              >
                Balanced
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  if (!isLiquidGlass) toggleLiquidGlass();
                  setGlassIntensity(100);
                  setAnimationSpeed(1.5);
                }}
                className="flex-1 text-xs"
              >
                Intense
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LiquidGlassSettings;
