import { ErrorAlert } from "@/components/alert/ErrorAlert";
import { InfoAlert } from "@/components/alert/InfoAlert";
import { CardsSkeleton } from "@/components/skeleton/CardSkeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { createMetadataQueryOptions } from "../../query/metadata.query";

export function CapabilityStatementPage() {
  const { isPending, isError, error, data } = useQuery(
    createMetadataQueryOptions(),
  );

  if (isPending)
    return (
      <div className="grid grid-cols-1 2xl:grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <CardsSkeleton key={i} />
        ))}
      </div>
    );
  if (isError) return <ErrorAlert error={error} />;
  if (!data) return <InfoAlert title="no data" />;

  return (
    <div className="justify-self-center p-4">
      <div className="w-full min-h-screen flex flex-col items-center gap-4">
        {data?.rest?.map((i) => {
          if (i.mode === "server") {
            return (
              <section
                key={i.mode}
                className="grid grid-cols-1 2xl:grid-cols-2 gap-4"
              >
                {i.resource?.map((r) => (
                  <Card key={r.type}>
                    <CardHeader>
                      <CardTitle className="uppercase">{r.type}</CardTitle>
                    </CardHeader>

                    <CardContent>
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
                    </CardContent>
                  </Card>
                ))}
              </section>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}
