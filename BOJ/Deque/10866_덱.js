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

class Deque {
  constructor() {
    this.init();
  }

  init() {
    this.count = 0;
    this.front = null;
    this.rear = null;
  }

  unshift(v) {
    const node = new Node(v);
    if (this.front) {
      this.front.prev = node;
      node.next = this.front;
      this.front = node;
    } else {
      this.front = node;
      this.rear = node;
    }
    this.count++;
  }

  shift() {
    if (this.size() === 0) return -1;
    const v = this.front.value;
    if (this.size() === 1) this.init();
    else {
      this.front = this.front.next;
      this.front.prev = null;
      this.count--;
    }
    return v;
  }

  push(v) {
    const node = new Node(v);
    if (this.rear) {
      this.rear.next = node;
      node.prev = this.rear;
      this.rear = node;
    } else {
      this.front = node;
      this.rear = node;
    }
    this.count++;
  }

  pop() {
    if (this.size() === 0) return -1;
    const v = this.rear.value;
    if (this.size() === 1) this.init();
    else {
      this.rear = this.rear.prev;
      this.rear.next = null;
      this.count--;
    }
    return v;
  }

  size() {
    return this.count;
  }

  empty() {
    return this.size() === 0 ? 1 : 0;
  }

  getFront() {
    return this.size() === 0 ? -1 : this.front.value;
  }

  getBack() {
    return this.size() === 0 ? -1 : this.rear.value;
  }
}

const deque = new Deque();
const ans = [];
for (let i = 0; i < N; i++) {
  const [command, v] = input[i + 1];
  switch (command) {
    case "push_front": // 정수 X를 덱의 앞에 넣는다.
      deque.unshift(v);
      break;
    case "push_back": // 정수 X를 덱의 뒤에 넣는다.
      deque.push(v);
      break;
    case "pop_front": // 덱의 가장 앞에 있는 수를 빼고, 그 수를 출력한다. 만약, 덱에 들어있는 정수가 없는 경우에는 -1을 출력한다.
      ans.push(deque.shift());
      break;
    case "pop_back": // 덱의 가장 뒤에 있는 수를 빼고, 그 수를 출력한다. 만약, 덱에 들어있는 정수가 없는 경우에는 -1을 출력한다.
      ans.push(deque.pop());
      break;
    case "size": // 덱에 들어있는 정수의 개수를 출력한다.
      ans.push(deque.size());
      break;
    case "empty": // 덱이 비어있으면 1을, 아니면 0을 출력한다.
      ans.push(deque.empty());
      break;
    case "front": // 덱의 가장 앞에 있는 정수를 출력한다. 만약 덱에 들어있는 정수가 없는 경우에는 -1을 출력한다.
      ans.push(deque.getFront());
      break;
    case "back": // 덱의 가장 뒤에 있는 정수를 출력한다. 만약 덱에 들어있는 정수가 없는 경우에는 -1을 출력한다.
      ans.push(deque.getBack());
      break;
  }
}
console.log(ans.join("\n"));

/*
덱(deque, double-ended queue): 양쪽 끝에서 삽입과 삭제가 모두 가능한 자료구조
*/
