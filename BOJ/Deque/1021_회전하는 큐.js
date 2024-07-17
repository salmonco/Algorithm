const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));
const [N, M] = input[0];
const pos = input[1];

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
    return this.empty() ? -1 : this.front.value;
  }

  getBack() {
    return this.empty() ? -1 : this.rear.value;
  }

  getIdx(v) {
    if (this.empty()) return -1;
    let idx = 0;
    let node = this.front;
    while (node) {
      if (node.value === v) return idx;
      node = node.next;
      idx++;
    }
    return idx;
  }
}

const deque = new Deque();
let cnt = 0;
for (let i = 1; i <= N; i++) {
  deque.push(i);
}
pos.forEach((v) => {
  const idx = deque.getIdx(v);
  const size = deque.size();
  const isRight =
    size % 2 === 0 ? idx >= Math.floor(size / 2) : idx > Math.floor(size / 2);
  while (true) {
    // console.log(deque)
    if (v === deque.getFront()) {
      deque.shift();
      break;
    }
    if (isRight) {
      // 오른쪽으로 이동. pop -> unshift
      const val = deque.pop();
      deque.unshift(val);
    } else {
      // 왼쪽으로 이동. shift -> push
      const val = deque.shift();
      deque.push(val);
    }
    cnt++;
  }
  // console.log('--------------', v)
});
console.log(cnt);

/*
지민이는 N개의 원소를 포함하고 있는 양방향 순환 큐를 가지고 있다. 지민이는 이 큐에서 몇 개의 원소를 뽑아내려고 한다.
지민이는 이 큐에서 다음과 같은 3가지 연산을 수행할 수 있다.
1. 첫 번째 원소를 뽑아낸다. 이 연산을 수행하면, 원래 큐의 원소가 a1, ..., ak이었던 것이 a2, ..., ak와 같이 된다.
2. 왼쪽으로 한 칸 이동시킨다. 이 연산을 수행하면, a1, ..., ak가 a2, ..., ak, a1이 된다.
3. 오른쪽으로 한 칸 이동시킨다. 이 연산을 수행하면, a1, ..., ak가 ak, a1, ..., ak-1이 된다.

지민이가 뽑아내려고 하는 원소의 위치가 주어진다. (이 위치는 가장 처음 큐에서의 위치이다.)
이때, 그 원소를 주어진 순서대로 뽑아내는데 드는 2번, 3번 연산의 최솟값을 출력하는 프로그램을 작성하시오.

# 예제 2
1 2 3 4 5 6 7 8 9 10

2 3 4 5 6 7 8 9 10 1
-> 왼쪽으로 1 이동
-> 2 뽑기

3 4 5 6 7 8 9 10 1

9 10 1 3 4 5 6 7 8
-> 오른쪽으로 3 이동
-> 9 뽑기

10 1 3 4 5 6 7 8

5 6 7 8 10 1 3 4
-> 오른쪽으로 4 이동
-> 5 뽑기

6 7 8 10 1 3 4

뽑으려고 하는 숫자의 인덱스가 Math.floor(n/2)보다 크거나 같으면 오른쪽으로 이동, 아니면 왼쪽으로 이동
-> 실패
-> n이 홀수인 경우, 뽑으려고 하는 숫자의 인덱스가 Math.floor(n/2)와 같으면 왼쪽으로 이동

# 예제 4
1 2 3 4 5 6 7 8 9 10
-> 1 뽑기

2 3 4 5 6 7 8 9 10

6 7 8 9 10 2 3 4 5
-> 오른쪽으로 5 이동 (4 >= 4)
-> 6 뽑기

7 8 9 10 2 3 4 5

3 4 5 7 8 9 10 2
-> 오른쪽으로 3 이동 (5 >= 4)
-> 3 뽑기

4 5 7 8 9 10 2

2 4 5 7 8 9 10
-> 오른쪽으로 1 이동 (6 >= 3)
-> 2 뽑기

7 8 9 10 2 4 5
-> 오른쪽으로 4 이동 (3 >= 3)
-> 7 뽑기

8 9 10 2 4 5

9 10 2 4 5 8
-> 왼쪽으로 1 이동 (1 < 3)
-> 9 뽑기

10 2 4 5 8

8 10 2 4 5
-> 오른쪽으로 1 이동
-> 8 뽑기

10 2 4 5

4 5 10 2
-> 오른쪽으로 2 이동 (2 >= 2)
-> 4 뽑기

5 10 2

1 >= 1
*/
