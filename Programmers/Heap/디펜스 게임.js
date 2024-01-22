class MaxHeap {
  constructor() {
    this.heap = [];
  }
  size() {
    return this.heap.length;
  }
  push(value) {
    this.heap.push(value);
    this.bubbleUp();
    return this.heap;
  }
  pop() {
    if (this.size() === 1) return this.heap.pop();
    if (this.size() === 0) return null;
    const root = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.bubbleDown();
    return root;
  }
  getParentIdx(idx) {
    return Math.floor((idx - 1) / 2);
  }
  getLeftChildIdx(pIdx) {
    return pIdx * 2 + 1;
  }
  getRightChildIdx(pIdx) {
    return pIdx * 2 + 2;
  }
  swap(idx1, idx2) {
    [this.heap[idx1], this.heap[idx2]] = [this.heap[idx2], this.heap[idx1]];
    return this.heap;
  }
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
      (leftIdx <= this.size() - 1 &&
        this.heap[leftIdx] > this.heap[parentIdx]) ||
      (rightIdx <= this.size() - 1 &&
        this.heap[rightIdx] > this.heap[parentIdx])
    ) {
      let targetIdx = leftIdx;
      if (this.heap[rightIdx] > this.heap[targetIdx]) {
        targetIdx = rightIdx;
      }

      this.swap(targetIdx, parentIdx);
      parentIdx = targetIdx;
      rightIdx = this.getRightChildIdx(parentIdx);
      leftIdx = this.getLeftChildIdx(parentIdx);
    }
  }
}

function solution(n, k, enemy) {
  const maxheap = new MaxHeap();
  let cnt = 0;

  for (let ene of enemy) {
    // console.log(n, k, maxheap, cnt)
    maxheap.push(ene);
    if (ene > n) {
      if (k === 0) break;
      const biggerNum = maxheap.pop();
      if (!biggerNum) break;
      n += biggerNum - ene;
      if (n < 0) break;
      k--;
    } else {
      n -= ene;
    }
    cnt++;
  }
  return cnt;
}

/*
적의 수가 많은 곳에서 무적권 써야 이득. 그렇다고 무적권을 못 쓰고 끝내면 안 됨.

힌트: 지나온 라운드 중에서 가장 적의 수가 많았던 라운드에 무적권을 사용
-> 정렬, max heap

# 예1
적 [4, 2, 4, 5, 3, 3, 1], n=7, k=3
n=3, k=3 (1) [4]
n=1, k=3 (2) [4,2]
n=1+4-4=1, k=2 (3) [4,2]
n=1+4-5=0, k=1 (4) [5,2]
n=0+5-3=2, k=0 (5) [3,2]

# 예2
적 [3, 3, 3, 3], n=2, k=4
k=3 (1)
...
k=0 (4)

# 예3
적 [5, 2, 2, 2, 2], n=7, k=2
n=2 (1)
n=0 (2)
k=1 (3)
k=0 (4)

k=1 (1)
n=5 (2)
n=3 (3)
n=1 (4)
k=0 (5)
*/
