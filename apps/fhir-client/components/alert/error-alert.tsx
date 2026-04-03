import { AlertCircleIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Button } from "../ui/button";

export function ErrorAlert({
  error,
  action,
  actionCaption,
}: {
  error: Error;
  action?: () => void;
  actionCaption?: string;
}) {
  return (
    <Alert variant="destructive" className="max-w-lg mx-auto">
      <HugeiconsIcon icon={AlertCircleIcon} />
      <AlertTitle>An error has occurred</AlertTitle>
      <AlertDescription>
        {error instanceof Error ? error.message : "Unknown error"}
        {action && actionCaption && (
          <Button onClick={action}>{actionCaption}</Button>
        )}
      </AlertDescription>
    </Alert>
  );
}
