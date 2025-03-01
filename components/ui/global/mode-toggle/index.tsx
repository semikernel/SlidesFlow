"use client";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { Switch } from "../../switch";

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return (
    <div>
      <Switch
        checked={theme === "dark"}
        // className="h-10 w-20 pl-1 data-[state=checked]:bg-primary-90"
        onCheckedChange={() => setTheme(theme === "dark" ? "light" : "dark")}
        aria-label="Toggle dark mode"
      />
    </div>
  );
};

export default ThemeSwitcher;
