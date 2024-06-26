import { Handle, NodeProps, Position } from "reactflow";

export const TREE_NODE_DIAMETER = 40;

const TreeNode = ({ data }: NodeProps) => {
  return (
    <div
      className="treeNode"
      style={{ width: TREE_NODE_DIAMETER, height: TREE_NODE_DIAMETER }}
    >
      <Handle
        type="target"
        position={Position.Left}
        id={"left"}
        style={{ visibility: "hidden", top: "80%", left: "5px" }}
      />
      <Handle
        type="target"
        position={Position.Right}
        id={"right"}
        style={{ visibility: "hidden", top: "80%", right: "5px" }}
      />
      <div>{data.label}</div>
      <Handle
        type="source"
        position={Position.Left}
        id={"left"}
        style={{ visibility: "hidden", top: "3px", left: "10px" }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id={"right"}
        style={{ visibility: "hidden", top: "3px", right: "10px" }}
      />
    </div>
  );
};

export default TreeNode;
