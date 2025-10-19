import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Showcase from "@/components/Showcase";

const Index = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Minecraft Java Hub",
    "description": "Your ultimate destination for Minecraft Java Edition worlds, addons, shaders, and downloads",
    "url": "https://yoursite.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://yoursite.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <>
      <head>
        <title>Minecraft Java Hub - Professional Gaming Content</title>
        <meta name="description" content="Your ultimate destination for Minecraft Java Edition worlds, addons, shaders, and downloads. Professional gaming content for builders, adventurers, and creators." />
        <meta name="keywords" content="Minecraft Java, worlds, addons, shaders, downloads, gaming, survival, adventure, professional" />
        <link rel="canonical" href="https://yoursite.com/" />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </head>
      <div className="min-h-screen bg-gaming-bg">
        <Header />
        <main>
          <Hero />
          <Showcase />
        </main>
      </div>
    </>
  );
};

export default Index;
