import { Download, Gamepad2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import spunkyBoostImage from "@/assets/spunky-boost.jpg";
import spunkyOptimisedImage from "@/assets/spunky-optimised.jpg";

const Modpacks = () => {
  const modpacks = [
    {
      id: 1,
      name: "Spunky Boost (for Pojav)",
      version: "v1.21.8",
      description: "Optimized modpack specifically designed for Pojav Launcher users. Enhanced performance, smooth gameplay, and mobile-friendly optimization for the best Java Edition experience on mobile devices.",
      image: spunkyBoostImage,
      downloadLink: "https://www.mediafire.com/file/nwhbvcfwmoocxxh/Spunky+Boost+1.21.8+(1).zip/file",
      features: ["Pojav Optimized", "Mobile Friendly", "Performance Boost", "Java Edition"],
      compatibility: "Pojav Launcher"
    },
    {
      id: 2,
      name: "Spunky Optimised",
      version: "v1.21.8",
      description: "High-performance modpack with advanced optimizations and enhanced features. Perfect for players who want the best performance without sacrificing visual quality and gameplay experience.",
      image: spunkyOptimisedImage,
      downloadLink: "https://www.mediafire.com/file/kahadb1v4snxbo7/Spunky+Optimized+1.21.8.zip/file",
      features: ["High Performance", "Enhanced Graphics", "Memory Optimized", "FPS Boost"],
      compatibility: "All Launchers"
    }
  ];

  const handleDownload = (downloadLink: string, modpackName: string) => {
    window.open(downloadLink, '_blank');
  };

  return (
    <>
      <head>
        <title>Minecraft Modpacks - Performance Optimized | Minecraft Java Hub</title>
        <meta name="description" content="Download optimized Minecraft modpacks including Spunky Boost for Pojav and Spunky Optimised. Enhanced performance and mobile-friendly gameplay." />
        <meta name="keywords" content="minecraft modpacks, pojav launcher, spunky boost, minecraft optimization, java edition modpacks" />
        <link rel="canonical" href="https://yoursite.com/modpacks" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Minecraft Modpacks",
            "description": "Collection of performance-optimized modpacks for Minecraft Java Edition",
            "url": "https://yoursite.com/modpacks",
            "mainEntity": {
              "@type": "ItemList",
              "itemListElement": modpacks.map((modpack, index) => ({
                "@type": "SoftwareApplication",
                "position": index + 1,
                "name": modpack.name,
                "description": modpack.description,
                "applicationCategory": "Game Enhancement",
                "operatingSystem": "Minecraft Java Edition"
              }))
            }
          })}
        </script>
      </head>
      <div className="min-h-screen bg-gaming-bg">
        <Header />
        
        <main className="pt-20">
          {/* Hero Section */}
          <header className="bg-gradient-to-b from-gaming-surface to-gaming-bg py-20">
            <div className="container mx-auto px-4 max-w-7xl">
              <div className="text-center max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
                  Minecraft <span className="text-primary">Modpacks</span>
                </h1>
                <p className="text-xl text-gaming-text mb-8 animate-fade-in">
                  Enhanced modpacks for optimized performance and incredible gameplay experience
                </p>
                <div className="flex flex-wrap justify-center gap-4 text-sm text-gaming-text">
                  <Badge variant="outline" className="border-primary text-primary">
                    Performance Optimized
                  </Badge>
                  <Badge variant="outline" className="border-primary text-primary">
                    Mobile Compatible
                  </Badge>
                  <Badge variant="outline" className="border-primary text-primary">
                    Java Edition
                  </Badge>
                </div>
              </div>
            </div>
          </header>

          {/* Modpacks Grid */}
          <section className="py-20">
            <div className="container mx-auto px-4 max-w-7xl">
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {modpacks.map((modpack, index) => (
                  <article key={modpack.id} className="gaming-card hover-scale group overflow-hidden animate-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
                    <div className="relative overflow-hidden">
                      <img
                        src={modpack.image}
                        alt={`${modpack.name} modpack preview with optimized performance features`}
                        className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <Badge className="absolute top-4 right-4 bg-primary/90 text-white">
                        {modpack.version}
                      </Badge>
                      <Badge className="absolute top-4 left-4 bg-secondary/90 text-white">
                        <Gamepad2 className="w-3 h-3 mr-1" />
                        {modpack.compatibility}
                      </Badge>
                    </div>
                    
                    <CardHeader>
                      <CardTitle className="text-xl text-white group-hover:text-primary transition-colors">
                        {modpack.name}
                      </CardTitle>
                      <CardDescription className="text-gaming-text">
                        {modpack.description}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {modpack.features.map((feature) => (
                          <Badge key={feature} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="text-primary font-medium text-center py-2">
                        Compatible with {modpack.compatibility}
                      </div>
                      
                      <Button
                        className="w-full btn-gaming"
                        onClick={() => handleDownload(modpack.downloadLink, modpack.name)}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download {modpack.name}
                      </Button>
                    </CardContent>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* Installation Guide */}
          <section className="py-20 bg-gaming-surface">
            <div className="container mx-auto px-4 max-w-7xl">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl font-bold text-white mb-8">How to Install Modpacks</h2>
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="space-y-4">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto">
                      <span className="text-white font-bold">1</span>
                    </div>
                    <h3 className="text-xl font-semibold text-white">Download Modpack</h3>
                    <p className="text-gaming-text">Choose and download your preferred modpack from our collection above.</p>
                  </div>
                  <div className="space-y-4">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto">
                      <span className="text-white font-bold">2</span>
                    </div>
                    <h3 className="text-xl font-semibold text-white">Extract Files</h3>
                    <p className="text-gaming-text">Extract the modpack files to your Minecraft mods folder or launcher directory.</p>
                  </div>
                  <div className="space-y-4">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto">
                      <span className="text-white font-bold">3</span>
                    </div>
                    <h3 className="text-xl font-semibold text-white">Launch & Play</h3>
                    <p className="text-gaming-text">Start your launcher, select the modpack profile, and enjoy enhanced gameplay!</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Modpacks;