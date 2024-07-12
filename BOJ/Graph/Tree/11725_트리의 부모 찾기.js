const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));
const [N] = input[0];
const edges = {};
for (let i = 1; i <= N; i++) {
  edges[i] = [];
}
for (let i = 0; i < N - 1; i++) {
  const [v1, v2] = input[i + 1];
  edges[v1].push(v2);
  edges[v2].push(v1);
}
const parent = Array.from({ length: N + 1 }, () => -1);
const bfs = (start) => {
  const queue = [start];
  const visited = Array.from({ length: N + 1 }, () => false);
  let head = 0;
  while (queue.length > head) {
    const v = queue[head++];
    visited[v] = true;
    for (let to of edges[v]) {
      if (visited[to]) continue;
      parent[to] = v;
      queue.push(to);
    }
  }
};
bfs(1);
const ans = parent.slice(2).join("\n");
console.log(ans);

/*
트리
노드의 루트를 찾는 것이 아닌, 바로 위 부모를 찾는 것임
union-find를 쓰지 않고, edges 따라가면서 visited 놓고 완전 탐색하기
*/
