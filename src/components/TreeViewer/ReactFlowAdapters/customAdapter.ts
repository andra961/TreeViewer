import { TreeNode } from "../../../parsers/parserApi";
import { ReactFlowAdapter } from "./api";
import { Node, Edge } from "reactflow";

export const adapt = (root: TreeNode, xDistance = 80, yDistance = 80) => {
  const nodes: Node[] = [];
  const edges: Edge[] = [];
  if (!root)
    return {
      nodes,
      edges,
    };

  let idCount = 0;

  const queue: (null | (TreeNode & { parent?: string }))[] = [root];

  const levels: (null | number)[][] = [];

  let nonNull = 1;

  const addToQueue = (
    node: (typeof queue)[number],
    parent: string | undefined
  ) => {
    if (node) nonNull++;
    queue.push(node ? { ...node, parent } : null);
  };

  while (nonNull > 0) {
    const levelSize = queue.length;
    const currLevel: (null | number)[] = [];
    for (let i = 0; i < levelSize; i++) {
      const curr = queue.shift();
      let id = -1;
      if (curr) {
        id = idCount++;
        nonNull--;
        nodes.push({
          id: id.toString(),
          data: { label: curr.val },
          position: { x: 0, y: 0 },
          type: "tree-node",
        });

        if (curr.parent) {
          const [dir, parentId] = curr.parent.split("-");
          edges.push({
            target: parentId,
            source: id.toString(),
            targetHandle: dir,
            sourceHandle: dir === "left" ? "right" : "left",
            id: `${id}-${parentId}`,
            type: "straight",
            style: {
              stroke: "black",
            },
          });
        }
      }
      currLevel.push(curr ? id : null);
      addToQueue(curr?.left || null, curr ? `left-${id}` : undefined);
      addToQueue(curr?.right || null, curr ? `right-${id}` : undefined);
    }

    levels.push(currLevel);
  }

  let currY = (levels.length - 1) * yDistance;
  let currStartX = 0;
  let currEndX = ((levels.at(-1)?.length || 1) - 1) * xDistance;

  for (let i = levels.length - 1; i >= 0; i--) {
    const distanceInLevel =
      (currEndX - currStartX) / Math.max(levels[i].length - 1, 1);
    for (let j = 0; j < levels[i].length; j++) {
      const node = levels[i][j];
      if (node === null) continue;
      nodes[node].position = {
        x: currStartX + j * distanceInLevel,
        y: currY,
      };
    }
    currStartX = currStartX + distanceInLevel / 2;
    currEndX = currEndX - distanceInLevel / 2;
    currY -= yDistance;
  }

  return { nodes, edges };
};

export const customAdapter: ReactFlowAdapter = {
  adapt,
};
