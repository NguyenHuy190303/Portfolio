"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <span className="nav-tab nav-tab--icon" aria-hidden="true" />;

  return (
    <button
      type="button"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="nav-tab nav-tab--icon"
      title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      {theme === "dark" ? <Moon aria-hidden="true" /> : <Sun aria-hidden="true" />}
      <span className="sr-only">Toggle theme</span>
    </button>
  );
};

export default ThemeSwitcher;
