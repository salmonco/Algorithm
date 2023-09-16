const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));
const [N, M] = input[0];
const graph = Array.from({ length: N + 1 }, () => []);
const inDegrees = Array.from({ length: N + 1 }, () => 0);

for (let i = 0; i < M; i++) {
  const [A, B] = input[1 + i];

  graph[A].push(B);
  inDegrees[B]++;
}

const topologicalSort = (graph) => {
  const obj = {};
  const queue = [];

  for (let i = 1; i <= N; i++) {
    if (!inDegrees[i]) queue.push([i, 1]);
  }

  while (queue.length) {
    const [vertex, cnt] = queue.shift();

    obj[vertex] = cnt;
    for (const v of graph[vertex]) {
      inDegrees[v]--;
      if (!inDegrees[v]) queue.push([v, cnt + 1]);
    }
  }
  return obj;
};

const obj = topologicalSort(graph);
const answer = [];

for (let i = 1; i <= N; i++) {
  if (obj[i]) answer.push(obj[i]);
  else answer.push(1);
}
console.log(answer.join(" "));

/*
그래프에서 간선을 제거하는 거로 구현 -> 시간초과
-> inDegrees 배열 이용
*/
