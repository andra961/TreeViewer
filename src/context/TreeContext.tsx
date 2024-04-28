import React, { createContext, ReactNode, useContext, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { parseParserCode, Parser, TreeNode } from "../parsers/parserApi";
import { LEVEL_ORDER_TRAVERSAL_PARSER } from "../parsers/levelOrderTraversalParser/levelOrderTraversalParser";
import { ReactFlowAdapter } from "@components/TreeViewer/ReactFlowAdapters/api";
import { customAdapter } from "@components/TreeViewer/ReactFlowAdapters/customAdapter";

export const DEFAULT_INPUT = "[1,2,3,null,4]";

type TreeContextType = {
  treeData: TreeNode;
  setTreeData: React.Dispatch<React.SetStateAction<TreeNode>>;
  parsers: Parser[];
  setParsers: React.Dispatch<React.SetStateAction<Parser[]>>;
  selectedParser: Parser;
  setSelectedParser: React.Dispatch<React.SetStateAction<Parser>>;
  editorValue: string;
  setEditorValue: React.Dispatch<React.SetStateAction<string>>;
  reactFlowAdapter: ReactFlowAdapter;
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

export const TreeContextProvider = ({
  children,
  reactFlowAdapter,
}: {
  children: ReactNode;
  reactFlowAdapter?: ReactFlowAdapter;
}) => {
  const [selectedParser, setSelectedParser] = useState(
    LEVEL_ORDER_TRAVERSAL_PARSER
  );

  const [parsers, setParsers] = useLocalStorage<Parser[]>("parsers", []);

  const [editorValue, setEditorValue] = useState(selectedParser.parserFunction);

  const defaultTree = parseParserCode(selectedParser.parserFunction)(
    DEFAULT_INPUT
  );

  const [treeData, setTreeData] = useState<TreeNode>(defaultTree);

  return (
    <TreeContext.Provider
      value={{
        treeData,
        setTreeData,
        parsers: [LEVEL_ORDER_TRAVERSAL_PARSER, ...parsers],
        setParsers,
        selectedParser,
        setSelectedParser,
        editorValue,
        setEditorValue,
        reactFlowAdapter: reactFlowAdapter || customAdapter,
      }}
    >
      {children}
    </TreeContext.Provider>
  );
};
