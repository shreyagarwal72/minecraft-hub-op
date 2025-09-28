import { Button } from "@/components/ui/button";
import { Download, Star, Users, Gamepad2, Map, Wrench, Image as ImageIcon } from "lucide-react";

const Showcase = () => {
  const showcaseItems = [
    {
      id: 1,
      title: "Epic Survival Worlds",
      description: "Immersive survival experiences with custom terrain, structures, and challenging gameplay mechanics.",
      icon: Map,
      downloads: "45.2K",
      rating: "4.9",
      category: "World",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=225&fit=crop"
    },
    {
      id: 2,
      title: "Advanced Redstone Addons",
      description: "Professional redstone contraptions and automation systems for Java Edition enthusiasts.",
      icon: Wrench,
      downloads: "32.1K",
      rating: "4.8",
      category: "Addon",
      image: "https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?w=400&h=225&fit=crop"
    },
    {
      id: 3,
      title: "Realistic Shaders",
      description: "High-quality shaders that enhance lighting, shadows, and visual effects for stunning gameplay.",
      icon: ImageIcon,
      downloads: "89.5K",
      rating: "4.9",
      category: "Shader",
      image: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=400&h=225&fit=crop"
    }
  ];

  const stats = [
    { label: "Active Players", value: "50K+", icon: Users },
    { label: "Total Downloads", value: "1M+", icon: Download },
    { label: "Community Rating", value: "4.9", icon: Star },
    { label: "Game Modes", value: "25+", icon: Gamepad2 }
  ];

  return (
    <section className="py-24 bg-gaming-surface/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div 
                key={stat.label} 
                className="card-gaming card-3d text-center"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Icon className="h-8 w-8 text-primary mx-auto mb-3" />
                <div className="text-2xl font-bold text-gaming-text mb-1">{stat.value}</div>
                <div className="text-sm text-gaming-text-muted">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Featured Content */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gaming-text mb-4">
            Featured Content
          </h2>
          <p className="text-xl text-gaming-text-muted max-w-2xl mx-auto">
            Discover our most popular worlds, addons, and shaders crafted by the community
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {showcaseItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div 
                key={item.id} 
                className="card-gaming card-3d overflow-hidden group"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="relative">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                      {item.category}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="bg-gaming-surface/80 backdrop-blur-sm p-2 rounded-full">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gaming-text mb-2 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gaming-text-muted mb-4 text-sm leading-relaxed">
                    {item.description}
                  </p>

                  <div className="flex items-center justify-between mb-4 text-sm">
                    <div className="flex items-center space-x-1 text-gaming-text-muted">
                      <Download className="h-4 w-4" />
                      <span>{item.downloads}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-gaming-text-muted">
                      <Star className="h-4 w-4 text-yellow-400" />
                      <span>{item.rating}</span>
                    </div>
                  </div>

                  <Button className="btn-gaming btn-3d w-full">
                    <Download className="mr-2 h-4 w-4" />
                    Download Now
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-16">
          <Button className="btn-gaming-outline btn-3d text-lg px-8 py-4">
            View All Content
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Showcase;