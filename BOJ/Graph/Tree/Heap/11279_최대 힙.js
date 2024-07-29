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

class MaxHeap {
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
    const end = this.values[idx];
    while (idx > 0) {
      let parentIdx = Math.floor((idx - 1) / 2);
      let parent = this.values[parentIdx];
      if (end.v <= parent.v) break;
      this.values[parentIdx] = end;
      this.values[idx] = parent;
      idx = parentIdx;
    }
  }
  pop() {
    if (this.values.length === 0) return 0;
    const root = this.values[0];
    const end = this.values.pop();
    if (this.values.length) {
      this.values[0] = end;
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

const maxHeap = new MaxHeap();
const ans = [];
for (let i = 0; i < N; i++) {
  const x = input[i + 1];
  if (x > 0) {
    // 배열에 x라는 값을 추가
    maxHeap.push(x);
  } else {
    // 배열에서 가장 큰 값을 출력하고 그 값을 배열에서 제거
    const pop = maxHeap.pop();
    ans.push(pop);
  }
}
console.log(ans.join("\n"));

/*
최대 힙
*/
