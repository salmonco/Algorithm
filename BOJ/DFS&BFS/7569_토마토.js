const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));
const [M, N, H] = input[0];
const map = [];
const dr = [-1, 0, 1, 0, 0, 0];
const dc = [0, 1, 0, -1, 0, 0];
const dh = [0, 0, 0, 0, -1, 1];
let h = 0;
let line = 1;
while (h < H) {
  const box = [];
  for (let i = 0; i < N; i++) {
    const arr = input[i + line];
    box[i] = arr;
  }
  map.push(box);
  line += N;
  h++;
}
// console.log(map)
const getIkPos = () => {
  const pos = [];
  for (let i = 0; i < H; i++) {
    for (let j = 0; j < N; j++) {
      for (let k = 0; k < M; k++) {
        if (map[i][j][k] === 1) pos.push([i, j, k, 0]);
      }
    }
  }
  return pos;
};

const isAllIk = () => {
  for (let i = 0; i < H; i++) {
    for (let j = 0; j < N; j++) {
      for (let k = 0; k < M; k++) {
        if (map[i][j][k] === 0) return false;
      }
    }
  }
  return true;
};

const isOut = (h, r, c) =>
  h < 0 || h >= H || r < 0 || r >= N || c < 0 || c >= M;

const bfs = () => {
  const queue = getIkPos();
  let head = 0;
  let maxCnt = 0;
  while (queue.length > head) {
    const [ch, cr, cc, cnt] = queue[head++];
    maxCnt = Math.max(maxCnt, cnt);
    for (let i = 0; i < dr.length; i++) {
      const [nh, nr, nc] = [ch + dh[i], cr + dr[i], cc + dc[i]];
      if (isOut(nh, nr, nc) || map[nh][nr][nc] !== 0) continue;
      map[nh][nr][nc] = 1;
      queue.push([nh, nr, nc, cnt + 1]);
    }
  }
  return isAllIk() ? maxCnt : -1;
};

const cnt = bfs();
console.log(cnt);

/*
보관 후 하루가 지나면, 익은 토마토들의 인접한 곳에 있는 익지 않은 토마토들은 익은 토마토의 영향을 받아 익게 된다.
위, 아래, 왼쪽, 오른쪽, 앞, 뒤
정수 1은 익은 토마토, 정수 0 은 익지 않은 토마토, 정수 -1은 토마토가 들어있지 않은 칸을 나타낸다.
며칠이 지나면 토마토들이 모두 익는지, 그 최소 일수를 구하는 프로그램을 작성하라.
저장될 때부터 모든 토마토가 익어있는 상태이면 0을 출력해야 하고, 토마토가 모두 익지는 못하는 상황이면 -1을 출력

[
  [ [ 1, 1, 1, 1 ]
   ,[ 1, 1, 1, 1 ]
   , [ 1, 1, 1, 1 ] ],
  [ [ 1, 1, 1, 1 ]
   , [ -1, -1, -1, -1 ]
   , [ 1, 1, 1, -1 ] ]
]
0,1,1
h,r,c
1,1,1
기본 dr, dc에 h 추가고려

다 익었는지 확인하는 함수
하루 동안 익게 하는 함수
익은 토마토 위치 찾아내는 함수

익은 토마토 위치 각각에서 하루 동안 익게 하고, 다 익었는지 확인 반복
반복한 카운트 구하기

-> 메모리초과
-> 익은 위치를 한꺼번에 큐에 담고 bfs 돌리기. maxCnt 업데이트

bfs
12:35~1:34 (1h)
*/
