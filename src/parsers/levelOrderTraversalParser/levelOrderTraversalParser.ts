import { Parser } from "../parserApi";
import { parser } from "./parser";

const inputDescription = `Example input: [1,2,3, null, 4]
`;

const description = `Parses a tree from an array which is the result of a level order traversal of the tree.
Null nodes represent null children from the above parents.
`;

export const LEVEL_ORDER_TRAVERSAL_PARSER: Parser = {
  name: "Level Order Traversal",
  inputDescription,
  description,
  parserFunction: parser.toString(),
};
