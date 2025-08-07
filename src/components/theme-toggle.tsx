"use client";

import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  // Don't show in production
  if (process.env.NODE_ENV === "production") return null;
  return (
    <Button
      variant="ghost"
      size="icon"
      className="text-gray-800/80 hover:text-gray-900 dark:text-white/80 dark:hover:text-white transition-colors duration-200"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <Sun className="hidden h-5 w-5 dark:block" />
      <Moon className=" h-5 w-5 dark:hidden" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
