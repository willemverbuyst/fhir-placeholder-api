import { useQuery } from "@tanstack/react-query";
import { createMetadataQueryOptions } from "../../query/metadata.query";
import { Card } from "../../ui/Card";

export function CapabilityStatementPage() {
  const { isPending, error, data } = useQuery(createMetadataQueryOptions());

  if (isPending) return <p>...loading</p>;
  if (error) return <p>...error</p>;
  if (!data) return <p>...no data</p>;

  return (
    <div className="w-full min-h-[100vh] flex flex-col items-center gap-4">
      {data?.rest?.map((i) => {
        if (i.mode === "server") {
          return (
            <section key={i.mode} className="grid grid-cols-1 gap-2">
              {i.resource?.map((r) => (
                <Card
                  key={r.type}
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
