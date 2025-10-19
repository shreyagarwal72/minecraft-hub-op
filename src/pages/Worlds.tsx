import { FolderOpen, Download, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import { useNavigate } from "react-router-dom";
import bulkyStarPreview from "@/assets/bulky-star-preview.jpg";

const Worlds = () => {
  const navigate = useNavigate();

  const worldFolders = [
    {
      name: "Bulky Star Minecraft World",
      description: "Incredible Minecraft worlds created by Bulky Star featuring massive builds, advanced redstone, and breathtaking landscapes built over thousands of in-game days.",
      image: bulkyStarPreview,
      creator: "Bulky Star",
      worldCount: 2,
      route: "/worlds/bulky-star",
      features: [
        "15,000+ Days of Building",
        "Epic Constructions", 
        "Custom Terrain",
        "Advanced Redstone"
      ]
    }
  ];

  const handleFolderClick = (route: string) => {
    navigate(route);
  };

  return (
    <>
      <head>
        <title>Minecraft Worlds - Epic Custom Builds & Adventures | Minecraft Java Hub</title>
        <meta name="description" content="Explore amazing Minecraft world collections featuring epic builds, custom terrain, and incredible adventures. Download worlds for Java Edition." />
        <meta name="keywords" content="minecraft worlds, custom worlds, epic builds, bulky star worlds, minecraft adventures, java edition worlds" />
        <link rel="canonical" href="https://yoursite.com/worlds" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Minecraft Worlds Collection",
            "description": "Browse collections of custom Minecraft worlds with epic builds and adventures",
            "url": "https://yoursite.com/worlds"
          })}
        </script>
      </head>
      <div className="min-h-screen bg-gaming-bg">
        <Header />
        <main className="py-16">
          {/* Hero Section */}
          <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-gaming-text mb-6">
                Minecraft Worlds
              </h1>
              <p className="text-xl text-gaming-text/80 mb-8 max-w-3xl mx-auto">
                Discover incredible Minecraft worlds from talented creators. Browse through collections of amazing builds, custom terrain, and epic adventures.
              </p>
              <div className="flex flex-wrap justify-center gap-2 mb-8">
                <Badge variant="secondary" className="bg-gaming-accent/20 text-gaming-accent border-gaming-accent/30">
                  Java Edition
                </Badge>
                <Badge variant="secondary" className="bg-gaming-accent/20 text-gaming-accent border-gaming-accent/30">
                  Custom Worlds
                </Badge>
                <Badge variant="secondary" className="bg-gaming-accent/20 text-gaming-accent border-gaming-accent/30">
                  Epic Builds
                </Badge>
              </div>
            </div>
          </header>

          {/* World Folders Grid */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
            <h2 className="text-2xl font-bold text-gaming-text mb-8">World Collections</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {worldFolders.map((folder, index) => (
                <article key={index} className="bg-card border-border hover:border-gaming-accent/50 transition-colors group cursor-pointer">
                  <div className="aspect-video overflow-hidden rounded-t-lg relative">
                    <img
                      src={folder.image}
                      alt={`${folder.name} minecraft world collection preview`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <FolderOpen className="h-16 w-16 text-white/80" />
                    </div>
                  </div>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-xl text-gaming-text mb-2">{folder.name}</CardTitle>
                        <CardDescription className="text-gaming-text/70 mb-3">
                          by {folder.creator}
                        </CardDescription>
                      </div>
                      <div className="flex items-center space-x-1 text-gaming-accent">
                        <Users className="h-4 w-4" />
                        <span className="text-sm font-medium">{folder.worldCount} worlds</span>
                      </div>
                    </div>
                    <p className="text-gaming-text/80 text-sm leading-relaxed">
                      {folder.description}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-6">
                      <h4 className="text-sm font-medium text-gaming-text mb-3">Collection Features:</h4>
                      <div className="flex flex-wrap gap-2">
                        {folder.features.map((feature, featureIndex) => (
                          <Badge
                            key={featureIndex}
                            variant="outline"
                            className="border-gaming-accent/30 text-gaming-accent/80 bg-gaming-accent/10"
                          >
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Button
                      onClick={() => handleFolderClick(folder.route)}
                      className="w-full bg-gaming-accent hover:bg-gaming-accent/90 text-gaming-bg font-medium"
                    >
                      <FolderOpen className="h-4 w-4 mr-2" />
                      Browse Worlds
                    </Button>
                  </CardContent>
                </article>
              ))}
            </div>
          </section>

          {/* Info Section */}
          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-2xl text-gaming-text">How to Use</CardTitle>
                <CardDescription className="text-gaming-text/70">
                  Explore world collections and download amazing Minecraft creations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-gaming-accent rounded-full flex items-center justify-center text-gaming-bg font-bold">
                        1
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium text-gaming-text mb-1">Browse Collections</h3>
                      <p className="text-gaming-text/70 text-sm">
                        Click on any world collection to see all available worlds from that creator.
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-gaming-accent rounded-full flex items-center justify-center text-gaming-bg font-bold">
                        2
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium text-gaming-text mb-1">Choose Your World</h3>
                      <p className="text-gaming-text/70 text-sm">
                        Browse through individual worlds and find the perfect one for your Minecraft experience.
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-gaming-accent rounded-full flex items-center justify-center text-gaming-bg font-bold">
                        3
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium text-gaming-text mb-1">Download & Play</h3>
                      <p className="text-gaming-text/70 text-sm">
                        Download the world file and follow the installation guide to start playing.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </main>
      </div>
    </>
  );
};

export default Worlds;