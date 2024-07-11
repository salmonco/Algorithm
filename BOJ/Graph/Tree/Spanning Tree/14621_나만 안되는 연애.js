const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" "));
const [N, M] = input[0].map(Number);
const gender = ["", ...input[1]];
const graph = [];

for (let i = 0; i < M; i++) {
  const [u, v, d] = input[2 + i].map(Number);

  graph.push([u, v, d]);
  graph.push([v, u, d]);
}
graph.sort((a, b) => a[2] - b[2]);

const parents = Array.from({ length: N + 1 }, () => -1);

const find = (x) => {
  if (parents[x] === -1) return x;
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

const selectedEdges = [];

for (let i = 0; i < graph.length; i++) {
  if (selectedEdges.length === N - 1) break;
  const [u, v, d] = graph[i];

  if (isCycle(u, v) || gender[u] === gender[v]) continue;
  union(u, v);
  selectedEdges.push(graph[i]);
}
console.log(
  selectedEdges.length === N - 1
    ? selectedEdges.reduce((p, c) => p + c[2], 0)
    : -1
);
