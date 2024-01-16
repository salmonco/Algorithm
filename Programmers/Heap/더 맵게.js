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
      (leftIdx <= this.size() - 1 &&
        this.heap[leftIdx] < this.heap[parentIdx]) ||
      (rightIdx <= this.size() - 1 &&
        this.heap[rightIdx] < this.heap[parentIdx])
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

function solution(scoville, K) {
  let cnt = 0;
  const heap = new MinHeap();
  scoville.forEach((value) => heap.push(value));

  while (heap.heap[0] < K) {
    if (heap.size() === 1) return -1;

    const firstMin = heap.pop();
    const secondMin = heap.pop();
    const mixed = firstMin + secondMin * 2;
    heap.push(mixed);
    cnt++;
  }

  return cnt;
}

/*
브루트포스로 하면 while문 안에서 매번 정렬 -> 시간복잡도 n^2
heap 이용하면 -> n * logN
- 힙 구성 : n * logN
- 삽입 : 젤 끝에 넣고, 버블업(logN)
- 삭제 : 루트 삭제 후 젤 끝 걸 루트자리에 넣고, 버블다운(logN)

응용
- 정렬 (일반 정렬보다 더 빠른)
- 우선순위 큐 (minheap, maxheap)
*/
