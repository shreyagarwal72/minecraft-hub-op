import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import "./TorchThemeToggle.css";

const TorchThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = theme === "dark";

  const toggleTheme = () => {
    // Add transitioning class for smooth theme animation
    document.documentElement.classList.add('transitioning');
    setTheme(isDark ? "light" : "dark");
    
    // Remove transitioning class after animation completes
    setTimeout(() => {
      document.documentElement.classList.remove('transitioning');
    }, 500);
  };

  return (
    <label className="torch-container">
      <div className="simple-text">{isDark ? "Light mode" : "Dark mode"}</div>
      <input
        type="checkbox"
        checked={isDark}
        onChange={toggleTheme}
      />
      <div className="torch">
        <div className="light-effect"></div>
        <div className="glow-effect"></div>
        <div className="particles">
          <span></span><span></span><span></span><span></span>
          <span></span><span></span><span></span><span></span>
          <span></span><span></span><span></span><span></span>
        </div>
        <div className="smoke">
          <span></span><span></span><span></span><span></span>
        </div>
        <div className="head">
          <div className="face top">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div className="face left">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div className="face right">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
        <div className="stick">
          <div className="side side-left">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div className="side side-right">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    </label>
  );
};

export default TorchThemeToggle;
