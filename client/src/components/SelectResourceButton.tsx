import type React from "react";
import { useSearchParams } from "react-router";
import type { ConfigItems } from "../config/fhirResources";
import { Button } from "./ui/button";

export function SelectResourceButton({
  caption,
}: {
  caption: keyof ConfigItems;
}): React.JSX.Element {
  const [_, setSearchParams] = useSearchParams();

  return (
    <Button
      type="button"
      onClick={() => {
        setSearchParams({ resource: caption });
      }}
      variant="ghost"
    >
      {caption}
    </Button>
  );
}
