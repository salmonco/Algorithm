const readline = require('readline')
const fs = require('fs')
const rl = readline.createInterface({
  input: process.platform === 'linux' ? process.stdin : fs.createReadStream('test/test.txt'),
  output: process.stdout,
  terminal: false,
})

class Heap {
    constructor(compareFn) {
        this.values = [];
        this.compareFn = compareFn
    }
    push(v) {
        this.values.push(v);
        this.bubbleUp();
    }
    bubbleUp() {
        let idx = this.values.length - 1;
        const rear = this.values[idx];
        while (idx > 0) {
            const parentIdx = Math.floor((idx - 1) / 2);
            const parent = this.values[parentIdx];
            if (this.compareFn(parent, rear) || parent === rear) break;
            this.values[idx] = parent;
            this.values[parentIdx] = rear;
            idx = parentIdx;
        }
    }
    pop() {
        if (this.values.length === 0) return null;
        const root = this.values[0];
        const rear = this.values.pop();
        if (this.values.length > 0) {
            this.values[0] = rear;
            this.sinkDown();
        }
        return root;
    }
    sinkDown() {
        let idx = 0;
        const root = this.values[idx];
        const len = this.values.length;
        while (true) {
            let leftChildIdx = idx * 2 + 1;
            let rightChildIdx = idx * 2 + 2;
            let rightChild, leftChild;
            let temp = null;
            if (leftChildIdx < len) {
                leftChild = this.values[leftChildIdx];
                if (this.compareFn(leftChild, root)) {
                    temp = leftChildIdx;
                }
            }
            if (rightChildIdx < len) {
                rightChild = this.values[rightChildIdx];
                if ((temp !== null && this.compareFn(rightChild, leftChild))
                    || (temp === null && this.compareFn(rightChild, root))) {
                    temp = rightChildIdx;
                }
            }
            if (temp === null) break;
            this.values[idx] = this.values[temp];
            this.values[temp] = root;
            idx = temp;
        }
    }
    isEmpty() {
        return this.values.length === 0
    }
    reset() {
        this.values = []
    }
    top() {
        return this.values[0]
    }
}

class DoubleEndedPQueue {
  constructor() {
    this.minHeap = new Heap((a, b) => a < b)
    this.maxHeap = new Heap((a, b) => a > b)
    this.map = new Map()
  }
  push(v) {
    this.maxHeap.push(v)
    this.minHeap.push(v)
    const previous = this.map.get(v)
    if (previous) {
        this.map.set(v, previous + 1)
    } else {
        this.map.set(v, 1)
    }
  }
  popMax() {
    const popped = this.maxHeap.pop()
      if (popped === null) return
      const previous = this.map.get(popped)
      this.map.set(popped, previous - 1)
      this.clear()
  }
  popMin() {
    const popped = this.minHeap.pop()
      if (popped === null) return
      const previous = this.map.get(popped)
      this.map.set(popped, previous - 1)
      this.clear()
  }
  topMax() {
    return this.maxHeap.top()
  }
  topMin() {
    return this.minHeap.top()
  }
  clear() {
    while (!this.minHeap.isEmpty() && !(this.map.get(this.minHeap.top()) > 0)) {
      this.minHeap.pop()
    }
    while (!this.maxHeap.isEmpty() && !(this.map.get(this.maxHeap.top()) > 0)) {
      this.maxHeap.pop()
    }
  }
  reset() {
    this.maxHeap.reset()
    this.minHeap.reset()
    this.map.clear()
  }
}

// const input = [];
// rl.on('line', (line) => {
//     input.push(line.trim());
// }).on('close', () => {
//     const [T] = input[0].split(' ').map(Number);
//     let tc = 0;
//     let line = 1;
//     const ans = [];
//     const depq = new DoubleEndedPQueue()

//     while (tc < T) {
//         const [K] = input[line++].split(' ').map(Number);
//         for (let i = 0; i < K; i++) {
//             // console.log(depq)
//             const [cmd, num] = input[line++].split(' ');
//             const n = Number(num);
//             if (cmd === 'I') {
//                 depq.push(n)
//                 continue
//             }
//             if (cmd === 'D') {
//                 if (n === 1) {
//                     depq.popMax()
//                 } else if (n === -1) {
//                     depq.popMin()
//                 }
//             }
//         }
//         depq.clear()
//         if (depq.maxHeap.isEmpty() || depq.minHeap.isEmpty()) {
//             ans.push('EMPTY');
//         } else {
//             ans.push([depq.topMax(), depq.topMin()].join(' '))
//         }
//         tc++;
//         // console.log('-----------')
//     }
//     console.log(ans.join('\n'));
// });
const answer = []
const depq = new DoubleEndedPQueue()

let index = 0
let endLine = 0
rl.on('line', (line) => {
  if (index === 0) {
    index++
    return
  }
  if (index > endLine) {
    endLine = +line + index++
    depq.reset()
    return
  }
  let [cmd, value] = line.split(' ')
  value = Number(value)
  if (cmd === 'I') {
    depq.push(value)
  } else {
    if (value === 1) {
      depq.popMax()
    } else {
      depq.popMin()
    }
  }
  if (index === endLine) {
    depq.clear()
    depq.maxHeap.isEmpty() || depq.minHeap.isEmpty()
      ? answer.push('EMPTY')
      : answer.push([depq.topMax(), depq.topMin()].join(' '))
  }
  index++
})

rl.on('close', () => {
  console.log(answer.join('\n'))
})

/*
21:45

6초.
- 삽입
- 삭제
    - 우선순위 가장 높은 거 삭제
    - 우선순위 가장 낮은 거 삭제

우선순위 큐를 구현해야 할 거 같다. 만약 그냥 배열을 썼을 때 시간 괜찮나?
연산의 개수가 10^6이니깐.. 6초면 괜찮지 않나?

-> 메모리 초과
우선순위 큐를 걍 구현해야겠다..
-> 메모리 초과. 왜지.

fs 대신 readline 쓰래. -> 그래도 안 됨.

다른사람풀이 보니 우선순위 큐 2개 씀. max heap, min heap
왜 그럴까. 최대값, 최솟값 삭제를 각각 logN만에 할 수 있어서?
난 그냥 minHeap 하나 만들어서 최대값 삭제는 젤 뒤에 거 삭제하면 될 거라 생각했는데.
젤 뒤에 게 최대값이란 걸 보장할 수 없나 보네. 그래서 최대값 찾으려면 N만큼 들어서 비효율적이라 생각했나보네.
그렇군. 젤 뒤에 게 최대값이 아닐 수 있는 거군. 인터넷 뒤져보니 바로 반례를 찾을 수 있네.

삭제하려고 보니깐 이미 deleted에 있어서 삭제된거야. 그럼 그거 삭제하고 다음 거 삭제 시도.

-> 메모리 초과. 왜지.

다른사람풀이보니 compare 함수를 객체 생성 시에 생성자함수를 통해 외부에서 주입함으로써
코드 중복을 줄였다고 한다.
https://velog.io/@seungrok-yoon/%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98-%EC%B5%9C%EB%8C%80%ED%9E%99%EC%B5%9C%EC%86%8C%ED%9E%99-%EC%9D%B4%EC%A4%91-%EC%9A%B0%EC%84%A0%EC%88%9C%EC%9C%84-%ED%81%90-%EA%B5%AC%ED%98%84
-> 그래도 메모리 초과.
이 분도 큐 두 개랑 맵 하나 쓰셨는데. 근데 난 맵이 아니라 그냥 객체 썼는데. 맵으로 바꿀까.
-> 그래도 메모리 초과.
이쯤되면 내 풀이를 붙잡기보다 다른사람코드를 이해하는 게 나을 듯.
난 큐에 넣은 요소로 노드 클래스를 만들어서, 노드의 프로퍼티로 value, id를 주었는데
노드 클래스 때문에 메모리 초과일 가능성 있음. 따라서 다른사람처럼
DoubleEndedPQueue 클래스 만들어서 id 관리해주기
-> 실패. 왜지...


*/