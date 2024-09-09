const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));
const [V] = input[0];
const graph = Array.from({ length: V + 1 }, () => []);
for (let i = 0; i < V; i++) {
  const [s, ...arr] = input[i + 1];
  for (let j = 0; j < arr.length; j += 2) {
    if (arr[j] === -1) break;
    const [e, w] = [arr[j], arr[j + 1]];
    graph[s].push([e, w]);
    graph[e].push([s, w]);
  }
}

const bfs = (s) => {
  const queue = [[s, 0]];
  const visited = Array.from({ length: V + 1 }, () => false);
  let maxDist = 0;
  let maxNode = null;
  let head = 0;
  visited[s] = true;
  while (queue.length > head) {
    const [cNode, cWeight] = queue[head++];
    if (maxDist < cWeight) {
      maxDist = cWeight;
      maxNode = cNode;
    }
    for (const [nNode, nWeight] of graph[cNode]) {
      if (visited[nNode]) continue;
      const newWeight = cWeight + nWeight;
      queue.push([nNode, newWeight]);
      visited[nNode] = true;
    }
  }
  return { maxDist, maxNode };
};

// const dist1 = bfs(1).slice(1)
// const maxNode = dist1.indexOf(Math.max(...dist1))+1
// const dist2 = bfs(maxNode).slice(1)
// const maxDist = Math.max(...dist2)
// console.log(maxDist)
const { maxNode } = bfs(1);
const { maxDist } = bfs(maxNode);
console.log(maxDist);

/*
트리의 지름이란, 트리에서 임의의 두 점 사이의 거리 중 가장 긴 것을 말한다. 트리의 지름을 구하는 프로그램을 작성하시오.
(2 ≤ V ≤ 100,000)

처음시도: 트리->사이클이 없는 그래프. 음수의 가중치라도 다익스트라 이용 가능
-> 메모리초과
-> 다익스트라는 최단경로 구하는 거라, 그냥 bfs 돌리기

12:23~12:48 (25m)
*/
