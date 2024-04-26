import React, { createContext, ReactNode, useContext, useState } from "react";
import { Edge, Node } from "reactflow";

type TreeContextType = {
  nodes: Node[];
  edges: Edge[];
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
};

export const TreeContext = createContext<TreeContextType | null>(null);

export const useTreeContext = () => {
  const contextValue = useContext(TreeContext);

  if (!contextValue) {
    throw new Error(
      "useTreeContext has to be used within <TreeContext.Provider>"
    );
  }

  return contextValue;
};

export const TreeContextProvider = ({ children }: { children: ReactNode }) => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  return (
    <TreeContext.Provider value={{ nodes, edges, setNodes, setEdges }}>
      {children}
    </TreeContext.Provider>
  );
};
