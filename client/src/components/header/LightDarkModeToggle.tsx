import { MoonIcon, SunIcon } from "lucide-react";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

export function LightDarkModeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          className="ml-auto"
          onClick={() => {
            setIsDarkMode((prev) => !prev);
            document.body.classList.toggle("dark");
          }}
        >
          {isDarkMode ? <MoonIcon /> : <SunIcon />}
        </TooltipTrigger>
        <TooltipContent>
          {isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
