const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const [W, H] = input[0].split(" ").map(Number);
const dr = [-1, 0, 1, 0];
const dc = [0, 1, 0, -1];
const map = [];

for (let i = 0; i < H; i++) {
  const arr = input[i + 1].split("").map(Number);
  map[i] = arr;
}

class Node {
  constructor(r, c, cnt) {
    this.r = r;
    this.c = c;
    this.cnt = cnt;
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
  push(r, c, cnt) {
    const node = new Node(r, c, cnt);
    if (!this.rear) {
      this.rear = node;
      this.front = node;
    } else {
      const rear = this.rear;
      rear.next = node;
      node.prev = rear;
      this.rear = node;
    }
    this.cnt++;
  }
  pop() {
    if (this.size() === 0) return -1;
    const rear = this.rear;
    if (this.size() === 1) this.init();
    else {
      const newRear = rear.prev;
      newRear.next = null;
      this.rear = newRear;
      this.cnt--;
    }
    return [rear.r, rear.c, rear.cnt];
  }
  unshift(r, c, cnt) {
    const node = new Node(r, c, cnt);
    if (!this.front) {
      this.rear = node;
      this.front = node;
    } else {
      const front = this.front;
      node.next = front;
      front.prev = node;
      this.front = node;
    }
    this.cnt++;
  }
  shift() {
    if (this.size() === 0) return -1;
    const front = this.front;
    if (this.size() === 1) this.init();
    else {
      const newFront = front.next;
      newFront.prev = null;
      this.front = newFront;
      this.cnt--;
    }
    return [front.r, front.c, front.cnt];
  }
  size() {
    return this.cnt;
  }
}

const isOut = (r, c) => r < 0 || r >= H || c < 0 || c >= W;

const bfs = (r, c) => {
  const visited = Array.from({ length: H }, () =>
    Array.from({ length: W }, () => false)
  );
  const deque = new Deque();
  deque.push(r, c, 0);
  visited[r][c] = true;
  while (deque.size()) {
    const [cr, cc, cnt] = deque.shift();
    // console.log(cr, cc, '방문', cnt)
    if (cr === H - 1 && cc === W - 1) return cnt;
    // visited[cr][cc] = true
    for (let i = 0; i < dr.length; i++) {
      const [nr, nc] = [cr + dr[i], cc + dc[i]];
      if (isOut(nr, nc) || visited[nr][nc]) continue;
      visited[nr][nc] = true;
      // console.log(cr, cc, '---', nr, nc, '후보', map[nr][nc])
      if (map[nr][nc] === 1) {
        // 벽 뚫기
        map[nr][nc] = 0;
        deque.push(nr, nc, cnt + 1);
        // console.log(deque, deque.size())
      } else {
        deque.unshift(nr, nc, cnt); // 빈 방을 먼저 방문하도록
      }
    }
  }
  return -1;
};

const cnt = bfs(0, 0);
console.log(cnt);

/*
현재 (1, 1)에 있는 알고스팟 운영진이 (N, M)으로 이동하려면 벽을 최소 몇 개 부수어야 하는지 구하는 프로그램을 작성하시오.
0은 빈 방을 의미하고, 1은 벽을 의미한다.
(1, 1)과 (N, M)은 항상 뚫려있다.

(1 ≤ N, M ≤ 100)

최단경로
뚫는 걸 최소로 하려면, 어딜 뚫어야 할까? -> 그리디로 하기 어렵다.
-> bfs. 가능한 경우의 수 다 해보기
-> 메모리초과 -> 빈 방으로 이동하는 경우를 우선 처리. deque로 앞에다 넣기
-> queue에 넣을 때 visited 체크하기. 중복 노드 탐색 방지
*/
