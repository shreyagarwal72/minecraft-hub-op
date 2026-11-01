import { useMemo } from "react";
import McButton from "@/components/McButton";
import { SPLASHES } from "@/data/site";
import { useLibrary } from "@/hooks/useLibrary";
import { DISCLAIMER } from "@/config/site";

const STARS = Array.from({ length: 46 }, (_, i) => {
  const s = Math.sin(i * 91.7) * 10000;
  const r = s - Math.floor(s);
  const s2 = Math.sin(i * 17.3 + 4) * 10000;
  const r2 = s2 - Math.floor(s2);
  return { left: `${(r * 100).toFixed(2)}%`, top: `${(r2 * 100).toFixed(2)}%`, delay: `${((r + r2) * 2.6).toFixed(2)}s` };
});

/** Java-style main menu: 60 s day/night sky, stone-brick ground, wide buttons and a yellow splash. */
const Hero = () => {
  const splash = useMemo(() => SPLASHES[Math.floor(Math.random() * SPLASHES.length)], []);
  const { library } = useLibrary();
  const release = library.mojang?.latestRelease.id;

  return (
    <section id="home" className="mc-hero" aria-label="Title screen">
      <div className="mc-sky" aria-hidden="true">
        <div className="mc-sky__dusk" />
        <div className="mc-sky__night" />
      </div>
      <div className="mc-stars" aria-hidden="true">
        {STARS.map((s, i) => (
          <span key={i} className="mc-star" style={{ left: s.left, top: s.top, animationDelay: s.delay }} />
        ))}
      </div>
      <div className="mc-orbit" aria-hidden="true">
        <img className="sun" src="/textures/sun.png" alt="" />
        <img className="moon" src="/textures/moon.png" alt="" />
      </div>
      <div className="mc-cloud mc-cloud--a" aria-hidden="true" />
      <div className="mc-cloud mc-cloud--b" aria-hidden="true" />
      <div className="mc-cloud mc-cloud--c" aria-hidden="true" />
      <div className="mc-night-dim" aria-hidden="true" />

      <div className="mc-ground mc-ground--stone" aria-hidden="true">
        <div className="mc-ground__bricks" />
      </div>
      <div className="mc-hero-night-tint" aria-hidden="true" />

      <div className="mc-title-wrap">
        <div className="mc-logo-block">
          <p className="mc-logo-block__kicker">MINECRAFT</p>
          <h1 className="mc-logo">
            <span className="mc-logo__main">JAVA HUB</span>
            <span className="mc-logo__sub">WORLDS · SHADERS · MODPACKS · LAUNCHERS</span>
            <span className="mc-splash" aria-hidden="true">{splash}</span>
          </h1>
        </div>

        <nav className="mc-menu mc-menu--java" aria-label="Main menu">
          <McButton to="/downloads" variant="green" size="lg" block pulse sub={release ? `Latest release · ${release}` : "Latest release"}>
            Download Minecraft
          </McButton>
          <McButton to="/worlds" block>Worlds</McButton>
          <McButton to="/modpacks" block>Modpacks</McButton>
          <McButton to="/shaders" block>Shaders</McButton>
          <div className="mc-menu__row">
            <McButton to="/patch">Patch</McButton>
            <McButton to="/faq">FAQ</McButton>
          </div>
        </nav>
      </div>

      <a href="#showcase" className="mc-scroll-cue" aria-label="Scroll to the showcase" style={{ textDecoration: "none" }}>
        ▼ SCROLL ▼
      </a>

      <div className="mc-hero__foot" aria-hidden="true">
        <span>Minecraft Java Hub</span>
        <span>{DISCLAIMER}</span>
      </div>
    </section>
  );
};

export default Hero;
