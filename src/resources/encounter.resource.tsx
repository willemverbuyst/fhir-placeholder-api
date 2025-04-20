import { useQuery } from "@tanstack/react-query";
import { Encounter } from "fhir/r5";
import { ErrorMessage } from "../components/ErrorMessage";
import { List } from "../components/List";
import { ListItem } from "../components/ListItem";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { createResourcesQueryOptions } from "../query/resources.query";
import { Observations } from "./observation.resource";

export function Encounters({ episodeId }: { episodeId: string }) {
  const { isPending, error, data } = useQuery(
    createResourcesQueryOptions<Encounter>({
      url: `Encounter?episode-of-care=${episodeId}`,
      queryKeys: ["encounter", episodeId],
    })
  );

  if (isPending) return <LoadingSpinner />;

  if (error) return <ErrorMessage error={error} />;

  if (!data.entry) return null;

  return (
    <List>
      {data.entry.map((e) =>
        e.resource?.id ? (
          <ListItem
            key={e.resource.id}
            id={e.resource.id}
            className="bg-green-600"
            children={<Observations encounterId={e.resource.id} />}
          />
        ) : null
      )}
    </List>
  );
}
