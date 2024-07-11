const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));

const dijkstra = (start, graph, n) => {
  const distance = Array.from({ length: n + 1 }, () => Infinity);
  const queue = [];

  queue.push([start, 0]);
  distance[start] = 0;
  while (queue.length) {
    const [vertex, dist] = queue.shift();

    if (dist > distance[vertex] || !graph[vertex]) continue;

    for (const [to, cost] of graph[vertex]) {
      const newCost = dist + cost;

      if (distance[to] > newCost) {
        distance[to] = newCost;
        queue.push([to, newCost]);
      }
    }
  }
  return distance;
};

let line = 1;

while (line < input.length) {
  const [n, m, t] = input[line];
  const [s, g, h] = input[1 + line];
  const graph = Array.from({ length: n + 1 }, () => []);
  let gh = 0;

  for (let i = 0; i < m; i++) {
    const [a, b, d] = input[2 + line + i];

    graph[a].push([b, d]);
    graph[b].push([a, d]);
    if ((a === g && b === h) || (a === h && b === g)) {
      gh = d;
    }
  }

  const destCandidates = [];

  for (let i = 0; i < t; i++) {
    const x = input[2 + line + m + i];

    destCandidates.push(x);
  }

  const distS = dijkstra(s, graph, n);
  const distG = dijkstra(g, graph, n);
  const distH = dijkstra(h, graph, n);
  const dests = [];

  for (const dest of destCandidates) {
    const sghd = distS[g] + gh + distH[dest];
    const shgd = distS[h] + gh + distG[dest];

    if (
      distS[dest] !== Infinity &&
      (sghd === distS[dest] || shgd === distS[dest])
    ) {
      dests.push(dest);
    }
  }

  console.log([...dests].sort((a, b) => a - b).join(" "));

  line += 2 + m + t;
}

/*
최단 거리를 이루는 간선 중 (g, h)가 포함되는지 확인

방법 1. s-g-h-dest 혹은 s-h-g-dest가 s에서 dest로 가는 최단 시간과 같은지 확인
방법 2. 모든 가중치 2배. h-g 가중치만 1빼서 홀수. 목적지까지의 최단거리가 홀수면 h-g 포함한 것

16% 실패: s에서 목적지로 가는 경로가 없을 수도 있음 -> distS[dest] !== Infinity 체크
처음엔 g-h 사이의 거리를 distG[h]로 했는데, 빙 돌아서 가는 최단 거리가 있을 수 있지 않나? -> 그렇게 해도 정답이긴 한데 그냥 g-h 간선의 가중치를 저장
*/
