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
  const [A, B] = input[i + 1];
  graph[A].push(B);
  inDegrees[B]++;
}

const topologicalSort = () => {
  const queue = [];
  let head = 0;
  const hash = {};
  for (let i = 1; i <= N; i++) {
    if (inDegrees[i] === 0) queue.push([i, 0]);
  }
  while (queue.length > head) {
    const [v, cnt] = queue[head++];
    hash[v] = cnt;
    for (const nv of graph[v]) {
      inDegrees[nv]--;
      if (inDegrees[nv] === 0) queue.push([nv, cnt + 1]);
    }
  }
  return hash;
};
const hash = topologicalSort();
const sorted = Object.entries(hash)
  .sort((a, b) => a[1] - b[1])
  .map((arr) => arr[0]);
console.log(sorted.join(" "));

/*
일부 학생들의 키를 비교한 결과가 주어졌을 때, 줄을 세우는 프로그램을 작성하시오.
첫째 줄에 N(1 ≤ N ≤ 32,000), M(1 ≤ M ≤ 100,000)이 주어진다.

선수과목. 위상정렬
*/
