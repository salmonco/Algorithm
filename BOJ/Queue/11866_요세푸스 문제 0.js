const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));
const [N, K] = input[0];

class Node {
  constructor(v) {
    this.v = v;
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
    } else {
      const rear = this.rear;
      rear.next = newRear;
      newRear.prev = rear;
    }
    this.rear = newRear;
    this.cnt++;
  }
  pop() {
    if (this.cnt === 0) return -1;
    const front = this.front;
    if (this.cnt === 1) {
      this.init();
      return front.v;
    }
    const newFront = front.next;
    newFront.prev = null;
    front.next = null;
    this.front = newFront;
    this.cnt--;
    return front.v;
  }
}

const queue = new Queue();
const ans = [];
for (let i = 1; i <= N; i++) {
  queue.push(i);
}
while (queue.cnt > 0) {
  // console.log(queue)
  for (let i = 0; i < K - 1; i++) {
    queue.push(queue.pop());
  }
  const pop = queue.pop();
  ans.push(pop);
}
console.log(`<${ans.join(", ")}>`);

/*
1번부터 N번까지 N명의 사람이 원을 이루면서 앉아있고, 양의 정수 K(≤ N)가 주어진다.
이제 순서대로 K번째 사람을 제거한다. 한 사람이 제거되면 남은 사람들로 이루어진 원을 따라 이 과정을 계속해 나간다.
원에서 사람들이 제거되는 순서를 (N, K)-요세푸스 순열이라고 한다. 예를 들어 (7, 3)-요세푸스 순열은 <3, 6, 2, 7, 5, 1, 4>이다.
N과 K가 주어지면 (N, K)-요세푸스 순열을 구하는 프로그램을 작성하시오.

1 2 3 4 5 6 7
4 5 6 7 1 2 -> 3
7 1 2 4 5  -> 3 6
4 5 7 1 -> 3 6 2
1 4 5 -> 3 6 2 7
1 4 -> 3 6 2 7 5
4 -> 3 6 2 7 5 1
-> 3 6 2 7 5 1 4

14:54~15:16 (22m)
*/
