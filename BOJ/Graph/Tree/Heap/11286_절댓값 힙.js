const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map(Number);
const N = input[0]; // 연산의 개수

class Node {
  constructor(v) {
    this.v = v;
    this.abs = Math.abs(v);
  }
}

class AbsHeap {
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
      if (end.abs > parent.abs) break;
      if (end.abs === parent.abs && end.v >= parent.v) break;
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
        if (
          root.abs > leftChild.abs ||
          (root.abs === leftChild.abs && root.v > leftChild.v)
        ) {
          swapIdx = leftChildIdx;
        }
      }
      if (rightChildIdx < len) {
        rightChild = this.values[rightChildIdx];
        if (
          (swapIdx === null &&
            (root.abs > rightChild.abs ||
              (root.abs === rightChild.abs && root.v > rightChild.v))) ||
          (swapIdx !== null &&
            (rightChild.abs < leftChild.abs ||
              (rightChild.abs === leftChild.abs && rightChild.v < leftChild.v)))
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

const absHeap = new AbsHeap();
const ans = [];

for (let i = 0; i < N; i++) {
  const x = input[i + 1];
  if (x !== 0) {
    // 배열에 x라는 값을 넣는 연산
    absHeap.push(x);
  } else {
    // 배열에서 절댓값이 가장 작은 값을 출력하고 그 값을 배열에서 제거하는 경우
    // 절댓값이 가장 작은 값이 여러개일 때는, 가장 작은 수로 한다.
    if (absHeap.values.length === 0) {
      ans.push(0);
    } else {
      const { v } = absHeap.pop();
      ans.push(v);
    }
  }
}
console.log(ans.join("\n"));

/*
절댓값 힙은 다음과 같은 연산을 지원하는 자료구조이다.
- 배열에 정수 x (x ≠ 0)를 넣는다.
- 배열에서 절댓값이 가장 작은 값을 출력하고, 그 값을 배열에서 제거한다. 절댓값이 가장 작은 값이 여러개일 때는, 가장 작은 수를 출력하고, 그 값을 배열에서 제거한다.
프로그램은 처음에 비어있는 배열에서 시작하게 된다.
입력되는 정수는 -231보다 크고, 231보다 작다.
입력에서 0이 주어진 회수만큼 답을 출력한다.
만약 배열이 비어 있는 경우인데 절댓값이 가장 작은 값을 출력하라고 한 경우에는 0을 출력하면 된다.

힙. logN
*/
