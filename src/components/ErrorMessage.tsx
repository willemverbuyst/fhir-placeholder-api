export function ErrorMessage({ error }: { error: Error }) {
  return <p>`An error has occurred: ${error.message}`</p>;
}
