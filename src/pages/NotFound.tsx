import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import MinecraftButton from "@/components/MinecraftButton";
import LiquidGlassHeader from "@/components/LiquidGlassHeader";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <LiquidGlassHeader />
      
      <div className="flex flex-1 items-center justify-center px-4 pt-16">
        <div className="text-center space-y-8">
          {/* 404 Number with glow effect */}
          <div className="relative">
            <h1 className="text-[150px] md:text-[200px] font-bold text-primary leading-none animate-pulse">
              404
            </h1>
            <div className="absolute inset-0 text-[150px] md:text-[200px] font-bold text-primary/20 blur-xl leading-none">
              404
            </div>
          </div>

          {/* Message */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
              Oops! Page not found
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Looks like you've wandered into the void. The page you're looking for doesn't exist or has been moved.
            </p>
          </div>

          {/* Quick Links */}
          <div className="mb-8">
            <p className="text-muted-foreground mb-4">Explore these pages:</p>
            <div className="flex flex-wrap gap-3 justify-center">
              {[
                { name: "Shaders", href: "/shaders", icon: "✨" },
                { name: "Worlds", href: "/worlds", icon: "🗺️" },
                { name: "Modpacks", href: "/modpacks", icon: "📦" },
                { name: "Downloads", href: "/downloads", icon: "⬇️" },
                { name: "FAQ", href: "/faq", icon: "❓" },
              ].map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="px-4 py-2 bg-card border border-border rounded-lg hover:border-primary hover:bg-secondary transition-all duration-300 flex items-center gap-2 group"
                >
                  <span className="group-hover:scale-110 transition-transform">{link.icon}</span>
                  <span className="text-foreground group-hover:text-primary transition-colors">{link.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Navigation buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild variant="default" size="lg" className="gap-2">
              <Link to="/">
                <Home className="w-5 h-5" />
                Return Home
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2">
              <Link to="/" onClick={() => window.history.back()}>
                <ArrowLeft className="w-5 h-5" />
                Go Back
              </Link>
            </Button>
          </div>

          {/* Decorative elements */}
          <div className="flex justify-center gap-2 mt-8">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-3 h-3 bg-primary/60 rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>

          {/* Minecraft button at bottom */}
          <div className="mt-12 pt-8 border-t border-border/50">
            <MinecraftButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
