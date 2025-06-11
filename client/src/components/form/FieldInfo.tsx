import type { AnyFieldApi } from "@tanstack/react-form";

export function FieldInfo({ field }: { field: AnyFieldApi }) {
  return (
    <section className="flex flex-col gap-1">
      {field.state.meta.isTouched && !field.state.meta.isValid ? (
        <em className="text-red-500">{field.state.meta.errors.join(",")}</em>
      ) : null}
      {field.state.meta.isValidating ? "Validating..." : null}
    </section>
  );
}
