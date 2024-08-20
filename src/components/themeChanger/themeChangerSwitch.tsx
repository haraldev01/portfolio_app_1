"use client";

import { Switch } from "../ui/switch";
import useThemeChanger from "./useThemeChanger";

export default function ThemeChangerSwitch() {
  const { isDarkMode, toggleDarkMode } = useThemeChanger();

  return <Switch checked={isDarkMode} onCheckedChange={toggleDarkMode} />;
}
