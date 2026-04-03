"use client";

import { MoonIcon, Sun03Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useTheme } from "next-themes";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function ThemeToggle() {
  const [mounted, setMounted] = React.useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = resolvedTheme === "dark";
  const tooltipLabel = !mounted
    ? "Toggle theme"
    : isDark
      ? "Switch to light mode"
      : "Switch to dark mode";

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label={tooltipLabel}
          disabled={!mounted}
          onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
        >
          {!mounted ? (
            <span className="size-4 shrink-0" aria-hidden />
          ) : isDark ? (
            <HugeiconsIcon
              icon={MoonIcon}
              strokeWidth={2 as unknown as number}
              className="size-4"
              aria-hidden
            />
          ) : (
            <HugeiconsIcon
              icon={Sun03Icon}
              strokeWidth={2 as unknown as number}
              className="size-4"
              aria-hidden
            />
          )}
        </Button>
      </TooltipTrigger>
      <TooltipContent>{tooltipLabel}</TooltipContent>
    </Tooltip>
  );
}
