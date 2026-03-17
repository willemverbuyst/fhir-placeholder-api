import { isAxiosError } from "axios";
import { AlertCircleIcon } from "lucide-react";
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
      <AlertCircleIcon />
      <AlertTitle>An error has occurred</AlertTitle>
      <AlertDescription>
        {isAxiosError(error) ? error.response?.data.message : error.message}
        {action && actionCaption && (
          <Button onClick={action}>{actionCaption}</Button>
        )}
      </AlertDescription>
    </Alert>
  );
}
