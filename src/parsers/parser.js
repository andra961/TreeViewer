export function parser(input) {
  const nodes = [];
  const edges = [];

  const parsed = JSON.parse(input);

  const nodesQueue = [];

  let currNode = null;

  const createEdge = (s, t) => {
    edges.push({
      source: s.toString(),
      target: t.toString(),
    });
  };

  parsed.forEach((p, i) => {
    if (currNode !== null) {
      if (p !== null) createEdge(i, currNode);
      currNode = null;
    } else if (nodesQueue.length > 0) {
      currNode = nodesQueue.shift();
      if (p !== null) createEdge(i, currNode);
    }
    if (p !== null) {
      nodes.push({
        id: i.toString(),
        data: p.toString(),
      });
      nodesQueue.push(i);
    }
  });

  return { nodes, edges };
}
