const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));
const [T] = input[0];

class Node {
  constructor(v) {
    this.v = v;
    this.prev = null;
    this.next = null;
  }
}

class Deque {
  constructor() {
    this.init();
  }
  init() {
    this.front = null;
    this.rear = null;
    this.cnt = 0;
  }
  unshift(v) {
    const newFront = new Node(v);
    const front = this.front;
    if (front) {
      front.prev = newFront;
      newFront.next = front;
      this.front = newFront;
    } else {
      this.front = newFront;
      this.rear = newFront;
    }
    this.cnt++;
  }
  shift() {
    if (this.cnt === 0) return -1;
    const front = this.front;
    if (this.cnt === 1) this.init();
    else {
      const newFront = front.next;
      newFront.prev = null;
      this.front = newFront;
      this.cnt--;
    }
    return front.v;
  }
  push(v) {
    const newRear = new Node(v);
    const rear = this.rear;
    if (rear) {
      rear.next = newRear;
      newRear.prev = rear;
      this.rear = newRear;
    } else {
      this.front = newRear;
      this.rear = newRear;
    }
    this.cnt++;
  }
  pop() {
    if (this.cnt === 0) return -1;
    const rear = this.rear;
    if (this.cnt === 1) this.init();
    else {
      const newRear = rear.prev;
      newRear.next = null;
      this.rear = newRear;
      this.cnt--;
    }
    return rear.v;
  }
}

const ans = [];
let line = 1;
for (let i = 0; i < T; i++) {
  const [N, M] = input[line++];
  const pArr = input[line++];
  const deque = new Deque();
  pArr.forEach((v, i) => deque.push([i, v]));
  const sortedP = pArr.sort((a, b) => b - a);
  let head = 0;
  let maxP = sortedP[head];
  let cnt = 0;
  while (true) {
    // console.log(deque.front.v, maxP)
    if (deque.front.v[1] < maxP) {
      deque.push(deque.shift());
    } else {
      const [i, v] = deque.shift();
      cnt++;
      if (i === M) {
        ans.push(cnt);
        break;
      }
      maxP = sortedP[++head];
    }
  }
}
console.log(ans.join("\n"));

/*
현재 Queue의 가장 앞에 있는 문서의 ‘중요도’를 확인한다.
나머지 문서들 중 현재 문서보다 중요도가 높은 문서가 하나라도 있다면, 이 문서를 인쇄하지 않고 Queue의 가장 뒤에 재배치 한다. 그렇지 않다면 바로 인쇄를 한다.
예를 들어 Queue에 4개의 문서(A B C D)가 있고, 중요도가 2 1 4 3 라면 C를 인쇄하고, 다음으로 D를 인쇄하고 A, B를 인쇄하게 된다.
여러분이 할 일은, 현재 Queue에 있는 문서의 수와 중요도가 주어졌을 때, 어떤 한 문서가 몇 번째로 인쇄되는지 알아내는 것이다. 예를 들어 위의 예에서 C문서는 1번째로, A문서는 3번째로 인쇄되게 된다.

그냥 sort하면 젤 앞 거를 뒤로 보내지 못함
-> deque
다른사람풀이: deque말고 그냥 queue로 shift해서 풀어도 됨
*/
