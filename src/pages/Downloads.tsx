import { Download, Star, Shield, Zap, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Helmet } from "react-helmet-async";
import LiquidGlassHeader from "@/components/LiquidGlassHeader";
import modrinthImage from "@/assets/modrinth-launcher.webp";
import legacyLauncherImage from "@/assets/legacy-launcher.jpg";
import tlauncherImage from "@/assets/tlauncher.png";

const Downloads = () => {
  const launchers = [
    {
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
    },
    {
      name: "Legacy Launcher",
      title: "Classic Minecraft Launcher",
      description: "A reliable and feature-rich launcher for Minecraft Java Edition. Legacy Launcher offers excellent performance, customizable settings, and support for various Minecraft versions, making it a popular choice among players.",
      image: legacyLauncherImage,
      downloadLink: "https://github.com/LauncherMeta/Mirror/releases/download/1.6.4.0/LegacyLauncher.exe",
      version: "v1.6.4.0",
      platform: "Windows",
      features: [
        "Multiple Versions Support",
        "Custom Skins", 
        "Mod Compatibility",
        "Fast Performance",
        "Easy Setup",
        "Lightweight"
      ],
      highlights: [
        { icon: Shield, text: "Trusted by Community" },
        { icon: Zap, text: "Fast & Lightweight" },
        { icon: Globe, text: "Multi-Version Support" },
        { icon: Star, text: "Popular Choice" }
      ]
    },
    {
      name: "TLauncher",
      title: "Feature-Rich Minecraft Launcher",
      description: "TLauncher is a comprehensive Minecraft launcher with extensive features including skin management, mod support, and multiple account handling. Perfect for players who want advanced customization options.",
      image: tlauncherImage,
      downloadLink: "https://www.mediafire.com/file/jh6r08qofdy1390/TLauncher-Installer-1.8.9.exe/file",
      version: "v1.8.9",
      platform: "Windows",
      features: [
        "Skin Manager",
        "Mod Support", 
        "Multiple Accounts",
        "Version Switcher",
        "Easy Installation",
        "Resource Packs"
      ],
      highlights: [
        { icon: Shield, text: "Secure Downloads" },
        { icon: Zap, text: "Feature Rich" },
        { icon: Globe, text: "Wide Compatibility" },
        { icon: Star, text: "Active Community" }
      ]
    }
  ];

  const handleDownload = (downloadLink: string) => {
    window.open(downloadLink, '_blank');
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Minecraft Launchers",
    "description": "Download the best Minecraft launchers including Modrinth App, Legacy Launcher, and TLauncher"
  };

  return (
    <>
      <Helmet>
        <title>Downloads - Best Minecraft Launcher | Minecraft Java Hub</title>
        <meta name="description" content="Download the best Minecraft launcher - Modrinth App. Easy mod management, secure downloads, and beautiful interface for the ultimate Minecraft experience." />
        <meta name="keywords" content="minecraft launcher, modrinth app, minecraft mods, launcher download, minecraft java launcher" />
        <link rel="canonical" href="https://yoursite.com/downloads" />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      <div className="min-h-screen bg-gaming-bg">
        <LiquidGlassHeader />
        
        <main className="pt-20">
          {/* Hero Section */}
          <header className="bg-gradient-to-b from-gaming-surface to-gaming-bg py-12 md:py-20">
            <div className="container mx-auto px-4 max-w-7xl">
              <div className="text-center max-w-4xl mx-auto">
                <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-4 md:mb-6 animate-fade-in">
                  <span className="text-primary">Best</span> Minecraft Launcher
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-gaming-text mb-6 md:mb-8 animate-fade-in px-2">
                  Download the ultimate Minecraft launcher with seamless mod management and beautiful interface
                </p>
                <div className="flex flex-wrap justify-center gap-2 md:gap-4 text-xs sm:text-sm text-gaming-text px-2">
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

          {/* Launchers Grid */}
          <section className="py-12 md:py-20">
            <div className="container mx-auto px-4 max-w-7xl">
              <div className="grid gap-6 md:gap-8 max-w-6xl mx-auto">
                {launchers.map((launcher, index) => (
                  <Card key={index} className="gaming-card hover-scale group overflow-hidden animate-fade-in">
                    <div className="grid md:grid-cols-2 gap-0">
                      {/* Image Section */}
                      <div className="relative overflow-hidden">
                        <img
                          src={launcher.image}
                          alt={`${launcher.name} - ${launcher.title} interface preview`}
                          className="w-full h-full object-cover min-h-[200px] sm:min-h-[250px] md:min-h-[300px] transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        <Badge className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-primary/90 text-white text-xs">
                          {launcher.version}
                        </Badge>
                        <Badge className="absolute top-2 sm:top-4 left-2 sm:left-4 bg-secondary/90 text-white text-xs">
                          {launcher.platform}
                        </Badge>
                      </div>
                      
                      {/* Content Section */}
                      <div className="p-4 sm:p-6 md:p-8">
                        <CardHeader className="p-0 mb-4 md:mb-6">
                          <CardTitle className="text-xl sm:text-2xl md:text-3xl text-white mb-2 group-hover:text-primary transition-colors">
                            {launcher.name}
                          </CardTitle>
                          <h2 className="text-base sm:text-lg md:text-xl text-primary font-semibold mb-2 md:mb-3">
                            {launcher.title}
                          </h2>
                          <CardDescription className="text-gaming-text text-sm sm:text-base leading-relaxed">
                            {launcher.description}
                          </CardDescription>
                        </CardHeader>
                        
                        <CardContent className="p-0 space-y-4 md:space-y-6">
                          {/* Features */}
                          <div>
                            <h3 className="text-base sm:text-lg font-semibold text-white mb-2 md:mb-3">Key Features:</h3>
                            <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
                              {launcher.features.map((feature) => (
                                <Badge key={feature} variant="secondary" className="text-[10px] sm:text-xs justify-start py-1">
                                  {feature}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          {/* Highlights */}
                          <div>
                            <h3 className="text-base sm:text-lg font-semibold text-white mb-2 md:mb-3">Why Choose {launcher.name}:</h3>
                            <div className="space-y-1.5 sm:space-y-2">
                              {launcher.highlights.map((highlight, idx) => {
                                const Icon = highlight.icon;
                                return (
                                  <div key={idx} className="flex items-center gap-2 sm:gap-3 text-gaming-text">
                                    <Icon className="h-3 w-3 sm:h-4 sm:w-4 text-primary flex-shrink-0" />
                                    <span className="text-xs sm:text-sm">{highlight.text}</span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                          
                          {/* Download Button */}
                          <Button
                            className="w-full btn-gaming text-sm sm:text-base md:text-lg py-2.5 sm:py-3 group-hover:animate-pulse"
                            onClick={() => handleDownload(launcher.downloadLink)}
                          >
                            <Download className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                            <span className="truncate">Download {launcher.name}</span>
                          </Button>
                        </CardContent>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Installation Guide */}
          <section className="py-12 md:py-20 bg-gaming-surface">
            <div className="container mx-auto px-4 max-w-7xl">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 md:mb-8 px-2">How to Install Your Launcher</h2>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
                  <div className="space-y-3 md:space-y-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary rounded-full flex items-center justify-center mx-auto">
                      <span className="text-white font-bold text-sm sm:text-base">1</span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-white">Download</h3>
                    <p className="text-sm sm:text-base text-gaming-text px-2">Click the download button to get your preferred launcher for Windows.</p>
                  </div>
                  <div className="space-y-3 md:space-y-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary rounded-full flex items-center justify-center mx-auto">
                      <span className="text-white font-bold text-sm sm:text-base">2</span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-white">Install</h3>
                    <p className="text-sm sm:text-base text-gaming-text px-2">Run the installer and follow the simple setup wizard to install on your system.</p>
                  </div>
                  <div className="space-y-3 md:space-y-4 sm:col-span-2 md:col-span-1">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary rounded-full flex items-center justify-center mx-auto">
                      <span className="text-white font-bold text-sm sm:text-base">3</span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-white">Launch & Play</h3>
                    <p className="text-sm sm:text-base text-gaming-text px-2">Open your launcher and start your enhanced Minecraft experience!</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default Downloads;