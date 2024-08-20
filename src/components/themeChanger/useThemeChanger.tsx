import { useTheme } from "next-themes";
import { useCallback } from "react";

export default function useThemeChanger() {
  // we use resolvedTheme because it will not return system,
  // it will return whatever system means in the given situation (light/dark)
  const { resolvedTheme: theme, setTheme } = useTheme();

  const toggleDarkMode = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [setTheme, theme]);

  const isDarkMode = theme === "dark";

  return { toggleDarkMode, isDarkMode };
}
