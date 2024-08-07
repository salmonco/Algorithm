const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));
const [N, M] = input[0];
const graph = Array.from({ length: N + 1 }, () => []);
for (let i = 0; i < N - 1; i++) {
  const [s, e, d] = input[i + 1];
  graph[s].push([e, d]);
  graph[e].push([s, d]);
}

const bfs = (s, e) => {
  const queue = [[s, 0]];
  const visited = Array.from({ length: N + 1 }, () => false);
  let head = 0;
  visited[s] = true;
  while (queue.length > head) {
    const [v, d] = queue[head++];
    if (v === e) return d;
    // console.log(v, d)
    for (const [nv, nd] of graph[v]) {
      if (visited[nv]) continue;
      visited[nv] = true;
      queue.push([nv, d + nd]);
    }
  }
  return -1;
};

const ans = [];
for (let i = 0; i < M; i++) {
  const [s, e] = input[i + N];
  const dist = bfs(s, e);
  ans.push(dist);
}
console.log(ans.join("\n"));

/*
차례대로 입력받은 두 노드 사이의 거리를 출력한다.
*/
