const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));
const [N, M] = input[0];
const graph = {};
for (let i = 0; i < N; i++) {
  graph[i + 1] = [];
  const [n] = input[i + 1];
  for (let j = 0; j < n; j++) {
    const v = input[i + 1][j + 1];
    graph[i + 1].push(v);
  }
}
// console.log(graph)
const MAX = 1001;
const visited = Array.from({ length: MAX }, () => false);
const match = Array.from({ length: MAX }, () => 0);
let count = 0;

// v1: 직원, v2: 일
const dfs = (v1) => {
  if (visited[v1]) return false;
  visited[v1] = true;
  for (let v2 of graph[v1]) {
    if (match[v2] === 0 || dfs(match[v2])) {
      // v2에 연결된 v1이 없는 경우 || 기존에 연결되어 있던 v1이 또 다른 v2와 연결이 가능한 경우
      match[v2] = v1;
      return true;
    }
  }
  return false;
};

for (let i = 1; i <= N; i++) {
  for (let j = 0; j < 2; j++) {
    visited.fill(false); // 매번 방문여부를 초기화해야 함.
    if (dfs(i)) count++;
  }
}

console.log(count);

/*
이분 매칭(Bipartite Matching)

각 직원은 최대 두 개의 일을 할 수 있고, 각각의 일을 담당하는 사람은 1명이어야 한다.
-> 한 사람에 대해 dfs 두 번 돌리기
*/
