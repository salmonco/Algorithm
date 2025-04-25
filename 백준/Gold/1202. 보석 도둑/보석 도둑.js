const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
const [N, K] = input[0].split(' ').map(Number)
const vosuc = input.slice(1, 1+N).map((v) => v.split(' ').map(Number))
const gabang = input.slice(1+N, 1+N+K).map(Number)
// console.log(vosuc, gabang)

class MaxHeap {
    constructor() {
        this.arr = []
    }
    push(v) {
        this.arr.push(v)
        this.bubbleUp()
    }
    pop() {
        const root = this.arr[0]
        const pop = this.arr.pop()
        if (this.arr.length > 0) {
            this.arr[0] = pop
            this.sinkDown()
        }
        return root
    }
    bubbleUp() {
        let idx = this.arr.length-1
        const end = this.arr[idx]
        while (idx > 0) {
            let parentIdx = Math.floor((idx-1)/2)
            if (this.arr[parentIdx] >= this.arr[idx]) {
                break
            }
            this.arr[idx] = this.arr[parentIdx] 
            this.arr[parentIdx] = end
            idx = parentIdx
        }
    }
    sinkDown() {
        let idx = 0
        const root = this.arr[idx]
        const len = this.arr.length
        while (true) {
            let leftChildIdx = idx*2+1
            let rightChildIdx = idx*2+2
            let swapIdx = null
            if (leftChildIdx < len) {
                const leftChild = this.arr[leftChildIdx]
                if (leftChild > root) {
                    swapIdx = leftChildIdx
                }
            }
            if (rightChildIdx < len) {
                const rightChild = this.arr[rightChildIdx]
                if ((swapIdx === null && rightChild > root)
                   || (swapIdx !== null && rightChild > this.arr[swapIdx])) {
                    swapIdx = rightChildIdx
                }
            }
            if (swapIdx === null) break
            this.arr[idx] =  this.arr[swapIdx]
            this.arr[swapIdx] = root
            idx = swapIdx
        }
    }
}

vosuc.sort((a, b) => a[0] - b[0])
gabang.sort((a, b) => a - b)

const candidates = new MaxHeap()
let sum = 0
let i = 0

for (const g of gabang) {
    // 현재 가방에 담을 수 있는 보석들 추가
    for (; i < N; i++) {
        const v = vosuc[i]
        const [m, p] = v
        if (m > g) break // 중간에 stop 해서 시간 괜찮은 건가.
        candidates.push(p)
    }
    // console.log({i, candidates})
    if (candidates.arr.length > 0) {
        sum += candidates.pop()
    }
}

console.log(sum)

/*
23:07

1초. 10^5

배낭문제. dp같다.
고르거나 말거나. 가방이 여러개라 점화식 어케 세워야 하지...
생각이 안 나서 다른사람풀이보니 우선순위 큐를 씀..

뭔가 처음부터 dp라고 생각하고 풀기보다 접근과정에서 어떤 알고리즘을 써야 할지를 떠올리는 게 맞는 방향성인 거 같은데.
음.. 방향성을 문제 -> 알고리즘으로 갈 수 있는 접근법에 익숙해지는 게 나을 거 같다. 생각이 안 나서 알고리즘 -> 문제로 할까 생각했는데 문제에서 실마리를 찾는 연습을 하는 게 더 나을 거 같다.

가격이 젤 높은 걸 선택하는데, 무게가 담을 수 있는 무게인지 확인해야 함

2 99
1 65
5 23

2, 10

브루트포스로 하면 10^10 만큼 걸릴 거 같다. 그럼 시간초과 안 하게 하려면 트리구조 써야 할 거 같다.
젤 비싼 보석부터 돌면서 들어갈 수 있는 가방 찾기.
보석은 가격을 기준으로 내림차순, 가방은 오름차순 배열?
찾을 때 이분탐색 써야 할 거 같은데.
근데 찾은 건 삭제해줘야 하는데, 이때 또 n 만큼 걸림. 그래서 자료구조를 배열 말고 트리구조인 힙으로 가야 할 듯?
-> 근데 가방에 민힙 하니 중간 거를 삭제하는 데 또 이분탐색 해줘야 할 거 같아서, 이러면 시간초과 날 듯

다른사람풀이 보니,
for문으로 가벼운 가방부터 시작하여 현재 가방에 담을 수 있는 무게 이하의 보석들을 MaxHeap에 추가한다.
현재 가방에 담길 수 있는 최대 무게의 보석까지 담기면 heap.pop()으로 Maxheap에 있는 보석중에 가장 가치가 있는 보석을 가져와서 answer에 더해준다.

-> 실패. 왜지?
sinkDown에서 while 문 조건 잘못 설정했음. idx > 0 가 아니라 true여야 했음.
*/