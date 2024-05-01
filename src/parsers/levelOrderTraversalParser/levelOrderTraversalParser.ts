import { Parser } from "../parserApi";

const inputDescription = `Ex: [1,2,3, null, 4].
It represents the serialized format of a binary tree using level order traversal, 
where null signifies a path terminator where no node exists below
`;

const description = `Parses a Binary Tree from an array which represents the serialized format of a binary tree using level order traversal, where null signifies a path terminator where no node exists below.
`;

const parserString = `function parser(input) {
  const parsed = JSON.parse(input);

  // null root or empty array edge case
  if (parsed[0] === null || parsed[0] === undefined) return;

  /* builds a node given its value
     val be shown on the tree as the label of the node, 
     it can be easily changed according to needs by assigning a different value
  */
  const createNode = (val) => ({ val: val });

  const root = createNode(parsed[0]);

  const nodesQueue = [root];

  let currNode = null;

  const appendChild = (childVal) => {
    const childNode = childVal !== null ? createNode(childVal) : null;
    currNode[currNode.left === undefined ? "left" : "right"] = childNode;
    if (childNode !== null) {
      nodesQueue.push(childNode);
    }
    if (currNode.left !== undefined && currNode.right !== undefined) {
      currNode = null;
    }
  };

  for (let i = 1; i < parsed.length; i++) {
    const n = parsed[i];
    if (currNode === null) currNode = nodesQueue.shift();
    appendChild(n);
  }

  return root;
}`;

export const LEVEL_ORDER_TRAVERSAL_PARSER: Parser = {
  name: "Level Order Traversal",
  inputDescription,
  description,
  parserFunction: parserString,
};
