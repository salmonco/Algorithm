const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));
const [N, K] = input[0];

class Node {
  constructor(v) {
    this.value = v;
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
  size() {
    return this.cnt;
  }
  push(v) {
    const newRear = new Node(v);
    if (this.size() === 0) {
      this.front = newRear;
      this.rear = newRear;
    } else {
      const rear = this.rear;
      rear.next = newRear;
      newRear.prev = rear;
      this.rear = newRear;
    }
    this.cnt++;
  }
  pop() {
    if (this.size() === 0) return -1;
    const front = this.front;
    if (this.size() === 1) {
      this.init();
      return front.value;
    }
    const newFront = front.next;
    newFront.prev = null;
    front.next = null;
    this.front = newFront;
    this.cnt--;
    return front.value;
  }
}

const queue = new Queue();
for (let i = 1; i <= N; i++) {
  queue.push(i);
}
const ans = [];
while (ans.length < N) {
  for (let i = 0; i < K - 1; i++) {
    const pop = queue.pop();
    queue.push(pop);
  }
  ans.push(queue.pop());
}
console.log("<" + ans.join(", ") + ">");

/*
1 2 3 4 5 6 7 []
4 5 6 7 1 2 [3]
7 1 2 4 5 [3 6]
4 5 7 1 [3 6 2]
1 4 5 [3 6 2 7]
1 4 [3 6 2 7 5]
4 [3 6 2 7 5 1]
[3 6 2 7 5 1 4]

Queue
*/
