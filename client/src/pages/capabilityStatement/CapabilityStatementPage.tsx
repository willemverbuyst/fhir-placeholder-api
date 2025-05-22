import { useQuery } from "@tanstack/react-query";
import type { CapabilityStatement } from "fhir/r5";
import { Card } from "../../components/Card";
import { type ConfigItems, FHIR_RESOURCES } from "../../config/fhirResources";
import { isResource } from "../../lib/fhir";
import { createResourcesQueryOptions } from "../../query/resources.query";

export function CapabilityStatementPage() {
  const { isPending, error, data } = useQuery(
    createResourcesQueryOptions<CapabilityStatement>({ url: "metadata" }),
  );

  if (isPending) return <p>...loading</p>;

  if (error) return <p>...error</p>;

  if (isResource(data) && data.id) {
    return (
      <div className="w-full min-h-[100vh] flex flex-col items-center gap-4">
        {data.rest?.map((i) => {
          if (i.mode === "server") {
            return (
              <section key={i.mode} className="grid grid-cols-1 gap-2">
                {i.resource?.map((r) => (
                  <Card
                    key={r.type}
                    bgColor={
                      r.type in FHIR_RESOURCES
                        ? FHIR_RESOURCES[r.type as keyof ConfigItems].bgColor
                        : undefined
                    }
                    headerText={r.type}
                    content={
                      <>
                        <section>
                          <p className="font-bold">Interaction</p>
                          <ul className="list-disc">
                            {r.interaction?.map((i) => (
                              <li key={i.code} className="ml-4">
                                {i.code}
                              </li>
                            ))}
                          </ul>
                        </section>

                        {!!r.searchParam?.length && (
                          <section>
                            <p className="font-bold">Search Params</p>
                            <ul className="list-disc">
                              {r.searchParam?.map((s) => (
                                <li key={s.name} className="ml-4">
                                  <section className="flex flex-col">
                                    <span>
                                      {s.name}&nbsp;-&nbsp;
                                      {s.documentation?.toLocaleLowerCase()}
                                    </span>
                                    <span>{s.definition}</span>
                                    <span>type:&nbsp;{s.type}</span>
                                  </section>
                                </li>
                              ))}
                            </ul>
                          </section>
                        )}
                      </>
                    }
                  />
                ))}
              </section>
            );
          }
          return null;
        })}
      </div>
    );
  }
  return null;
}
