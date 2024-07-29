const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" "));
const N = +input[0][0];

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
  push(v) {
    const newRear = new Node(v);
    if (this.cnt === 0) {
      this.front = newRear;
      this.rear = newRear;
    } else {
      const rear = this.rear;
      newRear.prev = rear;
      rear.next = newRear;
      this.rear = newRear;
    }
    this.cnt++;
  }
  pop() {
    if (this.cnt === 0) {
      return -1;
    }
    const front = this.front;
    if (this.cnt === 1) {
      this.init();
      return front.value;
    }
    const newFront = this.front.next;
    newFront.prev = null;
    this.front = newFront;
    this.cnt--;
    return front.value;
  }
}

const queue = new Queue();
const ans = [];
for (let i = 0; i < N; i++) {
  const [command, v] = input[i + 1];
  switch (command) {
    case "push":
      queue.push(v);
      break;
    case "pop":
      const pop = queue.pop();
      ans.push(pop);
      break;
    case "size":
      ans.push(queue.cnt);
      break;
    case "empty":
      ans.push(queue.cnt === 0 ? 1 : 0);
      break;
    case "front":
      ans.push(queue.cnt === 0 ? -1 : queue.front.value);
      break;
    case "back":
      ans.push(queue.cnt === 0 ? -1 : queue.rear.value);
      break;
  }
}
console.log(ans.join("\n"));

/*
큐. 연결리스트로 구현
*/
