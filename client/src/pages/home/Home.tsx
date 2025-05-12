import { useQuery } from "@tanstack/react-query";
import type { CapabilityStatement } from "fhir/r5";
import { isResource } from "../../lib/fhir";
import { createResourcesQueryOptions } from "../../query/resources.query";

export function Home() {
  const { isPending, error, data } = useQuery(
    createResourcesQueryOptions<CapabilityStatement>({ url: "metadata" }),
  );

  if (isPending) return <p>...loading</p>;

  if (error) return <p>...error</p>;

  if (isResource(data) && data.id) {
    return (
      <section className="w-[50vw] m-auto">
        <code>{JSON.stringify(data)}</code>
      </section>
    );
  }
  return null;
}
