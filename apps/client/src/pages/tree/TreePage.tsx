import { LoadingSpinner } from "@/components/LoadingSpinner";
import { ErrorAlert } from "@/components/alert/ErrorAlert";
import { InfoAlert } from "@/components/alert/InfoAlert";
import { createResourceTreeQueryOptions } from "@/query/resource-tree.query";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

export type TreeNode = {
  name: string;
  children: TreeNode[];
  x?: number;
  y?: number;
};

const H_SPACING = 360; // horizontal distance per depth
const V_SPACING = 40; // vertical distance per leaf

export function layoutDendrogram(root: TreeNode): {
  width: number;
  height: number;
} {
  let leafIndex = 0;
  let maxDepth = 0;

  function walk(node: TreeNode, depth: number): number {
    node.x = depth * H_SPACING;
    maxDepth = Math.max(maxDepth, depth);

    if (!node.children || node.children.length === 0) {
      node.y = leafIndex * V_SPACING;
      leafIndex++;
      return node.y;
    }

    const childYs = node.children.map((child) => walk(child, depth + 1));

    node.y = (childYs[0] + childYs[childYs.length - 1]) / 2;
    return node.y;
  }

  walk(root, 0);

  return {
    width: (maxDepth + 1) * H_SPACING,
    height: Math.max(1, leafIndex) * V_SPACING,
  };
}

// export function layoutDendrogram(
//   root: TreeNode,
//   topPadding = 10,
// ): { width: number; height: number } {
//   let leafIndex = 0;
//   let maxDepth = 0;
//   let minY = Infinity;
//   let maxY = -Infinity;

//   function walk(node: TreeNode, depth: number): number {
//     node.x = depth * H_SPACING;
//     maxDepth = Math.max(maxDepth, depth);

//     if (!node.children.length) {
//       node.y = leafIndex * V_SPACING;
//       leafIndex++;
//     } else {
//       const childYs = node.children.map((child) => walk(child, depth + 1));
//       node.y = (childYs[0] + childYs[childYs.length - 1]) / 2;
//     }

//     minY = Math.min(minY, node.y!);
//     maxY = Math.max(maxY, node.y!);

//     return node.y!;
//   }

//   walk(root, 0);

//   // ⬇️ SHIFT EVERYTHING DOWN
//   const offset = topPadding - minY;

//   function shift(node: TreeNode) {
//     node.y! += offset;
//     node.children.forEach(shift);
//   }

//   shift(root);

//   return {
//     width: (maxDepth + 1) * H_SPACING,
//     height: maxY - minY + topPadding * 2,
//   };
// }

export type Link = {
  source: TreeNode;
  target: TreeNode;
};

export function collectTree(root: TreeNode): {
  nodes: TreeNode[];
  links: Link[];
} {
  const nodes: TreeNode[] = [];
  const links: Link[] = [];

  function visit(node: TreeNode) {
    nodes.push(node);
    // biome-ignore lint/complexity/noForEach: <explanation>
    node.children.forEach((child) => {
      links.push({ source: node, target: child });
      visit(child);
    });
  }

  visit(root);
  return { nodes, links };
}

type PillLabelProps = {
  x: number;
  y: number;
  text: string;
};

export const PillLabel: React.FC<PillLabelProps> = ({ x, y, text }) => {
  const padding = 8;
  const height = 14;

  return (
    <g
      transform={`translate(${x + 10}, ${y - height / 2 - 6})`}
      pointerEvents="none"
    >
      {/* background */}
      <rect
        rx={height / 2}
        ry={height / 2}
        width={text.length * 6 + padding}
        height={height * 2}
        fill="#024a70"
      />
      {/* text */}
      <text
        x={padding}
        y={height / 2 + padding}
        fontSize={10}
        fill="#fff"
        dominantBaseline="middle"
      >
        {text}
      </text>
    </g>
  );
};

const Dendrogram: React.FC<{ data: TreeNode }> = ({ data }) => {
  const { nodes, links, width, height } = useMemo(() => {
    const { width, height } = layoutDendrogram(data);
    const { nodes, links } = collectTree(data);
    return { nodes, links, width, height };
  }, [data]);

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      style={{ fontFamily: "sans-serif" }}
    >
      <title>Resource Tree Visualization</title>
      {/* Links */}
      {links.map((l, i) => (
        <path
          key={i}
          d={`
            M ${l.source.x},${l.source.y}
            H ${l.target.x}
            V ${l.target.y}
          `}
          fill="none"
          stroke="#999"
          strokeWidth={1}
        />
      ))}

      {/* Labels */}
      {nodes.map((n) => (
        <PillLabel key={n.name} x={n.x ?? 0} y={n.y ?? 0} text={n.name} />
      ))}
    </svg>
  );
};

export function TreePage() {
  const { isPending, isError, error, data } = useQuery(
    createResourceTreeQueryOptions(),
  );

  if (isPending) return <LoadingSpinner />;
  if (isError) return <ErrorAlert error={error} />;
  if (!data) return <InfoAlert title="...no data" />;

  console.log({ wazup: data });

  return (
    <div className="p-10">
      <Dendrogram data={data as TreeNode} />
    </div>
  );
}
