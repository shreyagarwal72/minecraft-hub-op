import Layout from "@/components/Layout";
import PageHead from "@/components/PageHead";
import SEOHead from "@/components/SEOHead";
import { ROUTE_SEO } from "@/config/seo";
import LibraryBrowser from "@/components/LibraryBrowser";
import UpdateBar from "@/components/UpdateBar";
import { useLibrary } from "@/hooks/useLibrary";

const Shaders = () => {
  const { byType } = useLibrary();
  const shaders = byType("shader");
  return (
    <Layout background="deep">
      <SEOHead
        {...ROUTE_SEO["/shaders"]}
        structuredData={{
          "@context": "https://schema.org", "@type": "CollectionPage", name: "Minecraft Java Shaders",
          mainEntity: { "@type": "ItemList", itemListElement: shaders.map((s, i) => ({ "@type": "ListItem", position: i + 1, name: s.title })) },
        }}
      />
      <div className="mc-container">
        <PageHead icon="glowstone" title="Shaders" subtitle="Better light, shadows and water. Links go to the official pages. Install with Iris or OptiFine." />
        <div className="mc-stack">
          <UpdateBar />
          <LibraryBrowser entries={shaders} showType={false} idPrefix="shaders" />
        </div>
      </div>
    </Layout>
  );
};

export default Shaders;
