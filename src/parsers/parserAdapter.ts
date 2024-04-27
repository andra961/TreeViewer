import { Node, Edge } from "reactflow";
import { ParserResult } from "./defaultParser";

type ReactFlowAdapterResult = {
  nodes: Node[];
  edges: Edge[];
};

const adapt = ({ nodes, edges }: ParserResult): ReactFlowAdapterResult => {
  return {
    nodes: nodes.map((n) => ({
      ...n,
      data: { label: n.data },
      position: { x: 0, y: 0 },
      type: "tree-node",
    })),
    edges: edges.map((e) => ({
      ...e,
      id: `${e.source}-${e.target}`,
      type: "straight",
    })),
  };
};

export const ReactFlowAdapter = {
  adapt,
};
