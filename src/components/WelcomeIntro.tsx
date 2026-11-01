import { useEffect, useMemo, useRef, useState } from "react";
import McButton from "@/components/McButton";

interface WelcomeIntroProps {
  isOpen: boolean;
  onClose: () => void;
  isManualOpen?: boolean;
}

const SLIDES = [
  { title: "Welcome to Java Hub", description: "Worlds, shaders, modpacks and launchers for Minecraft Java Edition, with every link labelled.", image: "/library/minecraft-hero.jpg" },
  { title: "Worlds", description: "Big community builds you can download and explore. Always back up before you open one.", image: "/library/worlds-preview.jpg" },
  { title: "Modpacks", description: "Pick packs, check the version, then download. Pojav-friendly packs included.", image: "/library/modpacks-preview.jpg" },
  { title: "Shaders", description: "BSL, Complementary and Photon, linked from their official pages.", image: "/library/shaders-preview.jpg" },
];

const TIPS = [
  "Back up your worlds before updating Minecraft.",
  "Snapshots can break worlds. Use a copy.",
  "Shaders need Iris or OptiFine on Java Edition.",
  "Links marked unverified are mirrors we cannot check automatically.",
  "Click the logo to replay this tour.",
];

const setSeen = () => {
  try {
    localStorage.setItem("hasSeenJavaIntro", "true");
  } catch {
    /* storage unavailable: the tour will simply show again */
  }
};

const WelcomeIntro = ({ isOpen, onClose, isManualOpen = false }: WelcomeIntroProps) => {
  const [phase, setPhase] = useState<"loading" | "tour">("tour");
  const [leaving, setLeaving] = useState(false);
  const [progress, setProgress] = useState(0);
  const [slide, setSlide] = useState(0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const tip = useMemo(() => TIPS[Math.floor(Math.random() * TIPS.length)], [isOpen]);
  const nextRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    setSlide(0);
    setProgress(0);
    setLeaving(false);
    if (isManualOpen) {
      setPhase("tour");
      return;
    }
    setPhase("loading");
    let p = 0;
    const id = window.setInterval(() => {
      p = Math.min(100, p + 4 + Math.random() * 9);
      setProgress(p);
      if (p >= 100) {
        window.clearInterval(id);
        setLeaving(true);
        window.setTimeout(() => {
          setPhase("tour");
          setLeaving(false);
        }, 350);
      }
    }, 90);
    return () => window.clearInterval(id);
  }, [isOpen, isManualOpen]);

  const finish = () => {
    if (!isManualOpen) setSeen();
    onClose();
  };

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") finish();
      if (phase === "tour" && e.key === "ArrowRight") setSlide((s) => Math.min(SLIDES.length - 1, s + 1));
      if (phase === "tour" && e.key === "ArrowLeft") setSlide((s) => Math.max(0, s - 1));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, phase, isManualOpen]);

  useEffect(() => {
    if (isOpen && phase === "tour") nextRef.current?.focus();
  }, [isOpen, phase]);

  if (!isOpen) return null;

  if (phase === "loading") {
    return (
      <div className={`mc-loading mc-bg-dirt ${leaving ? "mc-loading--out" : ""}`} role="alertdialog" aria-label="Loading Minecraft Java Hub">
        <div className="mc-loading__box">
          <img className="mc-loading__logo" src="/icons/grass.png" alt="" />
          <div className="mc-loading__title">LOADING JAVA HUB</div>
          <div className="mc-bar" role="progressbar" aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100}>
            <div className="mc-bar__fill" style={{ width: `calc(${progress}% - 4px)` }} />
          </div>
          <div className="mc-loading__tip">
            <span className="t-yellow">Tip: </span>
            {tip}
          </div>
          <McButton variant="dark" size="sm" onClick={finish}>Skip</McButton>
        </div>
      </div>
    );
  }

  const current = SLIDES[slide];
  const last = slide === SLIDES.length - 1;

  return (
    <div className="mc-modal" role="dialog" aria-modal="true" aria-label="Minecraft Java Hub tour" onClick={(e) => e.target === e.currentTarget && finish()}>
      <div className="mc-modal__panel mc-panel">
        <div className="mc-frame">
          <div className="mc-frame__inner">
            <img key={slide} className="mc-slide-img" src={current.image} alt="" />
          </div>
        </div>
        <div className="mc-slides" role="tablist" aria-label="Tour slides">
          {SLIDES.map((s, i) => (
            <button key={s.title} onClick={() => setSlide(i)} aria-current={i === slide} aria-label={`Slide ${i + 1}: ${s.title}`} />
          ))}
        </div>
        <h2 className="mc-modal__title" key={`t${slide}`}>{current.title}</h2>
        <p className="mc-modal__text" key={`d${slide}`}>{current.description}</p>
        <div className="mc-modal__actions">
          <div className="mc-row" style={{ gap: 8 }}>
            <McButton size="sm" variant="dark" disabled={slide === 0} onClick={() => setSlide((s) => s - 1)}>Back</McButton>
            <McButton size="sm" variant="dark" onClick={finish}>Skip</McButton>
          </div>
          <button ref={nextRef} className="mc-btn mc-btn--green" onClick={() => (last ? finish() : setSlide((s) => s + 1))}>
            {last ? "Let's Play!" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeIntro;
