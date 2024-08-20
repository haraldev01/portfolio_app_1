"use client";

import { SunIcon, MoonIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import useThemeChanger from "./useThemeChanger";

export default function ThemeChanger({ className }: { className?: string }) {
  const { isDarkMode, toggleDarkMode } = useThemeChanger();

  return (
    <button
      onClick={toggleDarkMode}
      className={cn(
        "w-10 h-10 p-2 rounded-full bg-card text-muted-foreground transition-all md:hover:scale-105 md:hover:rotate-12 md:active:scale-100 border border-border",
        className,
      )}
      aria-label={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      {isDarkMode ? (
        <SunIcon className="w-full h-full" />
      ) : (
        <MoonIcon className="w-full h-full" />
      )}
    </button>
  );
}
