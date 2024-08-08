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
  const [n, ...arr] = input[i + 1];
  let prev = arr[0];
  for (let j = 1; j < n; j++) {
    const c = arr[j];
    graph[prev].push(c);
    inDegrees[c]++;
    prev = c;
  }
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
// console.log(hash, inDegrees)
const disabled = inDegrees.some((v) => v > 0);
if (disabled) {
  console.log(0);
} else {
  const sorted = Object.entries(hash)
    .sort((a, b) => a[1] - b[1])
    .map((arr) => arr[0]);
  console.log(sorted.join("\n"));
}

/*
보조 PD들이 만든 순서들이 입력으로 주어질 때, 전체 가수의 순서를 정하는 프로그램을 작성하시오.
답이 여럿일 경우에는 아무거나 하나를 출력 한다. 만약 남일이가 순서를 정하는 것이 불가능할 경우에는 첫째 줄에 0을 출력한다.
*/
