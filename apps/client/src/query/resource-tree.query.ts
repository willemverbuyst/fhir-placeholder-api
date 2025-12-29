import { queryOptions } from "@tanstack/react-query";

type TreeNode = {
  name: string;
  children: TreeNode[];
};

export function createResourceTreeQueryOptions() {
  return queryOptions({
    queryKey: ["resource-tree"],
    queryFn: () => getResourceTree(),
    staleTime: 1000 * 60, // 1 minute
  });
}

async function fetchResourceTree(): Promise<TreeNode> {
  const response = await fetch(
    "http://localhost:8080/api/v2/r5/$resource-tree",
  );

  return await response.json();
}

async function getResourceTree(): Promise<TreeNode> {
  const rawData = await fetchResourceTree();

  return rawData;
}
