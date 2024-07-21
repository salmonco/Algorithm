const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));
const [N] = input[0];
const [M] = input[1];
const [S, E] = input[M + 2];
const graph = Array.from({ length: N + 1 }, () => []);

for (let i = 0; i < M; i++) {
  const [start, end, c] = input[i + 2];
  graph[start].push([end, c]);
}

const dijkstra = (start) => {
  const dist = Array.from({ length: N + 1 }, () => Infinity);
  const path = Array.from({ length: N + 1 }, () => -1);
  const queue = [[start, 0]]; // start, dist
  let head = 0;
  dist[start] = 0;
  while (queue.length > head) {
    const [v, c] = queue[head++];
    if (c > dist[v]) continue; // 이거 중요. 시간초과 방지
    // console.log(v, c, dist)
    for (let [nv, nc] of graph[v]) {
      const newCost = c + nc;
      if (newCost >= dist[nv]) continue;
      dist[nv] = newCost;
      path[nv] = v;
      queue.push([nv, newCost]);
    }
  }
  return [dist, path];
};

const tracePath = (path, end) => {
  const result = [];
  let current = end;
  while (current !== -1) {
    result.push(current);
    const prev = path[current];
    current = prev;
  }
  return result.reverse();
};

const [dist, path] = dijkstra(S);
const trace = tracePath(path, E);
console.log(dist[E]);
console.log(trace.length);
console.log(trace.join(" "));

/*
n(1≤n≤1,000)개의 도시가 있다. 그리고 한 도시에서 출발하여 다른 도시에 도착하는 m(1≤m≤100,000)개의 버스가 있다.
첫째 줄에 출발 도시에서 도착 도시까지 가는데 드는 최소 비용을 출력한다.
둘째 줄에는 그러한 최소 비용을 갖는 경로에 포함되어있는 도시의 개수를 출력한다. 출발 도시와 도착 도시도 포함한다.
셋째 줄에는 최소 비용을 갖는 경로를 방문하는 도시 순서대로 출력한다.

다익스트라 + 경로 역추적

* 예제에서는 출력이 1 3 5 가 나오는데 최단경로가 여러개가 생길 수 있기 떄문에 1 4 5 도 맞음

-> 실패 -> 동일한 출발지와 도착지를 가지는 여러 간선이 있을 경우 문제가 생길 수 있습니다. 즉, 더 작은 비용의 간선으로 업데이트해야 합니다.
-> cost 2차원 배열 대신 graph 배열 사용
-> 20%에서 시간초과 -> if (c > dist[v]) continue; 조건 추가
*/
