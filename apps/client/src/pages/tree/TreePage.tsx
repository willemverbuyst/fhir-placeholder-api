import { LoadingSpinner } from "@/components/LoadingSpinner";
import { ErrorAlert } from "@/components/alert/ErrorAlert";
import { InfoAlert } from "@/components/alert/InfoAlert";
import { cn } from "@/lib/utils";
import { createResourceTreeQueryOptions } from "@/query/resource-tree.query";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export type TreeNode = {
  name: string;
  children: TreeNode[];
};

function getNamesOfChildren(nodes: TreeNode[]): string[] {
  let names: string[] = [];
  for (const node of nodes) {
    names.push(node.name);
    if (node.children.length > 0) {
      names = names.concat(getNamesOfChildren(node.children));
    }
  }
  return names;
}

function ResourceItem({
  treeNode,
  children,
  highlightedResources,
  setHighlightedResources,
}: {
  treeNode: TreeNode;
  children?: React.ReactNode;
  highlightedResources: string[];
  setHighlightedResources: (ids: string[]) => void;
}) {
  const resourceType = treeNode.name.split("/")[0];
  const id = treeNode.name.split("/")[1];

  function handleClick() {
    if (highlightedResources?.includes(treeNode.name)) {
      setHighlightedResources([]);
    } else {
      const allChildNames = getNamesOfChildren(treeNode.children);
      setHighlightedResources([treeNode.name, ...allChildNames]);
      //
      // setHighlightedResources([treeNode.name]);
    }
  }

  return (
    <section className="flex gap-3">
      <button
        type="button"
        className={cn(
          "flex flex-col items-center p-4 rounded-md w-[350px] text-white cursor-pointer",
          highlightedResources?.includes(treeNode.name)
            ? "bg-secondary font-bold hover:bg-secondary/90"
            : "bg-primary hover:bg-primary/90",
        )}
        onClick={() => handleClick()}
      >
        <span className="sticky top-0 flex flex-col items-center gap-1">
          <span>{resourceType}</span>
          <span className="text-xs">{id}</span>
        </span>
      </button>
      {children ? children : null}
    </section>
  );
}

function RenderTree({
  treeNode,
  highlightedResources,
  setHighlightedResources,
}: {
  treeNode: TreeNode;
  highlightedResources: string[];
  setHighlightedResources: (ids: string[]) => void;
}) {
  return (
    <ResourceItem
      key={treeNode.name}
      treeNode={treeNode}
      highlightedResources={highlightedResources}
      setHighlightedResources={setHighlightedResources}
    >
      <section className={"flex flex-col gap-3"}>
        {treeNode.children.map((child) => (
          <RenderTree
            key={child.name}
            treeNode={child}
            highlightedResources={highlightedResources}
            setHighlightedResources={setHighlightedResources}
          />
        ))}
      </section>
    </ResourceItem>
  );
}

export function TreePage() {
  const { isPending, isError, error, data } = useQuery(
    createResourceTreeQueryOptions(),
  );

  const [highlightedResources, setHighlightedResources] = useState<string[]>(
    [],
  );

  if (isPending) return <LoadingSpinner />;
  if (isError) return <ErrorAlert error={error} />;
  if (!data) return <InfoAlert title="...no data" />;

  return data.children.map((child) => (
    <RenderTree
      key={child.name}
      treeNode={child}
      highlightedResources={highlightedResources}
      setHighlightedResources={setHighlightedResources}
    />
  ));
}
