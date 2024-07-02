const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));
const [N, K] = input[0];
const MAX_SIZE = N + 1;
const match = Array.from({ length: MAX_SIZE }, () => -1);
const visited = Array.from({ length: MAX_SIZE }, () => false);
const graph = {};
for (let i = 1; i <= N; i++) {
  graph[i] = [];
}
for (let i = 0; i < K; i++) {
  const [r, c] = input[i + 1];
  graph[r].push(c);
}
// console.log(graph)
const dfs = (v1) => {
  for (let v2 of graph[v1]) {
    if (visited[v2]) continue;
    visited[v2] = true;
    if (match[v2] === -1 || dfs(match[v2])) {
      match[v2] = v1;
      return true;
    }
  }
  return false;
};

let cnt = 0;
for (let i = 1; i <= N; i++) {
  visited.fill(false);
  if (dfs(i)) cnt++;
}
console.log(cnt);

/*
열 번호와 행 번호: 정점
돌멩이의 위치: 간선

Minimum Vertext Cover = 이분그래프의 최대유량
-> 이분 매칭
*/
