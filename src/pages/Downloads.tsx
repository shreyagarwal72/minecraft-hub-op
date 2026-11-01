import { useState } from "react";
import Layout from "@/components/Layout";
import PageHead from "@/components/PageHead";
import SEOHead from "@/components/SEOHead";
import { ROUTE_SEO } from "@/config/seo";
import McButton from "@/components/McButton";
import LibraryBrowser from "@/components/LibraryBrowser";
import UpdateBar from "@/components/UpdateBar";
import { useLibrary } from "@/hooks/useLibrary";
import { primarySource, formatDate } from "@/lib/library";
import { toast } from "@/lib/toast";

type Channel = "release" | "snapshot" | "old";

/** Launcher-style screen: version dropdown + big PLAY button. All versions come from the Mojang manifest. */
const Downloads = () => {
  const { library, entries } = useLibrary();
  const [channel, setChannel] = useState<Channel>("release");
  const [oldId, setOldId] = useState("");
  const m = library.mojang;
  const launcher = entries.find((e) => e.id === "minecraft-launcher");
  const play = launcher ? primarySource(launcher).url : "https://www.minecraft.net/en-us/download";

  const chosen = !m ? null : channel === "release" ? m.latestRelease : channel === "snapshot" ? m.latestSnapshot : m.releases.find((r) => r.id === oldId) ?? m.releases[0];

  return (
    <Layout background="stone">
      <SEOHead
        {...ROUTE_SEO["/downloads"]}
        structuredData={{
          "@context": "https://schema.org", "@type": "CollectionPage", name: "Minecraft Launchers and Downloads",
          description: "Official and community launchers for Minecraft Java Edition.",
        }}
      />
      <div className="mc-container">
        <PageHead icon="diamond" title="Launcher" subtitle="Pick a version, then press PLAY to open the official download." />
        <div className="mc-stack" style={{ ["--gap" as string]: "24px" }}>
          <section className="mc-panel mc-launcher" aria-label="Launcher">
            <div className="mc-launcher__news">
              <img src="/library/minecraft-hero.jpg" alt="" />
              <div>Official launcher first. Modrinth App and Prism Launcher are listed below.</div>
            </div>
            <div className="mc-launcher__bar">
              <label className="mc-field" htmlFor="channel">
                <span>Version</span>
                <select id="channel" className="mc-select" value={channel} onChange={(e) => setChannel(e.target.value as Channel)}>
                  <option value="release">Latest release</option>
                  <option value="snapshot">Latest snapshot</option>
                  <option value="old">Old versions</option>
                </select>
              </label>
              {channel === "old" && m && (
                <label className="mc-field" htmlFor="old">
                  <span>Release</span>
                  <select id="old" className="mc-select" value={oldId || m.releases[0]?.id} onChange={(e) => setOldId(e.target.value)}>
                    {m.releases.map((r) => <option key={r.id} value={r.id}>{r.id}</option>)}
                  </select>
                </label>
              )}
              <p className="mc-launcher__ver" role="status">
                {chosen ? (
                  <>Selected: <b>{chosen.id}</b> · released {formatDate(chosen.releaseTime)}{channel !== "release" ? " · pick this version inside the launcher" : ""}</>
                ) : (
                  <>Version info is not loaded yet. Use <b>Check for updates</b> below.</>
                )}
              </p>
              <McButton
                href={play}
                variant="green"
                size="lg"
                block
                pulse
                className="mc-play"
                onClick={() => toast({ title: "Opening the official download", text: chosen ? `Minecraft Java ${chosen.id}` : "Minecraft Java Edition", icon: "/icons/diamond.png" })}
              >
                PLAY
              </McButton>
              {channel === "snapshot" && <p className="t-gold">Snapshots can break worlds. Use a copy.</p>}
            </div>
          </section>

          <UpdateBar />

          <section aria-labelledby="all-content">
            <h2 id="all-content" className="mc-h2 mc-h2--light" style={{ marginBottom: 16 }}>CONTENT LIBRARY</h2>
            <LibraryBrowser entries={entries.filter((e) => e.type !== "version")} idPrefix="all" />
          </section>

          <section className="mc-panel mc-panel--dark" aria-label="Source and trust policy">
            <h2 className="mc-h2 mc-h2--light">SOURCES</h2>
            <p>Green badges are providers we can query (Mojang, Modrinth, GitHub, CurseForge). Red badges are mirrors on Google Drive, MediaFire or direct links. We cannot check those files automatically, so scan what you download.</p>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Downloads;
