const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const N = +input[0];
// const queue = Array.from({ length: N }, (_, i) => i+1)
// let head = 0

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
    const node = new Node(v);
    if (this.size() === 0) {
      this.front = node;
    } else {
      const rear = this.rear;
      rear.next = node;
      node.prev = rear;
    }
    this.rear = node;
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
    this.front = newFront;
    this.cnt--;
    return front.value;
  }
  // removeFront() {
  //     this.front = this.front.next
  //     this.front.prev = null
  //     this.cnt--
  // }
  size() {
    return this.cnt;
  }
  getFront() {
    return this.front.value;
  }
}

const queue = new Queue();
for (let i = 1; i <= N; i++) {
  queue.push(i);
}
// let ans
while (queue.size() > 1) {
  // while (true) {
  // head++
  queue.pop();
  // queue.removeFront()
  // if (queue.length-head === 1) {
  //     console.log(queue[head])
  //     break
  // }
  // if (queue.size() === 1) { // 이거 넣었더니 시간초과
  //     // console.log(queue.getFront())
  //     ans = queue.getFront()
  //     break
  // }
  // const front = queue[head++]
  // queue.push(front)
  const pop = queue.pop();
  queue.push(pop);
  // queue.push(queue.getFront())
  // queue.removeFront()
}
console.log(queue.getFront());
// console.log(ans)

/*
1번 카드가 제일 위에, N번 카드가 제일 아래인 상태로 순서대로 카드가 놓여 있다.
이제 다음과 같은 동작을 카드가 한 장 남을 때까지 반복하게 된다.
- 우선, 제일 위에 있는 카드를 바닥에 버린다.
- 그 다음, 제일 위에 있는 카드를 제일 아래에 있는 카드 밑으로 옮긴다.
N이 주어졌을 때, 제일 마지막에 남게 되는 카드를 구하는 프로그램을 작성하시오.

1234
234
342
42
24
4

-> queue 배열, head 변수 사용 -> 99%에서 메모리초과
-> 연결리스트 사용 -> 99%에서 시간초과. Why?
-> while 문 안에 if (queue.size() === 1) 종료조건 넣었더니 시간초과
*/
