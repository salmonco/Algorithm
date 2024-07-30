const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));
const [N] = input[0]; // 회원의 수 <= 50
const graph = Array.from({ length: N + 1 }, () => []);
let line = 1;
while (true) {
  const [A, B] = input[line++];
  if (A === -1 && B === -1) break;
  graph[A].push(B);
  graph[B].push(A);
}

const bfs = (start) => {
  const queue = [[start, 0]];
  const visited = Array.from({ length: N + 1 }, () => false);
  let head = 0;
  let maxDist = 0;
  visited[start] = true;
  while (queue.length > head) {
    const [v, dist] = queue[head++];
    maxDist = Math.max(maxDist, dist);
    for (const next of graph[v]) {
      if (visited[next]) continue;
      queue.push([next, dist + 1]);
      visited[next] = true;
    }
  }
  return maxDist;
};

const hash = {};
for (let i = 1; i <= N; i++) {
  const maxDist = bfs(i);
  if (!hash[maxDist]) hash[maxDist] = [];
  hash[maxDist].push(i);
}
const minDist = Math.min(...Object.keys(hash));
const candidates = Object.entries(hash).find(([k, v]) => +k === minDist)[1];
const cnt = candidates.length;
const targets = candidates.sort((a, b) => a - b);
console.log(`${minDist} ${cnt}`);
console.log(targets.join(" "));

/*
그래프 + bfs

- 어느 회원이 다른 모든 회원과 친구이면, 이 회원의 점수는 1점이다.
- 어느 회원의 점수가 2점이면, 다른 모든 회원이 친구이거나 친구의 친구임을 말한다.
- 어느 회원의 점수가 3점이면, 다른 모든 회원이 친구이거나, 친구의 친구이거나, 친구의 친구의 친구임을 말한다.
회장은 회원들 중에서 점수가 가장 작은 사람이 된다.

첫째 줄에는 회장 후보의 점수와 후보의 수를 출력하고,
두 번째 줄에는 회장 후보를 오름차순으로 모두 출력한다.

각 노드에서 최대 거리 구하기
*/
