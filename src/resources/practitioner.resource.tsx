import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { createGetPractitionerQueryOptions } from "../query/practitioner.query";
import { Patients } from "./patients.resource";

export function PractitionerResource({
  practitionerId,
}: {
  practitionerId: string;
}) {
  const [zoomIn, setZoomIn] = useState<string | undefined>();
  const { isPending, error, data } = useQuery(
    createGetPractitionerQueryOptions(practitionerId)
  );

  if (isPending) return <LoadingSpinner />;

  if (error) return "An error has occurred: " + error.message;
  return (
    <section className="flex gap-3">
      <div
        className="bg-amber-400 py-3 px-5 rounded-md text-white w-[200px]"
        onClick={() => {
          if (zoomIn) setZoomIn(undefined);
          else setZoomIn(practitionerId);
        }}
      >
        {data?.id}
      </div>

      {zoomIn ? <Patients organizationId={zoomIn} /> : null}
    </section>
  );
}
