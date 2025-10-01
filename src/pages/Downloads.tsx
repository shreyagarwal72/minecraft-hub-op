import { Download, Star, Shield, Zap, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import modrinthImage from "@/assets/modrinth-launcher.webp";

const Downloads = () => {
  const launcher = {
    name: "Modrinth App",
    title: "Best Minecraft Launcher",
    description: "The ultimate Minecraft launcher with seamless mod management, easy installation, and a beautiful interface. Modrinth App revolutionizes how you play Minecraft with automatic updates, secure downloads, and an intuitive design that makes modding accessible to everyone.",
    image: modrinthImage,
    downloadLink: "https://launcher-files.modrinth.com/versions/0.10.7/windows/Modrinth%20App_0.10.7_x64-setup.exe",
    version: "v0.10.7",
    platform: "Windows",
    features: [
      "Easy Mod Management",
      "One-Click Installation", 
      "Automatic Updates",
      "Beautiful Interface",
      "Secure Downloads",
      "Multiple Minecraft Versions"
    ],
    highlights: [
      { icon: Shield, text: "100% Safe & Secure" },
      { icon: Zap, text: "Lightning Fast Downloads" },
      { icon: Globe, text: "Global CDN Network" },
      { icon: Star, text: "Community Favorite" }
    ]
  };

  const handleDownload = () => {
    window.open(launcher.downloadLink, '_blank');
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": launcher.name,
    "description": launcher.description,
    "applicationCategory": "Game Launcher",
    "operatingSystem": "Windows",
    "downloadUrl": launcher.downloadLink,
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  return (
    <>
      <head>
        <title>Downloads - Best Minecraft Launcher | Minecraft Java Hub</title>
        <meta name="description" content="Download the best Minecraft launcher - Modrinth App. Easy mod management, secure downloads, and beautiful interface for the ultimate Minecraft experience." />
        <meta name="keywords" content="minecraft launcher, modrinth app, minecraft mods, launcher download, minecraft java launcher" />
        <link rel="canonical" href="https://yoursite.com/downloads" />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
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
                  <span className="text-primary">Best</span> Minecraft Launcher
                </h1>
                <p className="text-xl text-gaming-text mb-8 animate-fade-in">
                  Download the ultimate Minecraft launcher with seamless mod management and beautiful interface
                </p>
                <div className="flex flex-wrap justify-center gap-4 text-sm text-gaming-text">
                  <Badge variant="outline" className="border-primary text-primary">
                    Free Download
                  </Badge>
                  <Badge variant="outline" className="border-primary text-primary">
                    Easy Installation
                  </Badge>
                  <Badge variant="outline" className="border-primary text-primary">
                    Secure & Safe
                  </Badge>
                </div>
              </div>
            </div>
          </header>

          {/* Main Launcher Card */}
          <section className="py-20">
            <div className="container mx-auto px-4 max-w-7xl">
              <div className="max-w-4xl mx-auto">
                <Card className="gaming-card hover-scale group overflow-hidden animate-fade-in">
                  <div className="grid md:grid-cols-2 gap-0">
                    {/* Image Section */}
                    <div className="relative overflow-hidden">
                      <img
                        src={launcher.image}
                        alt={`${launcher.name} - ${launcher.title} interface preview`}
                        className="w-full h-full object-cover min-h-[300px] transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <Badge className="absolute top-4 right-4 bg-primary/90 text-white">
                        {launcher.version}
                      </Badge>
                      <Badge className="absolute top-4 left-4 bg-secondary/90 text-white">
                        {launcher.platform}
                      </Badge>
                    </div>
                    
                    {/* Content Section */}
                    <div className="p-8">
                      <CardHeader className="p-0 mb-6">
                        <CardTitle className="text-3xl text-white mb-2 group-hover:text-primary transition-colors">
                          {launcher.name}
                        </CardTitle>
                        <h2 className="text-xl text-primary font-semibold mb-3">
                          {launcher.title}
                        </h2>
                        <CardDescription className="text-gaming-text text-base leading-relaxed">
                          {launcher.description}
                        </CardDescription>
                      </CardHeader>
                      
                      <CardContent className="p-0 space-y-6">
                        {/* Features */}
                        <div>
                          <h3 className="text-lg font-semibold text-white mb-3">Key Features:</h3>
                          <div className="grid grid-cols-2 gap-2">
                            {launcher.features.map((feature) => (
                              <Badge key={feature} variant="secondary" className="text-xs justify-start">
                                {feature}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Highlights */}
                        <div>
                          <h3 className="text-lg font-semibold text-white mb-3">Why Choose Modrinth:</h3>
                          <div className="space-y-2">
                            {launcher.highlights.map((highlight, index) => {
                              const Icon = highlight.icon;
                              return (
                                <div key={index} className="flex items-center gap-3 text-gaming-text">
                                  <Icon className="h-4 w-4 text-primary" />
                                  <span className="text-sm">{highlight.text}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                        
                        {/* Download Button */}
                        <Button
                          className="w-full btn-gaming text-lg py-3 group-hover:animate-pulse"
                          onClick={handleDownload}
                        >
                          <Download className="w-5 h-5 mr-2" />
                          Download {launcher.name} ({launcher.version})
                        </Button>
                      </CardContent>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </section>

          {/* Installation Guide */}
          <section className="py-20 bg-gaming-surface">
            <div className="container mx-auto px-4 max-w-7xl">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl font-bold text-white mb-8">How to Install Modrinth App</h2>
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="space-y-4">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto">
                      <span className="text-white font-bold">1</span>
                    </div>
                    <h3 className="text-xl font-semibold text-white">Download</h3>
                    <p className="text-gaming-text">Click the download button above to get the latest version of Modrinth App for Windows.</p>
                  </div>
                  <div className="space-y-4">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto">
                      <span className="text-white font-bold">2</span>
                    </div>
                    <h3 className="text-xl font-semibold text-white">Install</h3>
                    <p className="text-gaming-text">Run the installer and follow the simple setup wizard to install Modrinth App on your system.</p>
                  </div>
                  <div className="space-y-4">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto">
                      <span className="text-white font-bold">3</span>
                    </div>
                    <h3 className="text-xl font-semibold text-white">Launch & Play</h3>
                    <p className="text-gaming-text">Open Modrinth App, browse mods and modpacks, and start your enhanced Minecraft experience!</p>
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

export default Downloads;