const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));
const [N, E] = input[0]; // 정점의 개수, 간선의 개수
const [v1, v2] = input[1 + E];
const graph = {};
for (let i = 0; i < E; i++) {
  const [a, b, c] = input[i + 1];
  if (!graph[a]) graph[a] = [];
  if (!graph[b]) graph[b] = [];
  graph[a].push([b, c]);
  graph[b].push([a, c]);
}

class Node {
  constructor(v, p) {
    this.v = v;
    this.p = p;
  }
}

class PriorityQueue {
  constructor() {
    this.values = [];
  }
  push(v, p) {
    const newNode = new Node(v, p);
    this.values.push(newNode);
    this.bubbleUp();
  }
  bubbleUp() {
    let idx = this.values.length - 1;
    const end = this.values[idx];
    while (idx > 0) {
      let parentIdx = Math.floor((idx - 1) / 2);
      let parent = this.values[parentIdx];
      if (end.p >= parent.p) break;
      this.values[parentIdx] = end;
      this.values[idx] = parent;
      idx = parentIdx;
    }
  }
  pop() {
    const root = this.values[0];
    const end = this.values.pop();
    if (this.values.length) {
      this.values[0] = end;
      this.sinkDown();
    }
    return root;
  }
  sinkDown() {
    let idx = 0;
    const root = this.values[idx];
    const len = this.values.length;
    while (true) {
      let leftChildIdx = 2 * idx + 1;
      let rightChildIdx = 2 * idx + 2;
      let leftChild, rightChild;
      let swapIdx = null;
      if (leftChildIdx < len) {
        leftChild = this.values[leftChildIdx];
        if (root.p > leftChild.p) {
          swapIdx = leftChildIdx;
        }
      }
      if (rightChildIdx < len) {
        rightChild = this.values[rightChildIdx];
        if (
          (swapIdx === null && root.p > rightChild.p) ||
          (swapIdx !== null && rightChild.p < leftChild.p)
        ) {
          swapIdx = rightChildIdx;
        }
      }
      if (swapIdx === null) break;
      this.values[idx] = this.values[swapIdx];
      this.values[swapIdx] = root;
      idx = swapIdx;
    }
  }
}

const dijkstra = (start) => {
  const dist = Array.from({ length: N + 1 }, () => Infinity);
  const pq = new PriorityQueue();
  dist[start] = 0;
  pq.push(start, 0);
  while (pq.values.length) {
    const { v, p } = pq.pop();
    if (p > dist[v]) continue;
    if (!graph[v]) continue;
    for (const [nv, np] of graph[v]) {
      const newP = p + np;
      if (newP >= dist[nv]) continue;
      dist[nv] = newP;
      pq.push(nv, newP);
    }
  }
  return dist;
};

const distS = dijkstra(1);
const distV1 = dijkstra(v1);
const distV2 = dijkstra(v2);
const StoV1 = distS[v1];
const StoV2 = distS[v2];
const V1toV2 = distV1[v2];
const V1toE = distV1[N];
const V2toE = distV2[N];
const case1 = StoV1 + V1toV2 + V2toE;
const case2 = StoV2 + V1toV2 + V1toE;
const ans = Math.min(case1, case2);
console.log(ans === Infinity ? -1 : ans);

/*
방향성이 없는 그래프가 주어진다. 1번 정점에서 N번 정점으로 이동할 때,
주어진 두 정점을 반드시 거치면서 최단 경로로 이동하는 프로그램을 작성하시오.
첫째 줄에 두 개의 정점을 지나는 최단 경로의 길이를 출력한다. 그러한 경로가 없을 때에는 -1을 출력한다.

처음 생각: v1과 v2를 지났다는 것을 체크해야 한다. 최단거리 구해서 경로 역추적. K번째 최단경로를 생각. 근데 최대 몇 번째까지 구해야 하는지 모름
다른사람풀이: S->v1->v2->E, S->v2->v1->E 중 최단거리 구하기
*/
