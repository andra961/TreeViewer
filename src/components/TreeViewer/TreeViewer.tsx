import { useEffect, useMemo, useRef } from "react";
import ReactFlow, { Controls, useReactFlow } from "reactflow";
import "./treeViewer.css";
import "reactflow/dist/style.css";
import { useTreeContext } from "../../context/TreeContext";
import TreeNode from "./TreeNode";
import { debounce } from "../../utils";
import { useResizeObserver } from "usehooks-ts";

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

  const debouncedFitView = useMemo(
    () =>
      debounce(() => {
        fitView({ duration: 200 });
      }, 110),
    [fitView]
  );

  const ref = useRef<HTMLDivElement>(null);

  useResizeObserver({
    ref,
    onResize: debouncedFitView,
  });

  return (
    <ReactFlow
      ref={ref}
      nodes={nodes}
      edges={edges}
      nodeTypes={NODE_TYPES}
      fitView
    >
      <Controls fitViewOptions={{ duration: 200 }} />
    </ReactFlow>
  );
};

export default TreeViewer;
