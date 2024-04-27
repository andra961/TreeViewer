import { Node, Edge } from "reactflow";
import { ParsedResult, TreeNode } from "./parserApi";

type ReactFlowAdapterResult = {
  nodes: Node[];
  edges: Edge[];
};

const adapt = (root: ParsedResult): ReactFlowAdapterResult => {
  const nodes: Node[] = [];
  const edges: Edge[] = [];
  let idCount = 0;
  const dfs = (node: TreeNode) => {
    if (!node) return "-1";
    const n = {
      id: idCount.toString(),
      data: { label: node.val },
      position: { x: 0, y: 0 },
      type: "tree-node",
    };
    idCount++;
    nodes.push(n);
    if (node.left) {
      const leftId = dfs(node.left);

      edges.push({
        target: n.id,
        source: leftId,
        targetHandle: "left",
        sourceHandle: "right",
        id: `${leftId}-${n.id}`,
        type: "straight",
        style: {
          stroke: "black",
        },
      });
    }

    if (node.right) {
      const rightId = dfs(node.right);

      edges.push({
        target: n.id,
        source: rightId,
        targetHandle: "right",
        sourceHandle: "left",
        id: `${rightId}-${n.id}`,
        type: "straight",
        style: {
          stroke: "black",
        },
      });
    }

    return n.id;
  };

  dfs(root);
  return { nodes, edges };
};

export const ReactFlowAdapter = {
  adapt,
};
