import { FieldInfo } from "@/components/form/FieldInfo";
import { ErrorMessage } from "@/components/message/ErrorMessage";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "@tanstack/react-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2Icon } from "lucide-react";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { postData } from "../../query/resources.post";

export default function CreateAppointmentForm() {
  const queryClient = useQueryClient();
  const { mutate, isPending, error, isError, reset } = useMutation({
    mutationFn: ({
      resourceType,
      body,
    }: { resourceType: string; body: { subject: string; status: string } }) =>
      postData(body, resourceType),
    onSuccess: (data) => {
      queryClient.setQueryData(["Appointment"], (oldData) => {
        if (!oldData)
          queryClient.invalidateQueries({ queryKey: ["Appointment"] });
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
      subject: "",
      status: "",
    },
    onSubmit: async ({ value }) => {
      mutate({ body: value, resourceType: "Appointment" });
      form.reset();
    },
  });

  if (isPending) return <LoadingSpinner />;
  if (isError)
    return <ErrorMessage error={error} action={reset} actionCaption="reset" />;

  const appointmentStatus = [
    "proposed",
    "pending",
    "booked",
    "arrived",
    "fulfilled",
    "cancelled",
    "noshow",
    "entered-in-error",
    "checked-in",
    "waitlist",
  ] as const;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Appointment</CardTitle>
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
            name="subject"
            validators={{
              onChange: ({ value }) =>
                !value ? "Patient id is required" : undefined,
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
                    placeholder="patient id"
                  />
                  <FieldInfo field={field} />
                </section>
              );
            }}
          />

          <form.Field
            name="status"
            validators={{
              onChange: ({ value }) =>
                !value ? "Status is required" : undefined,
            }}
            // biome-ignore lint/correctness/noChildrenProp: Avoid hasty abstractions - TanStack Form
            children={(field) => {
              return (
                <section className="flex flex-col gap-2">
                  <Select onValueChange={(e) => field.handleChange(e)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="appointment status" />
                    </SelectTrigger>
                    <SelectContent>
                      {appointmentStatus.map((status) => (
                        <SelectGroup key={status}>
                          <SelectItem value={status}>{status}</SelectItem>
                        </SelectGroup>
                      ))}
                    </SelectContent>
                  </Select>
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
