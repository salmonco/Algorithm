const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));
const [N] = input[0];
const [M] = input[1];
const graph = Array.from({ length: N + 1 }, () => []);
for (let i = 0; i < M; i++) {
  const [a, b, c] = input[i + 2];
  graph[a].push([b, c]);
}

const bfs = (s) => {
  const queue = [[s, 0]];
  const distances = Array.from({ length: N + 1 }, () => Infinity);
  let head = 0;
  distances[s] = 0;
  while (queue.length > head) {
    const [cCity, cCost] = queue[head++];
    // console.log(cCity)
    if (distances[cCity] < cCost) continue;
    for (const [nCity, nCost] of graph[cCity]) {
      const newCost = cCost + nCost;
      if (distances[nCity] < newCost) continue;
      distances[nCity] = newCost;
      queue.push([nCity, newCost]);
    }
  }
  return distances;
};

const ans = [];
for (let i = 1; i <= N; i++) {
  const dist = bfs(i);
  ans.push(
    dist
      .slice(1)
      .map((v) => (v === Infinity ? 0 : v))
      .join(" ")
  );
}
console.log(ans.join("\n"));

/*
n(2 ≤ n ≤ 100)개의 도시가 있다.
m(1 ≤ m ≤ 100,000)개의 버스가 있다.
모든 도시의 쌍 (A, B)에 대해서 도시 A에서 B로 가는데 필요한 비용의 최솟값을 구하는 프로그램을 작성하시오.
비용은 100,000보다 작거나 같은 자연수이다.
시작 도시와 도착 도시를 연결하는 노선은 하나가 아닐 수 있다.

다익스트라를 각각 도시에서 돌리기

-> 실패 -> 시작점과 도착점이 같지 않더라도 Infinity, 즉 갈 수 없는 경우를 고려해야 한다.
https://velog.io/@ywc8851/%EB%B0%B1%EC%A4%80-11404-%ED%94%8C%EB%A1%9C%EC%9D%B4%EB%93%9C-javascript

다른사람풀이: 플로이드 와샬
*/
