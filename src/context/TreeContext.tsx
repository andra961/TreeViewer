import React, { createContext, ReactNode, useContext, useState } from "react";
import { Edge, Node } from "reactflow";
import { useLocalStorage } from "usehooks-ts";
import { Parser } from "../parsers/parserApi";
import { LEVEL_ORDER_TRAVERSAL_PARSER } from "../parsers/levelOrderTraversalParser/levelOrderTraversalParser";

type TreeContextType = {
  nodes: Node[];
  edges: Edge[];
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
  parsers: Parser[];
  setParsers: React.Dispatch<React.SetStateAction<Parser[]>>;
  selectedParser: Parser;
  setSelectedParser: React.Dispatch<React.SetStateAction<Parser>>;
  editorValue: string;
  setEditorValue: React.Dispatch<React.SetStateAction<string>>;
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

  const [parsers, setParsers] = useLocalStorage<Parser[]>("parsers", []);

  const [selectedParser, setSelectedParser] = useState(
    LEVEL_ORDER_TRAVERSAL_PARSER
  );

  const [editorValue, setEditorValue] = useState(selectedParser.parserFunction);

  return (
    <TreeContext.Provider
      value={{
        nodes,
        edges,
        setNodes,
        setEdges,
        parsers: [LEVEL_ORDER_TRAVERSAL_PARSER, ...parsers],
        setParsers,
        selectedParser,
        setSelectedParser,
        editorValue,
        setEditorValue,
      }}
    >
      {children}
    </TreeContext.Provider>
  );
};
