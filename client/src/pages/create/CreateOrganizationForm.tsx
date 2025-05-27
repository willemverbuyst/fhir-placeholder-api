import type { AnyFieldApi } from "@tanstack/react-form";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { postData } from "../../query/resources.post";

function FieldInfo({ field }: { field: AnyFieldApi }) {
  return (
    <section className="flex flex-col gap-1">
      {field.state.meta.isTouched && !field.state.meta.isValid ? (
        <em className="text-pink-500">{field.state.meta.errors.join(",")}</em>
      ) : null}
      {field.state.meta.isValidating ? "Validating..." : null}
    </section>
  );
}

export default function CreateOrganizationForm() {
  const mutation = useMutation({
    mutationFn: postData,
    onSuccess: (data) => {
      console.log("Success:", data);
    },
    onError: (error) => {
      console.error("Error:", error.message);
    },
  });

  const form = useForm({
    defaultValues: {
      name: "",
    },
    onSubmit: async ({ value }) => {
      mutation.mutate(value);
    },
  });

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-10">
      <h2 className="uppercase text-xl text-center">Create New Organization</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="flex flex-col gap-4 w-full max-w-md"
      >
        <form.Field
          name="name"
          validators={{
            onChange: ({ value }) =>
              !value
                ? "An organization name is required"
                : value.length < 3
                  ? "Name must be at least 3 characters"
                  : undefined,
            onChangeAsyncDebounceMs: 500,
          }}
          // biome-ignore lint/correctness/noChildrenProp: Avoid hasty abstractions - TanStack Form
          children={(field) => {
            return (
              <section className="flex flex-col gap-2">
                <label htmlFor={field.name} className="text-xl">
                  Organization Name:
                </label>
                <input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="rounded-md border-2 border-pink-500 bg-white backdrop-blur-md p-2 font-bold text-sky-900 w-full h-[40px] outline-pink-500 focus:outline caret-pink-500"
                />
                <FieldInfo field={field} />
              </section>
            );
          }}
        />

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          // biome-ignore lint/correctness/noChildrenProp: Avoid hasty abstractions - TanStack Form
          children={([canSubmit, isSubmitting]) => (
            <section className="flex gap-4">
              <button
                type="reset"
                onClick={() => form.reset()}
                className="py-2 px-4 rounded-md text-white w-[350px] sm:w-[300px] text-center cursor-pointer font-bold transition-colors bg-sky-900 hover:bg-sky-700"
              >
                Reset
              </button>
              <button
                type="submit"
                disabled={!canSubmit}
                className="py-2 px-4 rounded-md text-white w-[350px] sm:w-[300px] text-center cursor-pointer font-bold transition-colors bg-pink-500 hover:bg-pink-600"
              >
                {isSubmitting ? "..." : "Submit"}
              </button>
            </section>
          )}
        />
      </form>
    </section>
  );
}
