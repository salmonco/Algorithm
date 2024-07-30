const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));
const [N, M] = input[0];
const graph = Array.from({ length: N + 1 }, () => []);
for (let i = 0; i < M; i++) {
  const [A, B] = input[i + 1];
  graph[A].push(B);
  graph[B].push(A);
}
// console.log(graph)
const bfs = (start) => {
  const queue = [[start, 0]];
  const visited = Array.from({ length: N + 1 }, () => false);
  const history = [];
  let maxDist = 0;
  let head = 0;
  visited[start] = true;
  while (queue.length > head) {
    const [v, dist] = queue[head++];
    if (maxDist < dist) {
      maxDist = dist;
    }
    history.push([dist, v]);
    for (const next of graph[v]) {
      if (visited[next]) continue;
      queue.push([next, dist + 1]);
      visited[next] = true;
    }
  }
  return { maxDist, history };
};
const { maxDist, history } = bfs(1);
const candidates = history.filter(([dist]) => dist === maxDist);
const cnt = candidates.length;
const target = Math.min(...candidates.map(([_, v]) => v));
console.log(`${target} ${maxDist} ${cnt}`);

/*
그래프 + bfs

재서기는 수혀니가 1번 헛간부터 찾을 것을 알고 있다. 모든 헛간은 M(1<= M <= 50,000)개의 양방향 길
1번 헛간에서의 거리가 최대가 되도록 하는 헛간 찾기

첫 번째는 숨어야 하는 헛간 번호를(만약 거리가 같은 헛간이 여러개면 가장 작은 헛간 번호를 출력한다),
두 번째는 그 헛간까지의 거리를,
세 번째는 그 헛간과 같은 거리를 갖는 헛간의 개수를 출력해야한다.

처음 생각: 다익스트라 + 최대 경로
다른사람풀이: bfs
*/
