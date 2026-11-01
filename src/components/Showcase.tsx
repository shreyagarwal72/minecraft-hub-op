import McButton from "@/components/McButton";
import Reveal from "@/components/Reveal";
import { useLibrary } from "@/hooks/useLibrary";
import type { IconName } from "@/data/site";

interface Item {
  id: string;
  title: string;
  description: string;
  image: string;
  icon: IconName;
  buttonText: string;
  href: string;
  variant?: "green" | "gray";
}

const STEPS = [
  { icon: "/icons/diamond.png", title: "1. Pick", text: "Browse worlds, shaders and modpacks. Filter by version and loader." },
  { icon: "/icons/planks.png", title: "2. Check the source", text: "Each card says where the file comes from and when we last checked it." },
  { icon: "/icons/grass.png", title: "3. Play", text: "Install with the official launcher, Modrinth App or Prism Launcher." },
];

const Showcase = () => {
  const { library, entries } = useLibrary();
  const release = library.mojang?.latestRelease.id;
  const count = (t: string) => entries.filter((e) => e.type === t && !e.unavailable).length;

  const items: Item[] = [
    { id: "worlds", title: "Community Worlds", description: "Huge builds, redstone machines and castles from community creators.", image: "/library/worlds-preview.jpg", icon: "grass", buttonText: "Select World", href: "/worlds" },
    { id: "modpacks", title: "Modpacks", description: "Performance packs including Pojav-friendly options for phones.", image: "/library/modpacks-preview.jpg", icon: "planks", buttonText: "Open Resource Packs", href: "/modpacks" },
    { id: "shaders", title: "Shaders", description: "BSL, Complementary Reimagined and Photon, linked from their official pages.", image: "/library/shaders-preview.jpg", icon: "glowstone", buttonText: "Get Shaders", href: "/shaders" },
    {
      id: "downloads",
      title: release ? `Minecraft Java ${release}` : "Minecraft Java Edition",
      description: "The newest release and snapshot from Mojang, plus the official launcher, Modrinth App and Prism Launcher.",
      image: "/library/minecraft-hero.jpg", icon: "diamond", buttonText: "Open the Launcher", href: "/downloads", variant: "green",
    },
  ];

  const stats = [
    { n: String(count("world")), l: "Worlds" },
    { n: String(count("shader")), l: "Shaders" },
    { n: String(count("modpack")), l: "Modpacks" },
  ];

  return (
    <section id="showcase" className="mc-section mc-bg-stone" style={{ scrollMarginTop: 64 }}>
      <div className="mc-container">
        <Reveal className="mc-center">
          <h2 className="mc-page-title">Choose Your Adventure</h2>
          <p className="mc-page-sub">Worlds, shaders, modpacks and launchers for Minecraft Java Edition.</p>
        </Reveal>

        <div className="mc-grid mc-grid--2" style={{ marginTop: 32 }}>
          {items.map((item, i) => (
            <Reveal key={item.id} delay={(i % 2) * 0.12}>
              <article id={item.id} className="mc-panel mc-panel--lift mc-card mc-showcase-card">
                <div className="mc-slot mc-slot--hover">
                  <img src={item.image} alt="" loading="lazy" style={{ aspectRatio: "16 / 9" }} />
                  <img className="mc-badge-icon" src={`/icons/${item.icon}.png`} alt="" style={{ width: 48, height: 48 }} />
                </div>
                <h3 className="mc-card__title">{item.title}</h3>
                <p className="mc-card__text">{item.description}</p>
                <McButton to={item.href} block variant={item.variant ?? "gray"}>{item.buttonText}</McButton>
              </article>
            </Reveal>
          ))}

          <Reveal delay={0.12}>
            <article className="mc-panel mc-panel--dark mc-card" aria-label="How it works">
              <h3 className="mc-h2 mc-h2--light">HOW IT WORKS</h3>
              <ol className="mc-list mc-list--plain" style={{ listStyle: "none" }}>
                {STEPS.map((s) => (
                  <li key={s.title} style={{ alignItems: "center" }}>
                    <span className="mc-slot" style={{ width: 52, height: 52, flex: "none", display: "grid", placeItems: "center" }}>
                      <img src={s.icon} alt="" style={{ width: 40, height: 40, objectFit: "contain" }} />
                    </span>
                    <span>
                      <b className="t-yellow" style={{ fontWeight: 400 }}>{s.title}</b>
                      <br />
                      {s.text}
                    </span>
                  </li>
                ))}
              </ol>
            </article>
          </Reveal>
        </div>

        <div className="mc-grid mc-grid--3" style={{ marginTop: 40 }}>
          {stats.map((s, i) => (
            <Reveal key={s.l} delay={i * 0.12}>
              <div className="mc-panel mc-panel--dark mc-stat">
                <img src="/textures/xp.png" alt="" />
                <div>
                  <div className="mc-stat__n">{s.n}</div>
                  <div className="mc-stat__l">{s.l} in the library</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Showcase;
