const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));
const [N] = input[0]; // 도시의 개수
const [M] = input[1]; // 버스의 개수
const [S, E] = input[M + 2];
const graph = {};
for (let i = 0; i < M; i++) {
  const [start, end, c] = input[i + 2];
  if (!graph[start]) graph[start] = [];
  graph[start].push([end, c]);
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
    if (this.values.length > 0) {
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
  const dist = Array.from({ length: N + 1 }, () => Infinity);
  const pq = new PriorityQueue();
  dist[start] = 0;
  pq.push(start, 0);
  while (pq.values.length) {
    const { value: v, priority: c } = pq.pop();
    if (dist[v] < c) continue;
    if (!graph[v]) continue;
    for (let [nv, nc] of graph[v]) {
      const newCost = c + nc;
      if (dist[nv] <= newCost) continue;
      dist[nv] = newCost;
      pq.push(nv, newCost);
    }
  }
  return dist;
};

const dist = dijkstra(S);
console.log(dist[E]);

/*
A번째 도시에서 B번째 도시까지 가는데 드는 최소비용을 출력하여라.
버스 비용은 0보다 크거나 같고, 100,000보다 작은 정수이다.
-> 다익스트라

2%에서 메모리초과
-> 최대한 빠른 시간 내에 최단거리를 계산해내기 위해, dist를 오름차순 정렬해주는 우선순위 큐를 이용해야 한다.

30%에서 메모리초과
-> if (dist[nv] < newCost) continue에서 부등호를 <=로 변경하여 메모리 덜 쓰고 시간 단축
*/
