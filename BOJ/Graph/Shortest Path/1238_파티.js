const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));
const [N, M, X] = input[0]; // N개의 마을, M개의 단방향 도로
const graph = Array.from({ length: N + 1 }, () => []);

for (let i = 0; i < M; i++) {
  const [start, end, time] = input[i + 1];
  graph[start].push([end, time]);
}

const dijkstra = (start) => {
  const distance = Array.from({ length: N + 1 }, () => Infinity);
  const queue = [[start, 0]]; // start, dist
  let head = 0;
  distance[start] = 0;
  while (queue.length > head) {
    const [s, time] = queue[head++];
    if (distance[s] < time) continue;
    for (let [e, t] of graph[s]) {
      const newTime = time + t;
      if (distance[e] < newTime) continue;
      distance[e] = newTime;
      queue.push([e, newTime]);
    }
  }
  return distance;
};

let ans = 0;
const distX = dijkstra(X);
for (let i = 1; i <= N; i++) {
  if (i === X) continue;
  const dist = dijkstra(i);
  const i2x = dist[X];
  const x2i = distX[i];
  const totalTime = i2x + x2i;
  ans = Math.max(ans, totalTime);
}
console.log(ans);

/*
어느 날 이 N명의 학생이 X (1 ≤ X ≤ N)번 마을에 모여서 파티를 벌이기로 했다.
각각의 학생들은 파티에 참석하기 위해 걸어가서 다시 그들의 마을로 돌아와야 한다.
하지만 이 학생들은 워낙 게을러서 최단 시간에 오고 가기를 원한다.
이 도로들은 단방향이기 때문에 아마 그들이 오고 가는 길이 다를지도 모른다.
첫 번째 줄에 N명의 학생들 중 오고 가는데 가장 오래 걸리는 학생의 소요시간을 출력한다.

(1 ≤ N ≤ 1,000)
(1 ≤ M ≤ 10,000)

최단경로. 다익스트라
N -> X -> N
*/
