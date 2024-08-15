const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));
const [T] = input[0];
const dr = [-1, 1, 0, 0];
const dc = [0, 0, -1, 1];
let R, C;
let map;

const isOut = (r, c) => r < 0 || r >= R || c < 0 || c >= C;

const bfs = (r, c) => {
  const queue = [[r, c]];
  let head = 0;
  map[r][c] = 0;
  while (queue.length > head) {
    const [cr, cc] = queue[head++];
    for (let i = 0; i < dr.length; i++) {
      const [nr, nc] = [cr + dr[i], cc + dc[i]];
      if (isOut(nr, nc) || map[nr][nc] === 0) continue;
      queue.push([nr, nc]);
      map[nr][nc] = 0;
    }
  }
};

const ans = [];
let line = 1;
while (input[line]) {
  const [M, N, K] = input[line++];
  R = N;
  C = M;
  map = Array.from({ length: R }, () => Array.from({ length: C }, () => 0));
  for (let i = 0; i < K; i++) {
    const [c, r] = input[line++];
    map[r][c] = 1;
  }
  let cnt = 0;
  for (let r = 0; r < R; r++) {
    for (let c = 0; c < C; c++) {
      if (map[r][c] === 0) continue;
      bfs(r, c);
      cnt++;
    }
  }
  ans.push(cnt);
}
console.log(ans.join("\n"));

/*
어떤 배추에 배추흰지렁이가 한 마리라도 살고 있으면 이 지렁이는 인접한 다른 배추로 이동할 수 있어, 그 배추들 역시 해충으로부터 보호받을 수 있다.
한 배추의 상하좌우 네 방향에 다른 배추가 위치한 경우에 서로 인접해있는 것이다.
서로 인접해있는 배추들이 몇 군데에 퍼져있는지 조사하면 총 몇 마리의 지렁이가 필요한지 알 수 있다.
은 배추가 심어져 있지 않은 땅이고, 1은 배추가 심어져 있는 땅을 나타낸다.

9:17~9:32 (15m)
*/
