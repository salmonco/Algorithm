const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map(Number);
const N = input[0];

class Node {
  constructor(v) {
    this.v = v;
  }
}

class MinHeap {
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
    if (this.values.length === 0) return 0;
    const root = this.values[0];
    const pop = this.values.pop();
    if (this.values.length) {
      this.values[0] = pop;
      this.sinkDown();
    }
    return root.v;
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

const minHeap = new MinHeap();
const ans = [];

for (let i = 0; i < N; i++) {
  const x = input[i + 1];
  if (x === 0) {
    const pop = minHeap.pop();
    ans.push(pop);
  } else {
    minHeap.push(x);
  }
}
console.log(ans.join("\n"));

/*
널리 잘 알려진 자료구조 중 최소 힙이 있다. 최소 힙을 이용하여 다음과 같은 연산을 지원하는 프로그램을 작성하시오.
- 배열에 자연수 x를 넣는다.
- 배열에서 가장 작은 값을 출력하고, 그 값을 배열에서 제거한다.
프로그램은 처음에 비어있는 배열에서 시작하게 된다.
만약 x가 자연수라면 배열에 x라는 값을 넣는(추가하는) 연산이고,
x가 0이라면 배열에서 가장 작은 값을 출력하고 그 값을 배열에서 제거하는 경우이다.
(1 ≤ N ≤ 100,000)

11:26~11:39 (13m)
*/
