export function parser(input) {
  const parsed = JSON.parse(input);

  if (parsed[0] === null || parsed[0] === undefined) return;

  const root = { val: parsed[0] };

  const nodesQueue = [root];

  let currNode = null;
  let currChild = 0;

  const appendChild = (childVal) => {
    if (childVal !== null) {
      const childNode = { val: childVal };
      currNode[currChild === 0 ? "left" : "right"] = childNode;
      nodesQueue.push(childNode);
    }
    currChild++;
    if (currChild > 1) {
      currNode = null;
      currChild = 0;
    }
  };

  for (let i = 1; i < parsed.length; i++) {
    const n = parsed[i];
    if (currNode === null) currNode = nodesQueue.shift();
    appendChild(n);
  }

  return root;
}
