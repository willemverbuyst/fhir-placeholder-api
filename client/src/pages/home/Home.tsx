import { useQuery } from "@tanstack/react-query";
import { createResourcesQueryOptions } from "../../query/resources.query";

export function Home() {
  const { isPending, error, data } = useQuery(
    createResourcesQueryOptions({ url: "metadata" }),
  );

  if (isPending) return <p>...loading</p>;

  if (error) return <p>...error</p>;

  return (
    <section className="w-[50vw] m-auto">
      <code>{JSON.stringify(data)}</code>
    </section>
  );
}
