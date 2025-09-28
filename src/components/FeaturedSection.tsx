import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Map, Wrench, Image, Download, Star, Clock } from "lucide-react";

const FeaturedSection = () => {
  const featuredItems = [
    {
      id: 1,
      title: "Epic Survival World",
      description: "A massive survival world with custom terrain, villages, and hidden treasures.",
      category: "World",
      icon: Map,
      downloads: "45.2K",
      rating: "4.9",
      size: "125 MB",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=225&fit=crop",
    },
    {
      id: 2,
      title: "Advanced Redstone Pack",
      description: "Professional redstone contraptions and automation systems for Java Edition.",
      category: "Addon",
      icon: Wrench,
      downloads: "32.1K",
      rating: "4.8",
      size: "15 MB",
      image: "https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?w=400&h=225&fit=crop",
    },
    {
      id: 3,
      title: "Realistic Shaders",
      description: "High-quality shaders that enhance lighting and visual effects.",
      category: "Shader",
      icon: Image,
      downloads: "89.5K",
      rating: "4.9",
      size: "85 MB",
      image: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=400&h=225&fit=crop",
    },
  ];

  return (
    <section className="py-24 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Featured Content
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover our most popular worlds, addons, and shaders crafted by the community
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredItems.map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.id} className="minecraft-block bg-card hover:bg-card/80 transition-all duration-300 overflow-hidden group">
                <div className="relative">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary text-primary-foreground px-2 py-1 rounded text-sm font-medium">
                      {item.category}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="bg-background/80 backdrop-blur-sm p-2 rounded-full">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                  </div>
                </div>

                <CardHeader>
                  <CardTitle className="text-foreground group-hover:text-primary transition-colors">
                    {item.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {item.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Download className="h-4 w-4" />
                      <span>{item.downloads}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-minecraft-gold" />
                      <span>{item.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{item.size}</span>
                    </div>
                  </div>

                  <Button 
                    className="w-full bg-primary hover:bg-primary-hover text-primary-foreground"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            size="lg"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            View All Content
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;