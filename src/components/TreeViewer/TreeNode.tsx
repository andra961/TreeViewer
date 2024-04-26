import React from "react";
import { Handle, NodeProps, Position } from "reactflow";

const TreeNode = ({ data }: NodeProps) => {
  return (
    <div className="treeNode">
      <Handle
        type="target"
        position={Position.Bottom}
        style={{ visibility: "hidden", bottom: "0px" }}
      />
      <div>{data.label}</div>
      <Handle
        type="source"
        position={Position.Top}
        style={{ visibility: "hidden", top: "1px" }}
      />
    </div>
  );
};

export default TreeNode;
