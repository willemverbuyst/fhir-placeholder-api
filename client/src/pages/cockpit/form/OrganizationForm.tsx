import { ErrorAlert } from "@/components/alert/ErrorAlert";
import { FieldInfo } from "@/components/form/FieldInfo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "@tanstack/react-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2Icon } from "lucide-react";
import { toast } from "sonner";
import { LoadingSpinner } from "../../../components/LoadingSpinner";
import { postData } from "../../../query/resources.post";
import { useFormStore } from "./useFormStore";

export function OrganizationForm() {
  const { setResourceForm } = useFormStore();
  const queryClient = useQueryClient();
  const { mutate, isPending, error, reset } = useMutation({
    mutationFn: ({
      resourceType,
      body,
    }: { resourceType: string; body: { name: string; active: boolean } }) =>
      postData(body, resourceType),
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey: ["Organization"] });
      toast.success(`Organization ${data.name} has been created`, {
        richColors: true,
        position: "top-right",
      });
    },
    onError: (error) => {
      console.error("Error:", error.message);
      toast.error("Something went wrong", {
        description: "Organization was not created",
        richColors: true,
        position: "top-right",
      });
    },
  });

  const form = useForm({
    defaultValues: {
      name: "",
      active: true,
    },
    onSubmit: async ({ value }) => {
      mutate({ body: value, resourceType: "Organization" });
      form.reset();
    },
  });

  if (isPending) return <LoadingSpinner />;
  if (error)
    return <ErrorAlert error={error} action={reset} actionCaption="reset" />;

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
          <form.Field
            name="active"
            // biome-ignore lint/correctness/noChildrenProp: Avoid hasty abstractions - TanStack Form
            children={(field) => {
              return (
                <section className="flex gap-2">
                  <Checkbox
                    id={field.name}
                    checked={field.state.value}
                    onCheckedChange={() =>
                      field.handleChange(!field.state.value)
                    }
                  />
                  <Label htmlFor={field.name}>active</Label>
                  <FieldInfo field={field} />
                </section>
              );
            }}
          />

          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            // biome-ignore lint/correctness/noChildrenProp: Avoid hasty abstractions - TanStack Form
            children={([canSubmit, isSubmitting]) => (
              <section className="flex justify-between">
                <Button
                  variant="secondary"
                  onClick={() => {
                    form.reset();
                    setResourceForm(null);
                  }}
                >
                  Cancel
                </Button>
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
              </section>
            )}
          />
        </form>
      </CardContent>
    </Card>
  );
}
