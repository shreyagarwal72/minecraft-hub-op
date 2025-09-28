import { Download, Star, Calendar, HardDrive, ArrowLeft } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useNavigate } from "react-router-dom";
import bulkyStarImage from "@/assets/bulky-star-15k.jpg";
import infinityCastleImage from "@/assets/infinity-castle.jpg";

const BulkyStarWorlds = () => {
  const navigate = useNavigate();

  const worlds = [
    {
      name: "Bulky Star 15k Days World",
      description: "An incredible world built over 15,000 in-game days featuring massive cities, complex redstone contraptions, and breathtaking landscapes.",
      image: bulkyStarImage,
      downloadLink: "https://drive.google.com/file/d/1nzGHCk5729sRiLHCUzOn63cn484Z-959/view?usp=sharing",
      creator: "Bulky Star",
      size: "2.1 GB",
      version: "1.20+",
      downloads: "47.2K",
      rating: 4.9,
      features: [
        "15,000+ Days of Building",
        "Massive Cities",
        "Advanced Redstone",
        "Custom Terrain"
      ]
    },
    {
      name: "Minecraft Infinity Castle",
      description: "A mystical Japanese-inspired castle with infinite possibilities, featuring traditional architecture and magical elements.",
      image: infinityCastleImage,
      downloadLink: "https://cdn.discordapp.com/attachments/1320008925864525894/1416832281322065940/INFINITY_CASTLE.rar?ex=68c84763&is=68c6f5e3&hm=3e698108eb87be14d1c6587bcb418496cd6d0f1254d57e587312c83ef0faf288&",
      creator: "Bulky Star",
      size: "850 MB",
      version: "1.19+",
      downloads: "23.8K",
      rating: 4.8,
      features: [
        "Japanese Architecture",
        "Mystical Design",
        "Multi-level Castle",
        "Cherry Blossom Gardens"
      ]
    }
  ];

  const handleDownload = (downloadLink: string, worldName: string) => {
    window.open(downloadLink, '_blank');
  };

  const handleBackToWorlds = () => {
    navigate('/worlds');
  };

  return (
    <div className="min-h-screen bg-gaming-bg">
      <Header />
      <main className="py-16">
        {/* Header with Back Button */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <Button
            onClick={handleBackToWorlds}
            variant="outline"
            className="mb-6 border-gaming-accent/30 text-gaming-accent hover:bg-gaming-accent/10"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to World Collections
          </Button>
        </section>

        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gaming-text mb-6">
              Bulky Star Minecraft Worlds
            </h1>
            <p className="text-xl text-gaming-text/80 mb-8 max-w-3xl mx-auto">
              Discover incredible Minecraft worlds created by Bulky Star. From massive cities built over thousands of days to mystical castles.
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
        </section>

        {/* Worlds Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="grid md:grid-cols-2 gap-8">
            {worlds.map((world, index) => (
              <Card key={index} className="bg-card border-border hover:border-gaming-accent/50 transition-colors group">
                <div className="aspect-video overflow-hidden rounded-t-lg">
                  <img
                    src={world.image}
                    alt={world.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl text-gaming-text mb-2">{world.name}</CardTitle>
                      <CardDescription className="text-gaming-text/70 mb-3">
                        by {world.creator}
                      </CardDescription>
                    </div>
                    <div className="flex items-center space-x-1 text-gaming-accent">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="text-sm font-medium">{world.rating}</span>
                    </div>
                  </div>
                  <p className="text-gaming-text/80 text-sm leading-relaxed">
                    {world.description}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center space-x-2 text-sm text-gaming-text/70">
                      <HardDrive className="h-4 w-4" />
                      <span>{world.size}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gaming-text/70">
                      <Calendar className="h-4 w-4" />
                      <span>{world.version}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gaming-text/70">
                      <Download className="h-4 w-4" />
                      <span>{world.downloads}</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gaming-text mb-3">Features:</h4>
                    <div className="flex flex-wrap gap-2">
                      {world.features.map((feature, featureIndex) => (
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
                    onClick={() => handleDownload(world.downloadLink, world.name)}
                    className="w-full bg-gaming-accent hover:bg-gaming-accent/90 text-gaming-bg font-medium"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download World
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Installation Guide */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-2xl text-gaming-text">Installation Guide</CardTitle>
              <CardDescription className="text-gaming-text/70">
                Follow these steps to install and play these amazing worlds
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
                    <h3 className="font-medium text-gaming-text mb-1">Download the World</h3>
                    <p className="text-gaming-text/70 text-sm">
                      Click the download button and save the world file to your computer.
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
                    <h3 className="font-medium text-gaming-text mb-1">Extract Files</h3>
                    <p className="text-gaming-text/70 text-sm">
                      Extract the downloaded file if it's compressed (ZIP/RAR format).
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
                    <h3 className="font-medium text-gaming-text mb-1">Install in Minecraft</h3>
                    <p className="text-gaming-text/70 text-sm">
                      Copy the world folder to your Minecraft saves directory and launch the game to play.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default BulkyStarWorlds;