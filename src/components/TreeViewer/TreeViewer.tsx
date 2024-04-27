import { useEffect, useMemo } from "react";
import ReactFlow, { Controls, useReactFlow } from "reactflow";
import "./treeViewer.css";
import "reactflow/dist/style.css";
import { useTreeContext } from "../../context/TreeContext";
import TreeNode from "./TreeNode";

const NODE_TYPES = { "tree-node": TreeNode };

const TreeViewer = () => {
  const { treeData, reactFlowAdapter } = useTreeContext();

  const { fitView } = useReactFlow();

  const { nodes, edges } = useMemo(() => {
    return reactFlowAdapter.adapt(treeData);
  }, [treeData]);

  useEffect(() => {
    setTimeout(() => fitView({ duration: 200 }), 0);
  }, [nodes, edges]);

  return (
    <div className="treeViewerContainer border">
      <ReactFlow nodes={nodes} edges={edges} nodeTypes={NODE_TYPES} fitView>
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default TreeViewer;
