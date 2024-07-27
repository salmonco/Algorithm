const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));
const [V, E] = input[0]; // 정점의 개수, 간선의 개수
const [K] = input[1]; // 시작 정점의 번호
const graph = {};
for (let i = 0; i < E; i++) {
  const [u, v, w] = input[i + 2];
  if (!graph[u]) graph[u] = [];
  graph[u].push([v, w]);
}

class Node {
  constructor(v, p) {
    this.value = v;
    this.priority = p;
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
      if (end.priority >= parent.priority) break;
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
        if (root.priority > leftChild.priority) {
          swapIdx = leftChildIdx;
        }
      }
      if (rightChildIdx < len) {
        rightChild = this.values[rightChildIdx];
        if (
          (swapIdx === null && root.priority > rightChild.priority) ||
          (swapIdx !== null && rightChild.priority < leftChild.priority)
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
  const dist = Array.from({ length: V + 1 }, () => Infinity);
  const pq = new PriorityQueue();
  pq.push(start, 0);
  dist[start] = 0;
  while (pq.values.length) {
    const { value: v, priority: w } = pq.pop();
    if (w > dist[v]) continue;
    if (!graph[v]) continue;
    for (const [nv, nw] of graph[v]) {
      const newWeight = w + nw;
      if (newWeight >= dist[nv]) continue;
      dist[nv] = newWeight;
      pq.push(nv, newWeight);
    }
  }
  return dist;
};

const dist = dijkstra(K);
const ans = dist.slice(1).map((w) => (w === Infinity ? "INF" : w));
console.log(ans.join("\n"));

/*
방향그래프가 주어지면 주어진 시작점에서 다른 모든 정점으로의 최단 경로를 구하는 프로그램을 작성하시오.
단, 모든 간선의 가중치는 10 이하의 자연수이다.
시작점 자신은 0으로 출력하고, 경로가 존재하지 않는 경우에는 INF를 출력하면 된다.

다익스트라
*/
