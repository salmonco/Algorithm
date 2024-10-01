const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));
const [N, K] = input[0];
const MAX = 100_000;

class Node {
  constructor(v) {
    this.v = v;
    this.prev = null;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.init();
  }
  init() {
    this.front = null;
    this.rear = null;
    this.cnt = 0;
  }
  push(v) {
    const newRear = new Node(v);
    if (this.cnt === 0) {
      this.front = newRear;
      this.rear = newRear;
      this.cnt++;
    } else {
      const rear = this.rear;
      rear.next = newRear;
      newRear.prev = rear;
      this.rear = newRear;
      this.cnt++;
    }
  }
  pop() {
    const front = this.front;
    if (this.cnt === 1) {
      this.init();
    } else {
      const newFront = front.next;
      newFront.prev = null;
      front.next = null;
      this.front = newFront;
      this.cnt--;
    }
    return front.v;
  }
}

const isOut = (n) => n < 0 || n > MAX;

const bfs = (s, K) => {
  const queue = new Queue();
  const distances = Array.from({ length: MAX + 1 }, () => 0);
  const cnts = Array.from({ length: MAX + 1 }, () => 0);
  // queue.push([s, 0])
  queue.push(s);
  distances[s] = 1;
  cnts[s] = 1;
  while (queue.cnt > 0) {
    const c = queue.pop();
    for (const n of [c - 1, c + 1, 2 * c]) {
      if (isOut(n)) continue;
      // console.log(c, n, distances[n])
      if (distances[n] === 0) {
        // 처음 찾은 경우
        distances[n] = distances[c] + 1;
        cnts[n] += cnts[c];
        queue.push(n);
        continue;
      }
      if (distances[n] === distances[c] + 1) {
        // 중복해서 찾은 경우
        cnts[n] += cnts[c];
      }
    }
  }
  return { minDist: distances[K] - 1, methodCnt: cnts[K] };
};
const { minDist, methodCnt } = bfs(N, K);
console.log(minDist);
console.log(methodCnt);

/*
10:27~11:36 (69m)

동생 찾고 또 찾을 수 있으므로 visited 배열 없앰

메모리초과
-> 직접 큐 구현 -> 그래도 메모리초과

큐에 배열 넣어서 그런가?
큐에 배열을 직접 넣지 말고, bfs 함수 내에 지역변수 선언해서 참조하기
-> distances 배열을 공유하다보니, 중복 방문 때문에 값이 depth를 유지하지 못하고 막 바뀜

다른사람풀이: 큐에 배열 안 넣고 distances 배열을 공유하되, 동생을 중복해서 찾으면 큐에 넣지 말고 카운트만 증가

distances 배열: 각 노드까지의 최단 거리를 저장하고 공유합니다.
cnts 배열: 각 노드에 도달하는 가능한 경로의 수를 저장합니다.

동생을 중복해서 찾았어도 큐에 넣지 않으므로, cnts 배열로 가능한 경우의 수를 관리했음
윷놀이에서 같은 위치에 도달하면 업고 가는 것처럼.
*/
