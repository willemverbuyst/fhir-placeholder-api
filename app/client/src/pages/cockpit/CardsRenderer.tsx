import { ErrorAlert } from "@/components/alert/ErrorAlert";
import { InfoAlert } from "@/components/alert/InfoAlert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import type { Resource } from "fhir/r5";
import type React from "react";
import type { ConfigItem } from "../../config/fhirResources";
import type { MappedResource } from "../../interfaces/MappedResource";
import { getFilterKeys } from "../../lib/filter";
import { getSearchProperties } from "../../lib/search";
import { getInitialSortProperty, getSortKeys } from "../../lib/sort";
import { createResourcesQueryOptions } from "../../query/resources.query";
import { CardsRendererSkeleton } from "./CardsRendererSkeleton";
import { Cockpit } from "./Cockpit";

export function CardsRenderer<T extends Resource>(props: {
  item: ConfigItem<T>;
}): React.JSX.Element | null {
  const { resourceType, cardRows } = props.item;
  const { isPending, isError, error, data } = useQuery(
    createResourcesQueryOptions<T & { id: string }>({ resourceType }),
  );

  if (isPending) return <CardsRendererSkeleton />;
  if (isError) return <ErrorAlert error={error} />;
  if (!data) return <InfoAlert title="no data" />;

  if (data.length) {
    return (
      <Cockpit<MappedResource<T>>
        dataSource={data}
        searchProperties={getSearchProperties<T>(cardRows)}
        filterKeys={getFilterKeys<T>(cardRows, data)}
        sortKeys={getSortKeys<T>(cardRows)}
        initialSortProperty={getInitialSortProperty<T>(cardRows)}
      >
        {(resource): React.JSX.Element => (
          <Card key={String(resource.id)}>
            <CardHeader>
              <CardTitle className="uppercase">{resource.id}</CardTitle>
            </CardHeader>
            <CardContent>
              <section className="flex flex-col gap-2">
                {Object.entries(resource).map(([k, v]) => {
                  return (
                    <div
                      key={String(k)}
                      className="flex flex-col lg:flex-row lg:justify-between"
                    >
                      <p className="font-semibold">{String(k)}</p>
                      {Array.isArray(v) ? (
                        <ul>
                          {v.map((i) => (
                            <li key={i} className="text-right">
                              {" "}
                              {i}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p>{v}</p>
                      )}
                    </div>
                  );
                })}
              </section>
            </CardContent>
          </Card>
        )}
      </Cockpit>
    );
  }
  return null;
}
