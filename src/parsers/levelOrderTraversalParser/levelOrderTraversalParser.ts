import { Parser } from "../parserApi";
import { parser } from "./parser";

const description = `Parses a tree from an array which is the result of a level order traversal of the tree.
Null nodes represent null children from the above parents.
`;

export const LEVEL_ORDER_TRAVERSAL_PARSER: Parser = {
  name: "Level Order Traversal",
  inputDescription: "des",
  description,
  parserFunction: parser.toString(),
};
