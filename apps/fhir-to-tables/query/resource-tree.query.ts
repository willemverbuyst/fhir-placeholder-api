import { queryOptions } from "@tanstack/react-query";
import { z } from "zod";

export type TreeNode = {
  name: string;
  children: TreeNode[];
};

const resourceTreeSchema: z.ZodType<TreeNode> = z.lazy(() =>
  z.object({
    name: z.string(),
    children: z.array(z.lazy(() => resourceTreeSchema)),
  }),
);

type ResourceTreeSchema = z.infer<typeof resourceTreeSchema>;

export function createResourceTreeQueryOptions() {
  return queryOptions({
    queryKey: ["resource-tree"],
    queryFn: () => getResourceTree(),
    staleTime: 1000 * 60, // 1 minute
  });
}

async function fetchResourceTree(): Promise<ResourceTreeSchema> {
  const response = await fetch("http://localhost:3000/api/fhir/$resource-tree");

  return await response.json();
}

async function getResourceTree(): Promise<ResourceTreeSchema> {
  const rawData = await fetchResourceTree();

  resourceTreeSchema.parse(rawData);

  return rawData;
}
