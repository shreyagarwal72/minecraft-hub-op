import Layout from "@/components/Layout";
import PageHead from "@/components/PageHead";
import SEOHead from "@/components/SEOHead";
import { ROUTE_SEO } from "@/config/seo";
import LibraryCard from "@/components/LibraryCard";
import McButton from "@/components/McButton";
import { useLibrary } from "@/hooks/useLibrary";

const BulkyStarWorlds = () => {
  const { byType } = useLibrary();
  const worlds = byType("world").filter((w) => w.author === "Bulky Star");

  return (
    <Layout background="stone">
      <SEOHead
        {...ROUTE_SEO["/worlds/bulky-star"]}
        breadcrumb="Bulky Star"
        structuredData={{
          "@context": "https://schema.org", "@type": "CollectionPage", name: "Bulky Star Minecraft Worlds",
          mainEntity: { "@type": "ItemList", itemListElement: worlds.map((w, i) => ({ "@type": "ListItem", position: i + 1, name: w.title })) },
        }}
      />
      <div className="mc-container mc-container--narrow">
        <PageHead icon="grass" title="Bulky Star Worlds" subtitle="Worlds by Bulky Star. Files are hosted by the creator, not by us." />
        <div className="mc-stack">
          <McButton to="/worlds" size="sm" variant="dark">Back to world list</McButton>
          {worlds.map((w) => <LibraryCard key={w.id} entry={w} row />)}
        </div>
      </div>
    </Layout>
  );
};

export default BulkyStarWorlds;
