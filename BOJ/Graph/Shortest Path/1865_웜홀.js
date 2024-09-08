const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));
const [TC] = input[0];

const bellmanFord = (N, graph) => {
  const dist = Array.from({ length: N + 1 }, () => 0);
  for (let i = 1; i <= N; i++) {
    for (const [s, e, t] of graph) {
      if (dist[e] > dist[s] + t) {
        dist[e] = dist[s] + t;
      }
    }
  }

  let isNegativeCycle = false;
  for (let i = 1; i <= N; i++) {
    for (const [s, e, t] of graph) {
      if (dist[e] > dist[s] + t) {
        isNegativeCycle = true;
        break;
      }
    }
    if (isNegativeCycle) break;
  }
  return isNegativeCycle;
};

const ans = [];
let line = 1;
for (let i = 0; i < TC; i++) {
  const [N, M, W] = input[line++];
  const graph = [];
  for (let j = 0; j < M; j++) {
    const [S, E, T] = input[line++];
    graph.push([S, E, T]);
    graph.push([E, S, T]);
  }
  for (let j = 0; j < W; j++) {
    const [S, E, T] = input[line++];
    graph.push([S, E, -T]);
  }
  const isNegativeCycle = bellmanFord(N, graph);
  ans.push(isNegativeCycle ? "YES" : "NO");
}
console.log(ans.join("\n"));

/*
벨만-포드 알고리즘

월드나라에는 N개의 지점이 있고 N개의 지점 사이에는 M개의 도로와 W개의 웜홀이 있다. (단 도로는 방향이 없으며 웜홀은 방향이 있다.)
웜홀은 시작 위치에서 도착 위치로 가는 하나의 경로인데, 특이하게도 도착을 하게 되면 시작을 하였을 때보다 시간이 뒤로 가게 된다.
한 지점에서 출발을 하여서 시간여행을 하기 시작하여 다시 출발을 하였던 위치로 돌아왔을 때, 출발을 하였을 때보다 시간이 되돌아가 있는 경우가 있는지 없는지 궁금해졌다. 여러분은 백준이를 도와 이런 일이 가능한지 불가능한지 구하는 프로그램을 작성하여라.
지점의 수 N(1 ≤ N ≤ 500), 도로의 개수 M(1 ≤ M ≤ 2500), 웜홀의 개수 W(1 ≤ W ≤ 200)
T는 10,000보다 작거나 같은 자연수 또는 0이다.
두 지점을 연결하는 도로가 한 개보다 많을 수도 있다. 지점의 번호는 1부터 N까지 자연수로 중복 없이 매겨져 있다.
TC개의 줄에 걸쳐서 만약에 시간이 줄어들면서 출발 위치로 돌아오는 것이 가능하면 YES, 불가능하면 NO를 출력한다.

다익스트라: 간선이 음수일 때 최단 경로를 구할 수 없다. 만약 사이클을 형성하게 되면, 비용이 무한히 작아지기 때문.
이러한 문제점을 해결하기 위해 나온 알고리즘이 벨만 포드이다.
다만 시간복잡도가 늘어나기 때문에 가중치가 모두 양수일 경우 다익스트라를 사용하는 것이 좋다.
시간 복잡도가 늘어나는 이유는 그리디하게 최소 비용 경로를 찾아가는 다익스트라와 달리, 벨만 포드는 모든 경우의 수를 고려하는 동적 계획법이 사용되기 때문이다.
마지막으로 여기서 한 번더 수행했을 때 값이 바뀐다면 음의 사이클이 존재하는 것이다.
https://roytravel.tistory.com/340

임의의 한 지점에서 출발을 하므로 단순히 그래프상에 음의 사이클이 있는지 없는지 확인만 하면 되는 문제
https://hellominchan.tistory.com/322

12:53~13:40 (47m)
*/
