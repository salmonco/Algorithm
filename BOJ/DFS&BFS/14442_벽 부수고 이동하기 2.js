const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const [N, M, K] = input[0].split(" ").map(Number);
const dr = [-1, 1, 0, 0];
const dc = [0, 0, -1, 1];
const map = Array.from({ length: N + 1 }, () =>
  Array.from({ length: M + 1 }, () => 0)
);
for (let i = 0; i < N; i++) {
  const arr = input[i + 1].split("").map(Number);
  for (let j = 0; j < arr.length; j++) {
    const c = arr[j];
    map[i + 1][j + 1] = c;
  }
}
// console.log(map)

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
    } else {
      const rear = this.rear;
      newRear.prev = rear;
      rear.next = newRear;
    }
    this.rear = newRear;
    this.cnt++;
  }
  pop() {
    if (this.cnt === 0) return -1;
    const front = this.front;
    if (this.cnt === 1) {
      this.init();
    } else {
      const newFront = front.next;
      newFront.prev = null;
      this.front = newFront;
      this.cnt--;
    }
    return front.v;
  }
}

const isOut = (r, c) => r <= 0 || r > N || c <= 0 || c > M;

const bfs = (r, c) => {
  // const queue = [[r, c, 1, 0]]
  const queue = new Queue();
  queue.push([r, c, 1, 0]);
  const visited = Array.from({ length: N + 1 }, () =>
    Array.from({ length: M + 1 }, () =>
      Array.from({ length: K + 1 }, () => false)
    )
  );
  // let head = 0
  visited[r][c][0] = true;
  // while (queue.length > head) {
  while (queue.cnt > 0) {
    // const [cr, cc, cnt, breakCnt] = queue[head++]
    const [cr, cc, cnt, breakCnt] = queue.pop();
    // console.log(cr, cc, cnt, breakCnt)
    if (cr === N && cc === M) return cnt;

    for (let i = 0; i < dr.length; i++) {
      const [nr, nc] = [cr + dr[i], cc + dc[i]];
      if (isOut(nr, nc)) continue;
      if (map[cr][cc] === 1) {
        if (breakCnt < K && !visited[nr][nc][breakCnt + 1]) {
          queue.push([nr, nc, cnt + 1, breakCnt + 1]);
          visited[nr][nc][breakCnt + 1] = true;
        }
        continue;
      }
      if (visited[nr][nc][breakCnt]) continue;
      queue.push([nr, nc, cnt + 1, breakCnt]);
      visited[nr][nc][breakCnt] = true;
    }
  }
  return -1;
};

const cnt = bfs(1, 1);
console.log(cnt);

/*
bfs + 3차원 visited 배열(벽 부순 횟수마다 visited 다름) + 큐 구현(연결리스트)

N×M의 행렬로 표현되는 맵이 있다. 맵에서 0은 이동할 수 있는 곳을 나타내고, 1은 이동할 수 없는 벽이 있는 곳을 나타낸다.
당신은 (1, 1)에서 (N, M)의 위치까지 이동하려 하는데, 이때 최단 경로로 이동하려 한다.
최단경로는 맵에서 가장 적은 개수의 칸을 지나는 경로를 말하는데, 이때 시작하는 칸과 끝나는 칸도 포함해서 센다.
만약에 이동하는 도중에 벽을 부수고 이동하는 것이 좀 더 경로가 짧아진다면, 벽을 K개 까지 부수고 이동하여도 된다.
한 칸에서 이동할 수 있는 칸은 상하좌우로 인접한 칸이다.
맵이 주어졌을 때, 최단 경로를 구해 내는 프로그램을 작성하시오.
N(1 ≤ N ≤ 1,000), M(1 ≤ M ≤ 1,000), K(1 ≤ K ≤ 10)
(1, 1)과 (N, M)은 항상 0이라고 가정하자.

-> 실패 -> 어떤 좌표를 벽을 1번 부수고 방문했을 때와 벽을 2번 부수고 방문했을 때는 서로 다른 상태입니다. 그러나 현재 코드에서는 단순히 방문 여부만 기록하고 있어, 벽을 부순 횟수가 다른 경우에도 같은 좌표를 다시 방문하지 못하게 됩니다.
-> dfs로 하면 visited[nr][nc] = true; dfs(); visited[nr][nc] = false로 하면 될 것 같은데. 최단경로라서 bfs가 더 빠를 것 같은데, bfs로는 어떻게 하나?
-> visited 배열을 3차원 배열로 만들어, 각 좌표에서 벽을 몇 번 부수고 방문했는지 기록해야 합니다. 즉, visited[r][c][k]는 (r, c) 좌표에 벽을 k번 부수고 방문했는지를 기록합니다.
-> 17% 메모리 초과
-> 큐를 배열(head 변수 사용) 말고 연결리스트로 구현

11:04~11:57 (53m)
*/
