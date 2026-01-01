import { LoadingSpinner } from "@/components/LoadingSpinner";
import { ErrorAlert } from "@/components/alert/ErrorAlert";
import { InfoAlert } from "@/components/alert/InfoAlert";
import { cn } from "@/lib/utils";
import {
  TreeNode,
  createResourceTreeQueryOptions,
} from "@/query/resource-tree.query";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

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
    }
  }

  return (
    <section className="flex gap-3">
      <button
        type="button"
        className={cn(
          "flex flex-col items-center p-4 rounded-md text-white cursor-pointer w-[270px] min-h-14 shrink-0",
          highlightedResources?.includes(treeNode.name)
            ? "bg-secondary font-bold hover:bg-secondary/90"
            : "bg-primary hover:bg-primary/90",
        )}
        onClick={() => handleClick()}
      >
        <div className="sticky top-0 flex flex-col gap-1 py-1">
          <span>{resourceType}</span>
          <span className="text-xs">{id}</span>
        </div>
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
    <section>
      <ResourceItem
        key={treeNode.name}
        treeNode={treeNode}
        highlightedResources={highlightedResources}
        setHighlightedResources={setHighlightedResources}
      >
        <section className={`grid grid-rows-${treeNode.children.length} gap-3`}>
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
    </section>
  );
}

export function DendrogramPage() {
  const { isPending, isError, error, data } = useQuery(
    createResourceTreeQueryOptions(),
  );

  const [highlightedResources, setHighlightedResources] = useState<string[]>(
    [],
  );

  if (isPending) return <LoadingSpinner />;
  if (isError) return <ErrorAlert error={error} />;
  if (!data) return <InfoAlert title="...no data" />;

  return (
    <div className="justify-self-center p-4">
      <section className={`grid grid-rows-${data.children.length} gap-3`}>
        {data.children.map((child) => (
          <RenderTree
            key={child.name}
            treeNode={child}
            highlightedResources={highlightedResources}
            setHighlightedResources={setHighlightedResources}
          />
        ))}
      </section>
    </div>
  );
}
