import { Fragment, useMemo, useState, type ReactNode } from "react";
import Layout from "@/components/Layout";
import PageHead from "@/components/PageHead";
import McButton from "@/components/McButton";
import SEOHead from "@/components/SEOHead";
import { ROUTE_SEO } from "@/config/seo";
import { SOCIAL } from "@/data/site";

interface FAQItem {
  id: string;
  category: "shaders" | "launchers" | "modpacks" | "safety" | "general";
  question: string;
  answer: string;
  tags: string[];
}

const FAQ_ITEMS: FAQItem[] = [
  // Shaders
  {
    id: "install-shader",
    category: "shaders",
    question: "How do I install shaders in Minecraft Java Edition?",
    answer:
      "Installing shaders takes only a few quick steps:\n" +
      "1. Install a shader loader: **Iris** (recommended, best performance with Sodium) or **OptiFine**.\n" +
      "2. Download your desired shader pack .zip from our Shaders page (e.g. BSL, Complementary, or Photon).\n" +
      "3. Open your Minecraft folder and put the downloaded .zip directly into the **shaderpacks** folder (do not unzip it).\n" +
      "4. Launch Minecraft, go to **Options > Video Settings > Shader Packs**, select your shader, and click Apply!",
    tags: ["shaders", "iris", "optifine", "install", "graphics"],
  },
  {
    id: "shader-performance",
    category: "shaders",
    question: "Which shader pack has the best performance for low-end PCs?",
    answer:
      "**Complementary Reimagined** and **BSL Shaders** both include dedicated 'Potato' and 'Low' profiles designed specifically for low-end hardware and integrated GPUs.\n\n" +
      "For best FPS, combine **Iris + Sodium** on Fabric rather than OptiFine. Sodium provides massive engine performance improvements.",
    tags: ["shaders", "performance", "fps", "low-end", "potato"],
  },
  {
    id: "shader-pojav",
    category: "shaders",
    question: "Can I run shaders on PojavLauncher (Android)?",
    answer:
      "Yes! PojavLauncher supports shaders on mobile if your device supports the **Holy GL4ES** or **Zink** renderer. We recommend lightweight shaders with potato/low presets like **BSL (Low profile)** for smooth mobile gameplay.",
    tags: ["shaders", "pojav", "android", "mobile"],
  },

  // Launchers
  {
    id: "recommended-launcher",
    category: "launchers",
    question: "Which Minecraft launcher should I use?",
    answer:
      "We recommend three trustworthy launchers depending on your needs:\n" +
      "• **Official Minecraft Launcher**: Best for pure vanilla gameplay and beginners.\n" +
      "• **Modrinth App**: Clean, open-source, and extremely fast. Directly searches and auto-updates mods and modpacks from Modrinth.\n" +
      "• **Prism Launcher**: Lightweight and open-source. Perfect for managing multiple Minecraft instances, accounts, and mods from both Modrinth and CurseForge.",
    tags: ["launchers", "modrinth", "prism", "official", "recommendation"],
  },
  {
    id: "tlauncher-safety",
    category: "launchers",
    question: "Why do you not list unofficial launchers like TLauncher?",
    answer:
      "We strictly prioritize user security. Unofficial cracked launchers often bundle questionable telemetry, unverified third-party libraries, or risk account compromise.\n\n" +
      "We only list official or transparent open-source launchers (like the official Mojang launcher, Modrinth App, and Prism Launcher) that authenticate directly through Microsoft.",
    tags: ["launchers", "tlauncher", "safety", "security"],
  },
  {
    id: "pojav-launcher",
    category: "launchers",
    question: "What is PojavLauncher and how does it work?",
    answer:
      "PojavLauncher is an open-source launcher that allows you to play authentic Minecraft Java Edition on Android and iOS devices. It runs Java in a sandboxed environment and maps touchscreen controls to keyboard and mouse inputs.",
    tags: ["launchers", "pojav", "android", "ios", "mobile"],
  },

  // Modpacks
  {
    id: "pojav-modpack",
    category: "modpacks",
    question: "How do I install a modpack in PojavLauncher?",
    answer:
      "To install a modpack on PojavLauncher:\n" +
      "1. Download the modpack archive (such as Spunky Boost) from our Modpacks page.\n" +
      "2. In PojavLauncher, create a new profile matching the Minecraft version and loader (Fabric/Forge) specified by the pack.\n" +
      "3. Extract or copy the pack contents into your `.minecraft/` folder inside Pojav's game directory.\n" +
      "4. Launch the profile and enjoy optimized mobile performance!",
    tags: ["modpacks", "pojav", "spunky boost", "android"],
  },
  {
    id: "mrpack-converter",
    category: "modpacks",
    question: "What is the Mrpack to Zip converter on the Patch page?",
    answer:
      "Modrinth modpacks are distributed in `.mrpack` format, which is an archive containing configuration and an index of mods to download. Our built-in **Mrpack to Zip converter** runs right in your browser to inspect or convert `.mrpack` files into standard zip archives with override folders for manual installation.",
    tags: ["modpacks", "mrpack", "converter", "patch", "zip"],
  },

  // Downloads, Versions & Safety
  {
    id: "source-badges",
    category: "safety",
    question: "What does the 'unverified' source badge mean?",
    answer:
      "Every download on Minecraft Java Hub displays a source status badge:\n" +
      "• **Verified (Green)**: Queried live against official developer APIs (Mojang, Modrinth, or GitHub Releases) where hashes, file sizes, and versions are validated.\n" +
      "• **Unverified (Red)**: A third-party community mirror (Google Drive, MediaFire, direct link) for community maps and custom worlds. While reviewed, we cannot verify automated checksums, so we recommend scanning files and keeping backups.",
    tags: ["safety", "badges", "verified", "unverified", "mirrors"],
  },
  {
    id: "latest-version-source",
    category: "safety",
    question: "Where do version numbers on the site come from?",
    answer:
      "Version numbers on the Downloads and Patch pages are fetched in real-time straight from Mojang's official version manifest API (`launchermeta.mojang.com`). We never hardcode version numbers, so you always see the true current release and snapshot.",
    tags: ["versions", "manifest", "mojang", "snapshot"],
  },
  {
    id: "file-safety",
    category: "safety",
    question: "Are files on Minecraft Java Hub safe from malware?",
    answer:
      "Yes. We do not host or distribute infected files. We route downloads directly to trusted developer repositories (Modrinth, Mojang, GitHub) or scanned personal mirrors of creator worlds. All links are vetted before being added to the catalog.",
    tags: ["safety", "virus", "malware", "security"],
  },

  // General
  {
    id: "official-site",
    category: "general",
    question: "Is Minecraft Java Hub an official Minecraft website?",
    answer:
      "No. Minecraft Java Hub is an independent community hub developed by **Nextup Studio**. It is not an official Minecraft product and is not approved by, endorsed by, or associated with Mojang Studios or Microsoft.",
    tags: ["general", "official", "mojang", "microsoft", "about"],
  },
  {
    id: "contact-support",
    category: "general",
    question: "How can I contact the creators or submit a world/modpack?",
    answer:
      `You can reach us directly via email at **${SOCIAL.email}** or connect with Nextup Studio on **YouTube (@nextupstudioyt)** and **Instagram (@vanshu_ag_72)**.\n\n` +
      "You can also open issues or suggest content additions directly on our **GitHub repository**.",
    tags: ["general", "contact", "support", "email", "social"],
  },
];

const CATEGORIES = [
  { id: "all", label: "All Questions" },
  { id: "shaders", label: "Shaders" },
  { id: "launchers", label: "Launchers" },
  { id: "modpacks", label: "Modpacks" },
  { id: "safety", label: "Safety & Sources" },
  { id: "general", label: "General" },
] as const;

type CategoryId = (typeof CATEGORIES)[number]["id"];

/** Safe renderer for **bold** and newlines */
const Rich = ({ text }: { text: string }) => (
  <>
    {text.split("\n").map((line, li) => {
      const parts: ReactNode[] = line.split(/(\*\*[^*]+\*\*)/g).map((part, pi) =>
        part.startsWith("**") && part.endsWith("**") ? <b key={pi}>{part.slice(2, -2)}</b> : <Fragment key={pi}>{part}</Fragment>,
      );
      return (
        <Fragment key={li}>
          {li > 0 && <br />}
          {parts}
        </Fragment>
      );
    })}
  </>
);

const FAQ = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<CategoryId>("all");
  const [openedIds, setOpenedIds] = useState<Record<string, boolean>>({
    "install-shader": true,
    "recommended-launcher": true,
  });

  const filteredItems = useMemo(() => {
    const q = search.trim().toLowerCase();
    return FAQ_ITEMS.filter((item) => {
      const matchesCategory = activeCategory === "all" || item.category === activeCategory;
      if (!matchesCategory) return false;
      if (!q) return true;
      return (
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q) ||
        item.tags.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [search, activeCategory]);

  const toggleOpen = (id: string) => {
    setOpenedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const expandAll = () => {
    const next: Record<string, boolean> = {};
    for (const item of filteredItems) next[item.id] = true;
    setOpenedIds(next);
  };

  const collapseAll = () => {
    setOpenedIds({});
  };

  return (
    <Layout background="deep">
      <SEOHead
        {...ROUTE_SEO["/faq"]}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQ_ITEMS.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer.replace(/\*\*/g, ""),
            },
          })),
        }}
      />

      <div className="mc-container mc-container--narrow">
        <PageHead
          icon="lapis"
          title="Frequently Asked Questions"
          subtitle="Everything you need to know about shaders, launchers, modpacks, and downloads."
        />

        {/* Filter & Search Panel */}
        <section className="mc-panel mc-panel--dark" aria-label="Search and filter FAQ" style={{ marginBottom: 24 }}>
          <div className="mc-field">
            <span>Search Questions</span>
            <input
              type="search"
              className="mc-input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by keywords (e.g. shader, pojav, launcher, virus)..."
              aria-label="Search FAQ"
            />
          </div>

          <div className="mc-chips" role="group" aria-label="FAQ Categories" style={{ marginTop: 14 }}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className="mc-tag mc-tag--btn"
                aria-pressed={activeCategory === cat.id}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="mc-row mc-row--between" style={{ marginTop: 14, alignItems: "center" }}>
            <span className="mc-muted">
              Showing {filteredItems.length} question{filteredItems.length === 1 ? "" : "s"}
            </span>
            <div className="mc-row" style={{ gap: 8 }}>
              <McButton size="sm" variant="dark" onClick={expandAll}>Expand All</McButton>
              <McButton size="sm" variant="dark" onClick={collapseAll}>Collapse All</McButton>
            </div>
          </div>
        </section>

        {/* FAQ Accordion in Written Book Style */}
        <section aria-labelledby="faq-list-heading">
          <h2 id="faq-list-heading" className="mc-h2 mc-h2--light" style={{ marginBottom: 14 }}>
            KNOWLEDGE BASE
          </h2>

          {filteredItems.length === 0 ? (
            <div className="mc-panel mc-panel--dark mc-center" style={{ padding: "32px 16px" }}>
              <p style={{ fontSize: 24, marginBottom: 12 }}>No questions match your search.</p>
              <McButton
                size="sm"
                variant="green"
                onClick={() => {
                  setSearch("");
                  setActiveCategory("all");
                }}
              >
                Reset Search Filters
              </McButton>
            </div>
          ) : (
            <div className="mc-book" style={{ display: "grid", gap: 12 }}>
              {filteredItems.map((item) => {
                const isOpen = !!openedIds[item.id];
                return (
                  <details
                    key={item.id}
                    open={isOpen}
                    onToggle={(e) => {
                      const open = (e.currentTarget as HTMLDetailsElement).open;
                      setOpenedIds((prev) => ({ ...prev, [item.id]: open }));
                    }}
                  >
                    <summary style={{ cursor: "pointer" }}>
                      <span style={{ flex: 1 }}>{item.question}</span>
                    </summary>
                    <div style={{ fontSize: 22, padding: "8px 6px 12px 24px", lineHeight: 1.35 }}>
                      <Rich text={item.answer} />
                    </div>
                  </details>
                );
              })}
            </div>
          )}
        </section>

        {/* Support & Community Section */}
        <section className="mc-panel mc-panel--dark" style={{ marginTop: 28, padding: 20 }}>
          <h3 className="mc-h3 mc-yellow" style={{ marginBottom: 8 }}>STILL NEED HELP?</h3>
          <p style={{ fontSize: 22, color: "#ccc", marginBottom: 16 }}>
            Have a question that is not answered here, or want to suggest a new shader or world? Reach out directly:
          </p>
          <div className="mc-row" style={{ flexWrap: "wrap", gap: 10 }}>
            <McButton href={`mailto:${SOCIAL.email}`} variant="green">Email Us</McButton>
            <McButton href={SOCIAL.youtube} target="_blank" rel="noopener noreferrer" variant="dark">YouTube</McButton>
            <McButton href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer" variant="dark">Instagram</McButton>
            <McButton href={SOCIAL.github} target="_blank" rel="noopener noreferrer" variant="dark">GitHub</McButton>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default FAQ;
