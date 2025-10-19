import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import bslShaderImage from "@/assets/bsl-shader.jpg";
import complementaryShaderImage from "@/assets/complementary-shader.jpg";
import photonShaderImage from "@/assets/photon-shader.jpg";

const Shaders = () => {
  const shaders = [
    {
      id: 1,
      name: "BSL Shader",
      version: "v10.0",
      description: "BSL is one of the most popular shader packs for Minecraft, offering realistic lighting, shadows, and water effects. Perfect for creating stunning screenshots and immersive gameplay.",
      image: bslShaderImage,
      downloadLink: "https://www.mediafire.com/file/raqx1d7kv6z15o1/BSL_v10.0.zip/file",
      features: ["Volumetric Lighting", "Realistic Water", "Dynamic Shadows", "Weather Effects"]
    },
    {
      id: 2,
      name: "Complementary Reimagined",
      version: "r5.5.1",
      description: "A complete reimagining of the original Complementary shader, featuring enhanced performance and stunning visual improvements for the ultimate Minecraft experience.",
      image: complementaryShaderImage,
      downloadLink: "https://www.mediafire.com/file/oqmxv7t6ndd9mtw/ComplementaryReimagined_r5.5.1.zip/file",
      features: ["Enhanced Performance", "Improved Colors", "Better Optimization", "Modern Effects"]
    },
    {
      id: 3,
      name: "Photon Shader",
      version: "v1.2a",
      description: "Photon offers advanced lighting systems and modern graphics enhancements. Experience Minecraft like never before with cutting-edge visual effects and optimized performance.",
      image: photonShaderImage,
      downloadLink: "https://www.mediafire.com/file/0ka0xd089kx70eh/photon_v1.2a.zip/file",
      features: ["Advanced Lighting", "Modern Graphics", "Night Vision", "Stellar Effects"]
    }
  ];

  const handleDownload = (downloadLink: string, shaderName: string) => {
    window.open(downloadLink, '_blank');
  };

  return (
    <>
      <head>
        <title>Minecraft Java Shaders - High-Quality Visual Effects | Minecraft Java Hub</title>
        <meta name="description" content="Download stunning Minecraft Java Edition shaders including BSL, Complementary Reimagined, and Photon. Transform your world with realistic lighting and effects." />
        <meta name="keywords" content="minecraft shaders, BSL shader, complementary shader, photon shader, minecraft lighting, java edition shaders" />
        <link rel="canonical" href="https://yoursite.com/shaders" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Minecraft Java Shaders",
            "description": "Collection of high-quality shaders for Minecraft Java Edition",
            "url": "https://yoursite.com/shaders",
            "mainEntity": {
              "@type": "ItemList",
              "itemListElement": shaders.map((shader, index) => ({
                "@type": "SoftwareApplication",
                "position": index + 1,
                "name": shader.name,
                "description": shader.description,
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
            <div className="container mx-auto px-4">
              <div className="text-center max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
                  Minecraft Java <span className="text-primary">Shaders</span>
                </h1>
                <p className="text-xl text-gaming-text mb-8 animate-fade-in">
                  Transform your Minecraft world with stunning visual effects and realistic lighting
                </p>
                <div className="flex flex-wrap justify-center gap-4 text-sm text-gaming-text">
                  <Badge variant="outline" className="border-primary text-primary">
                    High Quality Graphics
                  </Badge>
                  <Badge variant="outline" className="border-primary text-primary">
                    Optimized Performance
                  </Badge>
                  <Badge variant="outline" className="border-primary text-primary">
                    Java Edition Compatible
                  </Badge>
                </div>
              </div>
            </div>
          </header>

          {/* Shaders Grid */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {shaders.map((shader, index) => (
                  <article key={shader.id} className="gaming-card hover-scale group overflow-hidden animate-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
                    <div className="relative overflow-hidden">
                      <img
                        src={shader.image}
                        alt={`${shader.name} preview showing enhanced lighting and visual effects`}
                        className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <Badge className="absolute top-4 right-4 bg-primary/90 text-white">
                        {shader.version}
                      </Badge>
                    </div>
                    
                    <CardHeader>
                      <CardTitle className="text-xl text-white group-hover:text-primary transition-colors">
                        {shader.name}
                      </CardTitle>
                      <CardDescription className="text-gaming-text">
                        {shader.description}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {shader.features.map((feature) => (
                          <Badge key={feature} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                      
                      <Button
                        className="w-full btn-gaming"
                        onClick={() => handleDownload(shader.downloadLink, shader.name)}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download {shader.name}
                      </Button>
                    </CardContent>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* Installation Guide */}
          <section className="py-20 bg-gaming-surface">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl font-bold text-white mb-8">How to Install Shaders</h2>
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="space-y-4">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto">
                      <span className="text-white font-bold">1</span>
                    </div>
                    <h3 className="text-xl font-semibold text-white">Install OptiFine</h3>
                    <p className="text-gaming-text">Download and install OptiFine for your Minecraft version to enable shader support.</p>
                  </div>
                  <div className="space-y-4">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto">
                      <span className="text-white font-bold">2</span>
                    </div>
                    <h3 className="text-xl font-semibold text-white">Download Shader</h3>
                    <p className="text-gaming-text">Choose and download your preferred shader pack from our collection above.</p>
                  </div>
                  <div className="space-y-4">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto">
                      <span className="text-white font-bold">3</span>
                    </div>
                    <h3 className="text-xl font-semibold text-white">Install & Enjoy</h3>
                    <p className="text-gaming-text">Place the shader file in your shaderpacks folder and activate it in-game.</p>
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

export default Shaders;