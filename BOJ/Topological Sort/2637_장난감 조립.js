const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));
const [N] = input[0];
const [M] = input[1];
const graph = Array.from({ length: N + 1 }, () => []);
const inDegrees = Array.from({ length: N + 1 }, () => 0);
const notBasic = {};
for (let i = 0; i < M; i++) {
  const [X, Y, K] = input[i + 2]; // 중간 부품이나 완제품 X를 만드는데 중간 부품 혹은 기본 부품 Y가 K개 필요하다
  graph[X].push([Y, K]);
  inDegrees[Y]++;
  notBasic[X] = true;
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
      if (rear.v <= parent.v) break;
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
        if (root.v < leftChild.v) {
          swapIdx = leftChildIdx;
        }
      }
      if (rightChildIdx < len) {
        rightChild = this.values[rightChildIdx];
        if (
          (swapIdx === null && root.v < rightChild.v) ||
          (swapIdx !== null && rightChild.v > leftChild.v)
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
  // const queue = []
  const pq = new PriorityQueue();
  const hash = {};
  let head = 0;
  for (let i = 1; i <= N; i++) {
    // if (inDegrees[i] === 0) queue.push([i, 1])
    if (inDegrees[i] === 0) pq.push([i, 1]);
  }
  // while (queue.length > head) {
  while (pq.values.length) {
    // const [v, cnt] = queue[head++]
    const [v, cnt] = pq.pop();
    for (const [nv, num] of graph[v]) {
      inDegrees[nv]--;
      if (!hash[nv]) hash[nv] = 0;
      hash[nv] += cnt * num;
      // if (inDegrees[nv] === 0) queue.push([nv, cnt*num])
      if (inDegrees[nv] === 0) pq.push([nv, hash[nv]]);
    }
  }
  return hash;
};

const hash = topologicalSort();
// console.log(hash)
const sorted = Object.entries(hash)
  .filter(([k]) => !notBasic[k])
  .sort((a, b) => a[0] - b[0]);
console.log(sorted.map((arr) => arr.join(" ")).join("\n"));

/*
어떤 장난감 완제품과 그에 필요한 부품들 사이의 관계가 주어져 있을 때
하나의 장난감 완제품을 조립하기 위하여 필요한 기본 부품의 종류별 개수를 계산하는 프로그램을 작성하시오.
(3 ≤ N ≤ 100)

완제품 혹은 중간 부품을 만들기 위해, 중간 부품 혹은 기본 부품이 필요하다
-> 선수과목. 위상정렬

[7]
6: 3
5: 2
4: 5

[6] -> 6: 3
5: 2 -> 5: 6 -> 5: 8
4: 4 -> 4: 12 -> 4: 17
3: 3 -> 3: 9

[5, 4, 3] -> 5: 8
2: 2 -> 2: 16
1: 2 -> 1: 16

[4, 3, 2, 1] -> 4
[3, 2, 1] -> 3
[]

-> 숫자 큰 것부터 먼저 탐색해야 기본 부품 개수 총합 구할 수 있음
-> 우선순위 큐. 최대힙

기본 부품 구하기
처음시도: 1부터 (X 중 가장 작은 수 -1)까지가 기본 부품일 것이다 -> 실패
다른사람풀이: X로 나오지 않는 것 모두가 기본 부품이라고 판단

10:40 ~ 11:27 (47m)
*/
