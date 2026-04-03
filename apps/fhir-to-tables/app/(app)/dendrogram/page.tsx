"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ErrorAlert } from "@/components/alert/error-alert";
import { InfoAlert } from "@/components/alert/info-alert";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import {
  createResourceTreeQueryOptions,
  TreeNode,
} from "@/query/resource-tree.query";

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
          "flex flex-col items-center p-4 rounded-md text-white cursor-pointer w-67.5 min-h-14 shrink-0",
          highlightedResources?.includes(treeNode.name)
            ? "bg-chart-2 hover:bg-chart-2/90"
            : "bg-chart-1 hover:bg-chart-1/90",
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

export default function DendrogramPage() {
  const { isPending, isError, error, data } = useQuery(
    createResourceTreeQueryOptions(),
  );

  const [highlightedResources, setHighlightedResources] = useState<string[]>(
    [],
  );

  if (isPending) return <Spinner />;
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
