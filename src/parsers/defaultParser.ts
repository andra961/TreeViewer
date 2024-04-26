import { Edge, Node } from "reactflow";

export const defaultParser = (input: string) => {
  const nodes: Node[] = [];
  const edges: Edge[] = [];

  const parsed: (number | null)[] = JSON.parse(input);

  const nodesQueue: number[] = [];

  let currNode: number | null = null;

  const createEdge = (s: number, t: number) => {
    edges.push({
      source: s.toString(),
      target: t.toString(),
      id: `${s}-${t}`,
      type: "straight",
    });
  };

  parsed.forEach((p, i) => {
    if (currNode !== null) {
      if (p !== null) createEdge(i, currNode);
      currNode = null;
    } else if (nodesQueue.length > 0) {
      currNode = nodesQueue.shift()!;
      if (p !== null) createEdge(i, currNode);
    }
    if (p !== null) {
      nodes.push({
        id: i.toString(),
        data: { label: p.toString() },
        position: { x: 0, y: 0 },
        type: "tree-node",
      });
      nodesQueue.push(i);
    }
  });

  return { nodes, edges };
};
