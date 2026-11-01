import { useEffect, type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ToastHost from "@/components/ToastHost";
import ClickParticles from "@/components/ClickParticles";
import XpHud from "@/components/XpHud";

interface LayoutProps {
  children: ReactNode;
  background?: "dirt" | "stone" | "deep";
  /** Remove the header offset so a hero can sit under the fixed header */
  flush?: boolean;
}

/** Shared chrome for every page. Per-page <title> and meta come from <SEOHead /> inside each page. */
const Layout = ({ children, background = "dirt", flush = false }: LayoutProps) => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return (
    <div className={`mc-app mc-bg-${background}`}>
      <a href="#main" className="mc-skip">Skip to content</a>
      <Header />
      <main id="main" className="mc-main" style={flush ? { paddingTop: 0 } : undefined}>
        {children}
      </main>
      <Footer />
      <ToastHost />
      <ClickParticles />
      <XpHud />
    </div>
  );
};

export default Layout;
