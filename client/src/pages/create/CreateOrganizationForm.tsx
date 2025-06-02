import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { AnyFieldApi } from "@tanstack/react-form";
import { useForm } from "@tanstack/react-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2Icon } from "lucide-react";
import { postData } from "../../query/resources.post";
import { LoadingSpinner } from "../../ui/LoadingSpinner";

function FieldInfo({ field }: { field: AnyFieldApi }) {
  return (
    <section className="flex flex-col gap-1">
      {field.state.meta.isTouched && !field.state.meta.isValid ? (
        <em className="text-red-500">{field.state.meta.errors.join(",")}</em>
      ) : null}
      {field.state.meta.isValidating ? "Validating..." : null}
    </section>
  );
}

export default function CreateOrganizationForm() {
  const queryClient = useQueryClient();
  const { mutate, isPending, error } = useMutation({
    mutationFn: postData,
    onSuccess: (data) => {
      queryClient.setQueryData(["Organization"], (oldData) => {
        if (!oldData) return [data];
        if (Array.isArray(oldData)) {
          return [...oldData, data];
        }
        return oldData;
      });
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
      mutate(value);
      form.reset();
    },
  });

  if (isPending) return <LoadingSpinner />;
  if (error) return <p>...error</p>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Organization</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="flex flex-col gap-4"
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
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    type="text"
                    placeholder="name"
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
              <section className="flex gap-4 justify-end">
                <Button
                  type="reset"
                  onClick={() => form.reset()}
                  variant="outline"
                >
                  Reset
                </Button>
                <Button type="submit" disabled={!canSubmit}>
                  {isSubmitting ? (
                    <Loader2Icon className="animate-spin" />
                  ) : (
                    "Submit"
                  )}
                </Button>
              </section>
            )}
          />
        </form>
      </CardContent>
    </Card>
  );
}
