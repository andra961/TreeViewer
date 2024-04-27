import { Node, Edge } from "reactflow";
import { TreeNode } from "../../../parsers/parserApi";

export type ReactFlowAdapterResult = {
  nodes: Node[];
  edges: Edge[];
};

export type ReactFlowAdapter = {
  adapt: (root: TreeNode) => ReactFlowAdapterResult;
};
