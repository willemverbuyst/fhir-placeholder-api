import { isAxiosError } from "axios";
import { Button } from "../ui/button";

export function ErrorMessage({
  error,
  action,
  actionCaption,
}: { error: Error; action?: () => void; actionCaption?: string }) {
  return (
    <section className="w-[350px] flex flex-col items-center gap-4">
      <p className="text-destructive text-xl font-bold text-center">
        An error has occurred
        <br />
        {isAxiosError(error) ? error.response?.data.message : error.message}
      </p>
      {action && actionCaption && (
        <Button onClick={action}>{actionCaption}</Button>
      )}
    </section>
  );
}
