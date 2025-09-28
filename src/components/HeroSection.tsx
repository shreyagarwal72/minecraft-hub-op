import { Button } from "@/components/ui/button";
import { Download, Play, Users, Star } from "lucide-react";
import heroImage from "@/assets/minecraft-hero.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="block-appear">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6">
            Minecraft Java Hub
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Your ultimate destination for Minecraft Java Edition worlds, addons, shaders, and professional gaming content. 
            Crafted for builders, adventurers, and creators.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary-hover text-primary-foreground shadow-minecraft glow-pulse text-lg px-8 py-6"
            >
              <Download className="mr-2 h-5 w-5" />
              Download Worlds
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground text-lg px-8 py-6"
            >
              <Play className="mr-2 h-5 w-5" />
              Watch Trailer
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="minecraft-block bg-card/50 backdrop-blur-sm p-6 rounded-lg">
              <div className="flex items-center justify-center mb-2">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <div className="text-2xl font-bold text-foreground">50K+</div>
              <div className="text-muted-foreground">Active Players</div>
            </div>
            
            <div className="minecraft-block bg-card/50 backdrop-blur-sm p-6 rounded-lg">
              <div className="flex items-center justify-center mb-2">
                <Download className="h-8 w-8 text-primary" />
              </div>
              <div className="text-2xl font-bold text-foreground">1M+</div>
              <div className="text-muted-foreground">Downloads</div>
            </div>
            
            <div className="minecraft-block bg-card/50 backdrop-blur-sm p-6 rounded-lg">
              <div className="flex items-center justify-center mb-2">
                <Star className="h-8 w-8 text-primary" />
              </div>
              <div className="text-2xl font-bold text-foreground">4.9</div>
              <div className="text-muted-foreground">Rating</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="minecraft-bounce">
          <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
            <div className="w-1 h-3 bg-primary rounded-full mt-2"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;