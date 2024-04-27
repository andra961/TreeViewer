import { Node, Edge } from "reactflow";
import { TreeNode } from "../../../parsers/parserApi";
import { ReactFlowAdapter, ReactFlowAdapterResult } from "./api";

import dagre, { GraphLabel } from "@dagrejs/dagre";
import { TREE_NODE_DIAMETER } from "../TreeNode";

const g = new dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));

const DEFAULT_OPTIONS = {
  rankdir: "BT",
  ranksep: 70,
  ranker: "longest-path",
};

export const getLayoutedElements = (
  nodes: Node[],
  edges: Edge[],
  options: GraphLabel = DEFAULT_OPTIONS
) => {
  g.setGraph(options);

  edges.forEach((edge) => g.setEdge(edge.source, edge.target));
  nodes.forEach((node) =>
    g.setNode(node.id, {
      label: node.data,
      width: TREE_NODE_DIAMETER,
      height: TREE_NODE_DIAMETER,
    })
  );

  dagre.layout(g);

  return {
    nodes: nodes.map((node) => {
      const { x, y } = g.node(node.id);

      return { ...node, position: { x, y } };
    }),
    edges,
  };
};

const adapt = (root: TreeNode): ReactFlowAdapterResult => {
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
  return getLayoutedElements(nodes, edges);
};

export const dagreAdapter: ReactFlowAdapter = {
  adapt,
};
