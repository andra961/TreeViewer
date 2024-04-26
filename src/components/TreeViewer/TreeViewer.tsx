import Dagre, { GraphLabel } from "@dagrejs/dagre";
import { useMemo } from "react";
import ReactFlow, {
  ReactFlowProvider,
  Controls,
  Background,
  Node,
  Edge,
} from "reactflow";
import "./treeViewer.css";
import "reactflow/dist/style.css";
import { useTreeContext } from "../../context/TreeContext";
import TreeNode from "./TreeNode";

const g = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));

const getLayoutedElements = (
  nodes: Node[],
  edges: Edge[],
  options: GraphLabel
) => {
  g.setGraph(options);

  edges.forEach((edge) => g.setEdge(edge.source, edge.target));
  nodes.forEach((node) => g.setNode(node.id, { label: node.data, width: 40 }));

  Dagre.layout(g);

  return {
    nodes: nodes.map((node) => {
      const { x, y } = g.node(node.id);

      return { ...node, position: { x, y } };
    }),
    edges,
  };
};

const TreeViewer = () => {
  const { nodes: initialNodes, edges: initialEdges } = useTreeContext();

  const { nodes, edges } = useMemo(() => {
    return getLayoutedElements(initialNodes, initialEdges, {
      rankdir: "BT",
      ranksep: 100,
    });
  }, [initialNodes, initialEdges]);

  return (
    <div className="treeViewerContainer">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={{ "tree-node": TreeNode }}
        fitView
      >
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default TreeViewer;
