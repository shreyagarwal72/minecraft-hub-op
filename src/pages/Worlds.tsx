import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import PageHead from "@/components/PageHead";
import SEOHead from "@/components/SEOHead";
import { ROUTE_SEO } from "@/config/seo";
import LibraryCard from "@/components/LibraryCard";
import UpdateBar from "@/components/UpdateBar";
import { useLibrary } from "@/hooks/useLibrary";

const BULKY = "Bulky Star";

const Worlds = () => {
  const { byType } = useLibrary();
  const worlds = byType("world");
  const bulky = worlds.filter((w) => w.author === BULKY);
  const others = worlds.filter((w) => w.author !== BULKY);

  return (
    <Layout background="stone">
      <SEOHead
        {...ROUTE_SEO["/worlds"]}
        structuredData={{
          "@context": "https://schema.org", "@type": "CollectionPage", name: "Minecraft Java Worlds",
          description: "Downloadable Minecraft Java Edition worlds.",
        }}
      />
      <div className="mc-container mc-container--narrow">
        <PageHead icon="grass" title="Select World" subtitle="Pick a world folder. Back up your saves before you open anything new." />
        <div className="mc-stack">
          <UpdateBar />
          <div className="mc-worldlist" role="list">
            {bulky.length > 0 && (
              <Link to="/worlds/bulky-star" className="mc-worldrow" role="listitem">
                <span className="mc-slot mc-worldrow__thumb"><img src="/library/bulky-star-preview.jpg" alt="" loading="lazy" /></span>
                <span>
                  <span className="mc-worldrow__name">Bulky Star Minecraft Worlds</span>
                  <span className="mc-worldrow__line" style={{ display: "block" }}>Folder · <b>{bulky.length}</b> worlds</span>
                  <span className="mc-worldrow__line" style={{ display: "block" }}>Massive builds, advanced redstone and custom terrain.</span>
                </span>
              </Link>
            )}
          </div>
          {others.map((w) => <LibraryCard key={w.id} entry={w} row />)}
        </div>
      </div>
    </Layout>
  );
};

export default Worlds;
