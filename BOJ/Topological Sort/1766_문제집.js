const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));
const [N, M] = input[0];
const graph = Array.from({ length: N + 1 }, () => []);
const inDegrees = Array.from({ length: N + 1 }, () => 0);
for (let i = 0; i < M; i++) {
  const [A, B] = input[i + 1];
  graph[A].push(B);
  inDegrees[B]++;
}

class Node {
  constructor(v) {
    this.v = v;
  }
}

class PriorityQueue {
  constructor() {
    this.values = [];
  }
  push(v) {
    const newNode = new Node(v);
    this.values.push(newNode);
    this.bubbleUp();
  }
  bubbleUp() {
    let idx = this.values.length - 1;
    const rear = this.values[idx];
    while (idx > 0) {
      let parentIdx = Math.floor((idx - 1) / 2);
      let parent = this.values[parentIdx];
      if (rear.v >= parent.v) break;
      this.values[parentIdx] = rear;
      this.values[idx] = parent;
      idx = parentIdx;
    }
  }
  pop() {
    if (this.values.length === 0) return -1;
    const root = this.values[0];
    const rear = this.values.pop();
    if (this.values.length) {
      this.values[0] = rear;
      this.sinkDown();
    }
    return root.v;
  }
  sinkDown() {
    let idx = 0;
    const len = this.values.length;
    const root = this.values[idx];
    while (true) {
      let leftChildIdx = 2 * idx + 1;
      let rightChildIdx = 2 * idx + 2;
      let leftChild, rightChild;
      let swapIdx = null;
      if (leftChildIdx < len) {
        leftChild = this.values[leftChildIdx];
        if (root.v > leftChild.v) {
          swapIdx = leftChildIdx;
        }
      }
      if (rightChildIdx < len) {
        rightChild = this.values[rightChildIdx];
        if (
          (swapIdx === null && root.v > rightChild.v) ||
          (swapIdx !== null && rightChild.v < leftChild.v)
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

const topologicalSort = () => {
  const pq = new PriorityQueue();
  const order = [];
  for (let i = 1; i <= N; i++) {
    if (inDegrees[i] === 0) pq.push(i);
  }
  while (pq.values.length > 0) {
    const v = pq.pop();
    order.push(v);
    for (const nv of graph[v]) {
      inDegrees[nv]--;
      if (inDegrees[nv] === 0) pq.push(nv);
    }
  }
  return order;
};

const order = topologicalSort();
console.log(order.join(" "));

/*
1. N개의 문제는 모두 풀어야 한다.
2. 먼저 푸는 것이 좋은 문제가 있는 문제는, 먼저 푸는 것이 좋은 문제를 반드시 먼저 풀어야 한다.
3. 가능하면 쉬운 문제부터 풀어야 한다.
1번 문제가 가장 쉬운 문제이고 N번 문제가 가장 어려운 문제가 된다.

위상정렬

처음시도: 같은 순서면 숫자 작은순으로 정렬 -> 실패
다른사람풀이: 우선순위 큐. 작은 숫자 문제가 먼저 나오도록
*/
