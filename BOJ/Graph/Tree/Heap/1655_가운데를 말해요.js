const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map(Number);
const N = input[0];

class MinHeap {
  constructor() {
    this.heap = [];
  }

  getParentIdx(childIdx) {
    return Math.floor((childIdx - 1) / 2);
  }
  getLeftChildIdx(parentIdx) {
    return parentIdx * 2 + 1;
  }
  getRightChildIdx(parentIdx) {
    return parentIdx * 2 + 2;
  }

  peek() {
    return this.heap[0];
  }

  size() {
    return this.heap.length;
  }

  swap(idx1, idx2) {
    [this.heap[idx1], this.heap[idx2]] = [this.heap[idx2], this.heap[idx1]];
    return this.heap;
  }

  push(value) {
    this.heap.push(value);
    this.bubbleUp();
    return this.heap;
  }

  pop() {
    if (this.size() === 1) {
      return this.heap.pop();
    }
    if (this.size() === 0) {
      return null;
    }
    const value = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.bubbleDown();
    return value;
  }

  bubbleUp() {
    let childIdx = this.size() - 1;
    let parentIdx = this.getParentIdx(childIdx);

    while (this.heap[childIdx] < this.heap[parentIdx]) {
      this.swap(childIdx, parentIdx);
      childIdx = parentIdx;
      parentIdx = this.getParentIdx(childIdx);
    }
  }

  bubbleDown() {
    let parentIdx = 0;
    let leftIdx = this.getLeftChildIdx(parentIdx);
    let rightIdx = this.getRightChildIdx(parentIdx);

    while (
      (leftIdx < this.size() && this.heap[leftIdx] < this.heap[parentIdx]) ||
      (rightIdx < this.size() && this.heap[rightIdx] < this.heap[parentIdx])
    ) {
      let smallerIdx = leftIdx;
      if (this.heap[rightIdx] < this.heap[smallerIdx]) {
        smallerIdx = rightIdx;
      }

      this.swap(smallerIdx, parentIdx);
      parentIdx = smallerIdx;
      rightIdx = this.getRightChildIdx(parentIdx);
      leftIdx = this.getLeftChildIdx(parentIdx);
    }
  }
}

class MaxHeap extends MinHeap {
  bubbleUp() {
    let childIdx = this.size() - 1;
    let parentIdx = this.getParentIdx(childIdx);

    while (this.heap[childIdx] > this.heap[parentIdx]) {
      this.swap(childIdx, parentIdx);
      childIdx = parentIdx;
      parentIdx = this.getParentIdx(childIdx);
    }
  }

  bubbleDown() {
    let parentIdx = 0;
    let leftIdx = this.getLeftChildIdx(parentIdx);
    let rightIdx = this.getRightChildIdx(parentIdx);

    while (
      (leftIdx < this.size() && this.heap[leftIdx] > this.heap[parentIdx]) ||
      (rightIdx < this.size() && this.heap[rightIdx] > this.heap[parentIdx])
    ) {
      let largerIdx = leftIdx;
      if (this.heap[rightIdx] > this.heap[largerIdx]) {
        largerIdx = rightIdx;
      }

      this.swap(largerIdx, parentIdx);
      parentIdx = largerIdx;
      rightIdx = this.getRightChildIdx(parentIdx);
      leftIdx = this.getLeftChildIdx(parentIdx);
    }
  }
}

// solution
const minHeap = new MinHeap();
const maxHeap = new MaxHeap();
const answer = [];
let mid = Number.MIN_SAFE_INTEGER;

input2 = input.slice(1);
for (let num of input2) {
  if (num > mid) {
    minHeap.push(num);
  } else {
    maxHeap.push(num);
  }

  if (minHeap.size() > maxHeap.size()) {
    maxHeap.push(minHeap.pop());
  } else if (maxHeap.size() > minHeap.size()) {
    minHeap.push(maxHeap.pop());
  }

  if (minHeap.size() === maxHeap.size()) {
    mid = Math.min(minHeap.peek(), maxHeap.peek());
  } else if (minHeap.size() > maxHeap.size()) {
    mid = minHeap.peek();
  } else {
    mid = maxHeap.peek();
  }

  answer.push(mid);
}
console.log(answer.join("\n"));

/*
정렬은 꼭 해야 함. 근데 시간초과 (10^5)^2
logN으로 줄이기 -> heap
중간값을 어떻게 구하지? -> heap 두 개. 
max heap: 작은 절반의 숫자들을 저장
min heap: 큰 절반의 숫자들을 저장

-> 중간값 구할 때도 heap 사용 가능

참고: https://velog.io/@arthur/1655.-%EA%B0%80%EC%9A%B4%EB%8D%B0%EB%A5%BC-%EB%A7%90%ED%95%B4%EC%9A%94-node.js-javascript
*/
