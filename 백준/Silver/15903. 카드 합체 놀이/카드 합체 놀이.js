const input = require('fs')
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n').map((v) => v.split(' ').map(Number))
const [N, M] = input[0]
const cards = input[1]

class Node {
    constructor(v) {
        this.v = v
    }
}

class MinHeap {
    constructor() {
        this.values = []
    }
    push(v) {
        const newNode = new Node(v)
        this.values.push(newNode)
        this.bubbleUp()
    }
    bubbleUp() {
        let idx = this.values.length-1
        const rear = this.values[idx]
        while (idx > 0) {
            let parentIdx = Math.floor((idx-1)/2)
            let parent = this.values[parentIdx]
            if (parent.v <= rear.v) break
            this.values[idx] = parent
            this.values[parentIdx] = rear
            idx = parentIdx
        }
    }
    pop() {
        if (this.values.length === 0) return null
        const root = this.values[0]
        const pop = this.values.pop()
        if (this.values.length > 0) {
            this.values[0] = pop
            this.sinkDown()
        }
        return root.v
    }
    sinkDown() {
        let idx = 0
        const root = this.values[idx]
        const len = this.values.length
        while (true) {
            let leftChildIdx = idx*2+1
            let rightChildIdx = idx*2+2
            let leftChild, rightChild
            let swapIdx = null
            if (leftChildIdx < len) {
                leftChild = this.values[leftChildIdx]
                if (leftChild.v < root.v) {
                    swapIdx = leftChildIdx
                }
            }
            if (rightChildIdx < len) {
                rightChild = this.values[rightChildIdx]
                if ((swapIdx === null && rightChild.v < root.v)
                   || (swapIdx !== null && rightChild.v < leftChild.v)) {
                    swapIdx = rightChildIdx
                }
            }
            if (swapIdx === null) break
            this.values[idx] = this.values[swapIdx]
            this.values[swapIdx] = root
            idx = swapIdx
        }
    }
}

const minHeap = new MinHeap()
cards.forEach((v) => {
    minHeap.push(BigInt(v))
})

for (let i = 0; i < M; i++) {
    // console.log(minHeap)
    const first = minHeap.pop()
    const second = minHeap.pop()
    const sum = first+second
    minHeap.push(sum)
    minHeap.push(sum)
}
// console.log(minHeap)
const ans = minHeap.values.reduce((acc, cur) => acc + cur.v, 0n)
console.log(ans.toString())

/*
9:37

2 3 6
5 5 6

1 2 3 4
3 3 3 4
6 6 3 4

가장 작은 두 값을 합쳐야 함

가장 작은 두 값을 어떻게 알까?
카드를 합칠 때마다 매번 정렬해야 하나?
최대 카드개수 1,000고 최대 15,000번 합치니깐
한 번 정렬할 때마다 10^3 걸리고 이걸 15,000번 반복.. 10^7이라 괜찮을듯?
만약 시간초과면 다른 방법이 있나? 정렬을 매번 하지 않아도 되는 방법..?
-> 실패. 왜?
숫자 범위를 신경써야 함. 맨 처음 카드 상태 최대값이 10^6이니 합치다보면 숫자 범위 초과할 수도.
-> BigInt
-> 시간초과

정렬은 불가피해 보임. 그러나 정렬 시 시간복잡도를 줄이는 방법이 있음
n에서 logN으로. 트리 구조를 활용하면 됨. 우선순위 힙.

*/