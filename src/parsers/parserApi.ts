import TreeNode from "@components/TreeViewer/TreeNode";

export type Parser = {
  name: string;
  description?: string;
  inputDescription?: string;
  parserFunction: string;
};

export type TreeNode =
  | {
      val: string;
      left: TreeNode;
      right: TreeNode;
    }
  | undefined
  | null;

export type ParserFunction = (data: string) => TreeNode;

export const parseParserCode = (parserCode: string): ParserFunction => {
  const parser = new Function("return " + parserCode);
  return parser() as ParserFunction;
};
