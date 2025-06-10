import { LoadingSpinner } from "@/components/LoadingSpinner";
import { ErrorMessage } from "@/components/message/ErrorMessage";
import { InfoMessage } from "@/components/message/InfoMessage";
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
}: {
  value: string;
  onChange: (v: string) => void;
  reset: () => void;
}) {
  const { isPending, isError, data, error } = useQuery(
    createResourcesQueryOptions<Patient & { id: string }>({
      resourceType: "Patient",
    }),
  );

  if (isPending) return <LoadingSpinner />;
  if (isError)
    return <ErrorMessage error={error} action={reset} actionCaption="reset" />;
  if (!data) return <InfoMessage message="no patient data to select" />;

  return (
    <Select onValueChange={(e) => onChange(e)} value={value}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="patient id" />
      </SelectTrigger>
      <SelectContent>
        {data.map((p) => (
          <SelectGroup key={String(p.id)}>
            <SelectItem value={String(p.id)}>{String(p.id)}</SelectItem>
          </SelectGroup>
        ))}
      </SelectContent>
    </Select>
  );
}
