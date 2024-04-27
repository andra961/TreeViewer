import { parser } from "./parser";

export type Parser = {
  name: string;
  description?: string;
  inputDescription?: string;
  parserFunction: string;
};

export type ParserResult = {
  nodes: {
    id: string;
    data: string;
  }[];
  edges: {
    source: string;
    target: string;
  }[];
};

export const DEFAULT_PARSER: Parser = {
  name: "Level Order Traversal",
  inputDescription: "des",
  description: "des",
  parserFunction: parser.toString(),
};
