const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map((v) => parseFloat(v)));
const [N] = input[0];
const edges = []; // [n1, n2, weight]

for (let i = 1; i <= N - 1; i++) {
  for (let j = i + 1; j <= N; j++) {
    const [x1, y1] = input[i];
    const [x2, y2] = input[j];
    const weight = Math.sqrt(Math.abs(x1 - x2) ** 2 + Math.abs(y1 - y2) ** 2); // distance
    edges.push([i, j, weight]);
  }
}
edges.sort((a, b) => a[2] - b[2]);
// console.log(edges)

const parents = [-1];
const selectedEdges = [];

for (let i = 1; i <= N; i++) {
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
  if (selectedEdges.length === N - 1) break;
  const edge = edges[i];
  const [A, B] = edge;

  if (isCycle(A, B)) continue;
  union(A, B);
  selectedEdges.push(edge);
}

const ans = selectedEdges.reduce((p, c) => p + c[2], 0);
console.log(ans.toFixed(2));

/*
최소 스패닝 트리
*/
