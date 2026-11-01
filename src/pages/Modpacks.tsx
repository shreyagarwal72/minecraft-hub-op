import { useState } from "react";
import Layout from "@/components/Layout";
import PageHead from "@/components/PageHead";
import SEOHead from "@/components/SEOHead";
import { ROUTE_SEO } from "@/config/seo";
import McButton from "@/components/McButton";
import FilterBar from "@/components/FilterBar";
import SourceBadge from "@/components/SourceBadge";
import UpdateBar from "@/components/UpdateBar";
import { useLibrary } from "@/hooks/useLibrary";
import { useEntryFilters } from "@/hooks/useEntryFilters";
import { primarySource, type ResolvedEntry } from "@/lib/library";
import { toast } from "@/lib/toast";

const Pack = ({ e, selected, onToggle }: { e: ResolvedEntry; selected: boolean; onToggle: () => void }) => {
  const { source, url } = primarySource(e);
  return (
    <li className="mc-pack">
      <span className="mc-slot mc-pack__icon"><img src={e.image} alt="" loading="lazy" /></span>
      <span>
        <span className="mc-pack__name">{e.title}</span>
        <span className="mc-pack__desc" style={{ display: "block" }}>{e.description}</span>
        <span style={{ display: "block", marginTop: 4 }}><SourceBadge source={source} /> {e.mcVersions.length > 0 && <span className="mc-muted">MC {e.mcVersions.join(", ")}</span>}</span>
      </span>
      <span className="mc-pack__actions">
        {selected && !e.unavailable && (
          <McButton size="sm" variant="green" href={url} onClick={() => toast({ title: "Opening download", text: e.title, icon: "/icons/diamond.png" })}>Download</McButton>
        )}
        <McButton size="sm" variant={selected ? "dark" : "gray"} onClick={onToggle} ariaLabel={`${selected ? "Remove" : "Select"} ${e.title}`}>
          {selected ? "Remove" : "Select"}
        </McButton>
      </span>
    </li>
  );
};

/** Java "Resource Packs" screen: Available on the left, Selected on the right. */
const Modpacks = () => {
  const { byType } = useLibrary();
  const packs = byType("modpack", "resourcepack", "mod");
  const f = useEntryFilters(packs);
  const [picked, setPicked] = useState<string[]>([]);
  const toggle = (id: string) => setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));
  const available = f.filtered.filter((e) => !picked.includes(e.id));
  const selected = packs.filter((e) => picked.includes(e.id));

  return (
    <Layout background="dirt">
      <SEOHead
        {...ROUTE_SEO["/modpacks"]}
        structuredData={{
          "@context": "https://schema.org", "@type": "CollectionPage", name: "Minecraft Java Modpacks",
          mainEntity: { "@type": "ItemList", itemListElement: packs.map((p, i) => ({ "@type": "ListItem", position: i + 1, name: p.title })) },
        }}
      />
      <div className="mc-container">
        <PageHead icon="planks" title="Resource Packs" subtitle="Select the packs you want. Chosen packs move to the right, where you can download them." />
        <div className="mc-stack">
          <UpdateBar />
          <FilterBar f={f} showType={false} idPrefix="packs" />
          <div className="mc-packs">
            <section className="mc-packcol" aria-label="Available packs">
              <h2 className="mc-packcol__head">Available</h2>
              {available.length === 0 ? <p className="mc-packcol__empty">No packs left to select.</p> : (
                <ul className="mc-packcol__list">{available.map((e) => <Pack key={e.id} e={e} selected={false} onToggle={() => toggle(e.id)} />)}</ul>
              )}
            </section>
            <section className="mc-packcol" aria-label="Selected packs">
              <h2 className="mc-packcol__head">Selected</h2>
              {selected.length === 0 ? <p className="mc-packcol__empty">Nothing selected yet.</p> : (
                <ul className="mc-packcol__list">{selected.map((e) => <Pack key={e.id} e={e} selected onToggle={() => toggle(e.id)} />)}</ul>
              )}
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Modpacks;
