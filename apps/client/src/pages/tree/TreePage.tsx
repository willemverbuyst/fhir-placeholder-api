import { LoadingSpinner } from "@/components/LoadingSpinner";
import { ErrorAlert } from "@/components/alert/ErrorAlert";
import { InfoAlert } from "@/components/alert/InfoAlert";
import { cn } from "@/lib/utils";
import { createResourceTreeQueryOptions } from "@/query/resource-tree.query";
import { useQuery } from "@tanstack/react-query";
import { Resource } from "fhir/r5";
import { useState } from "react";

function ResourceItem({
  id,
  resourceType,
  children,
}: {
  id: string;
  resourceType: Resource["resourceType"];
  children?: React.ReactNode;
}) {
  const [zoomIn, setZoomIn] = useState<string | undefined>();

  return (
    <section className="flex gap-3">
      <button
        type="button"
        className={cn(
          "flex flex-col items-center p-4 rounded-md w-[350px] text-white cursor-pointer",
          zoomIn
            ? "bg-secondary font-bold hover:bg-secondary/90"
            : "bg-primary hover:bg-primary/90",
        )}
        onClick={() => {
          if (zoomIn) setZoomIn(undefined);
          else setZoomIn(id);
        }}
      >
        <span>{resourceType}</span>
        <span className="text-xs">{id}</span>
      </button>
      {children ? children : null}
    </section>
  );
}

export function RenderTree({ treeNode }: { treeNode: TreeNode }) {
  return (
    <ResourceItem
      key={String(treeNode.name)}
      id={String(treeNode.name.split("/")[1])}
      resourceType={treeNode.name.split("/")[0]}
    >
      <section className={"flex flex-col gap-3"}>
        {treeNode.children.map((child) => (
          <RenderTree key={child.name} treeNode={child} />
        ))}
      </section>
    </ResourceItem>
  );
}

export type TreeNode = {
  name: string;
  children: TreeNode[];
};

export function TreePage() {
  const { isPending, isError, error, data } = useQuery(
    createResourceTreeQueryOptions(),
  );

  if (isPending) return <LoadingSpinner />;
  if (isError) return <ErrorAlert error={error} />;
  if (!data) return <InfoAlert title="...no data" />;

  return data.children.map((child) => (
    <RenderTree key={child.name} treeNode={child} />
  ));
}
