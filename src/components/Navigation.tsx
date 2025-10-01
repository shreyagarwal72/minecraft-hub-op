import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Download, Map, Wrench, Image, Users, Home } from "lucide-react";
import { Link } from "react-router-dom";
import minecraftLogo from "@/assets/minecraft-logo.png";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Worlds", href: "/worlds", icon: Map },
    { name: "Modpacks", href: "/modpacks", icon: Wrench },
    { name: "Shaders", href: "/shaders", icon: Image },
    { name: "Downloads", href: "/downloads", icon: Download },
    { name: "Community", href: "/community", icon: Users },
  ];

  return (
    <nav className="bg-card/95 backdrop-blur-md border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img src={minecraftLogo} alt="Minecraft Java Hub" className="h-10 w-10" />
            <div className="flex flex-col">
              <span className="text-lg font-bold text-foreground">Minecraft Java Hub</span>
              <span className="text-xs text-muted-foreground">Professional Gaming</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.name}
                  variant="ghost"
                  className="text-foreground hover:text-primary hover:bg-secondary/50 transition-all duration-200"
                  asChild
                >
                  <Link to={item.href} className="flex items-center space-x-2">
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                </Button>
              );
            })}
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex">
            <Button 
              variant="default" 
              className="bg-primary hover:bg-primary-hover text-primary-foreground shadow-minecraft"
              asChild
            >
              <Link to="/downloads">Get Started</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.name}
                  variant="ghost"
                  className="w-full justify-start text-foreground hover:text-primary hover:bg-secondary/50"
                  asChild
                >
                  <Link to={item.href} className="flex items-center space-x-3">
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                </Button>
              );
            })}
            <div className="pt-2">
              <Button 
                variant="default" 
                className="w-full bg-primary hover:bg-primary-hover text-primary-foreground"
                asChild
              >
                <Link to="/downloads">Get Started</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;