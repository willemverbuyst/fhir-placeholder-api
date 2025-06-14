import { ErrorAlert } from "@/components/alert/ErrorAlert";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createResourcesQueryOptions } from "@/query/resources.query";
import { useQuery } from "@tanstack/react-query";
import type { Patient } from "fhir/r5";

export function PatientSelect({
  value,
  onChange,
  reset,
  disabled = false,
}: {
  value: string;
  onChange: (v: string) => void;
  reset: () => void;
  disabled: boolean;
}) {
  const { isPending, isError, data, error } = useQuery(
    createResourcesQueryOptions<Patient & { id: string }>({
      resourceType: "Patient",
    }),
  );

  if (isError)
    return <ErrorAlert error={error} action={reset} actionCaption="reset" />;

  return (
    <Select
      onValueChange={(e) => onChange(e)}
      value={value}
      disabled={isPending || disabled}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="patient id" />
      </SelectTrigger>
      <SelectContent>
        {data?.map((p) => (
          <SelectGroup key={String(p.id)}>
            <SelectItem value={String(p.id)}>{String(p.id)}</SelectItem>
          </SelectGroup>
        ))}
      </SelectContent>
    </Select>
  );
}
