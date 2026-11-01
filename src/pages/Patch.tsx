import Layout from "@/components/Layout";
import PageHead from "@/components/PageHead";
import SEOHead from "@/components/SEOHead";
import { ROUTE_SEO } from "@/config/seo";
import McButton from "@/components/McButton";
import LibraryCard from "@/components/LibraryCard";
import UpdateBar from "@/components/UpdateBar";
import { useLibrary } from "@/hooks/useLibrary";
import { formatDate } from "@/lib/library";

/** Patch page: versions come from the Mojang manifest, plus the .mrpack converter tool. */
const Patch = () => {
  const { library, entries } = useLibrary();
  const m = library.mojang;
  const tool = entries.find((e) => e.id === "mrpack-to-zip");

  return (
    <Layout background="deep">
      <SEOHead
        {...ROUTE_SEO["/patch"]}
      />
      <div className="mc-container mc-container--narrow">
        <PageHead icon="obsidian" title="Patch" subtitle="The newest versions, read from Mojang's version manifest." />
        <div className="mc-stack" style={{ ["--gap" as string]: "20px" }}>
          <UpdateBar />
          <section className="mc-book" aria-label="Latest versions">
            <h2 className="mc-h2">LATEST VERSIONS</h2>
            {m ? (
              <ul className="mc-list mc-list--plain" style={{ listStyle: "none" }}>
                <li><span><b>Release {m.latestRelease.id}</b> · {formatDate(m.latestRelease.releaseTime)} · <a href={m.latestRelease.url} target="_blank" rel="noopener noreferrer">version JSON</a></span></li>
                <li><span><b>Snapshot {m.latestSnapshot.id}</b> · {formatDate(m.latestSnapshot.releaseTime)} · <a href={m.latestSnapshot.url} target="_blank" rel="noopener noreferrer">version JSON</a></span></li>
              </ul>
            ) : (
              <p>Version data has not been synced yet. Press <b>Check for updates</b> above, or run <code>npm run library:sync</code> when deploying.</p>
            )}
            <div style={{ marginTop: 14 }}>
              <McButton to="/downloads" variant="green">Go to the launcher</McButton>
            </div>
          </section>
          {tool && <LibraryCard entry={tool} row />}
        </div>
      </div>
    </Layout>
  );
};

export default Patch;
