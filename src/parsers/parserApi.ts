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
  | undefined;

export type ParsedResult = TreeNode;
