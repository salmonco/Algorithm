const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));
const [V, E] = input[0];
const edges = [];
for (let i = 0; i < E; i++) {
  edges.push(input[1 + i]);
}
edges.sort((a, b) => a[2] - b[2]);
// console.log(edges)

const parents = [-1];
const selectedEdges = [];

for (let i = 1; i <= V; i++) {
  parents[i] = -1;
}

const find = (x) => {
  if (parents[x] < 0) return x;
  parents[x] = find(parents[x]);
  return parents[x];
};

const union = (x, y) => {
  const p1 = find(x);
  const p2 = find(y);

  if (p1 < p2) parents[p2] = p1;
  else parents[p1] = p2;
};

const isCycle = (x, y) => {
  const p1 = find(x);
  const p2 = find(y);

  return p1 === p2;
};

for (let i = 0; i < edges.length; i++) {
  if (selectedEdges.length === V - 1) break;
  const edge = edges[i];
  const [A, B] = edge;

  if (isCycle(A, B)) continue;
  union(A, B);
  selectedEdges.push(edge);
}

console.log(selectedEdges.reduce((p, c) => p + c[2], 0));
