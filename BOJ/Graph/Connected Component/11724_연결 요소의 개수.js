const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));
const [N, M] = input[0];
const graph = Array.from({ length: N + 1 }, () => []);
const parent = Array.from({ length: N + 1 }, () => -1);
for (let i = 0; i < M; i++) {
  const [u, v] = input[i + 1];
  graph[u].push(v);
  // graph[v].push(u)
}

const find = (v) => {
  if (parent[v] === -1) return v;
  return (parent[v] = find(parent[v]));
};

const union = (v1, v2) => {
  const p1 = find(v1);
  const p2 = find(v2);
  if (p1 < p2) parent[p2] = p1;
  else parent[p1] = p2;
};

const isCycle = (v1, v2) => find(v1) === find(v2);

for (let i = 1; i <= N; i++) {
  for (const v of graph[i]) {
    if (isCycle(i, v)) continue;
    union(i, v);
  }
}
console.log(parent.filter((v) => v === -1).length - 1);

/*
방향 없는 그래프가 주어졌을 때, 연결 요소 (Connected Component)의 개수를 구하는 프로그램을 작성하시오.
(1 ≤ N ≤ 1,000, 0 ≤ M ≤ N×(N-1)/2)

*/
