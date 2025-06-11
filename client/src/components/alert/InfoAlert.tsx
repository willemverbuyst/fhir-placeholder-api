import { AlertCircleIcon } from "lucide-react";
import { Alert, AlertTitle } from "../ui/alert";

export function InfoAlert({ title }: { title: string }) {
  return (
    <Alert>
      <AlertCircleIcon />
      <AlertTitle>{title}</AlertTitle>
    </Alert>
  );
}
