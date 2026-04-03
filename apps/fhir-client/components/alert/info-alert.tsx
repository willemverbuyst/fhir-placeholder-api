import { AlertCircleIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Alert, AlertTitle } from "../ui/alert";

export function InfoAlert({ title }: { title: string }) {
  return (
    <Alert>
      <HugeiconsIcon icon={AlertCircleIcon} />
      <AlertTitle>{title}</AlertTitle>
    </Alert>
  );
}
