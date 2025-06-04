export function ErrorMessage({ error }: { error: Error }) {
  return (
    <p className="text-red-500">`An error has occurred: ${error.message}`</p>
  );
}
