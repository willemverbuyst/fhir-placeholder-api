export function ErrorMessage({ error }: { error: Error }) {
  return (
    <p className="text-destructive text-xl font-bold">
      `An error has occurred: ${error.message}`
    </p>
  );
}
