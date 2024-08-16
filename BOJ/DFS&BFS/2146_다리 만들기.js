const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));
const [N] = input[0];
const map = [];
const dr = [-1, 1, 0, 0];
const dc = [0, 0, -1, 1];
for (let i = 1; i <= N; i++) {
  const arr = input[i];
  map.push(arr);
}
// console.log(map)
const isOut = (r, c) => r < 0 || r >= N || c < 0 || c >= N;

const setOceanNum = (r, c, num) => {
  const queue = [[r, c]];
  let head = 0;
  visited[r][c] = true;
  while (queue.length > head) {
    const [cr, cc] = queue[head++];
    for (let i = 0; i < dr.length; i++) {
      const [nr, nc] = [cr + dr[i], cc + dc[i]];
      if (isOut(nr, nc) || visited[nr][nc]) continue;
      // console.log(nr, nc, map[nr][nc])
      if (map[nr][nc] >= 2 && map[nr][nc] !== num) return 1;
      if (map[nr][nc] === 0) map[nr][nc] = num;
      if (map[nr][nc] === 1) {
        queue.push([nr, nc]);
        visited[nr][nc] = true;
      }
    }
  }
  return -1;
};

let visited = Array.from({ length: N }, () =>
  Array.from({ length: N }, () => false)
);
let num = 2;
for (let r = 0; r < N; r++) {
  for (let c = 0; c < N; c++) {
    if (visited[r][c] || map[r][c] !== 1) continue;
    const result = setOceanNum(r, c, num);
    if (result === 1) {
      console.log(1);
      return;
    }
    num++;
  }
}
// console.log(map)

const bfs = (r, c, num) => {
  const queue = [[r, c, 1]];
  let head = 0;
  visited[r][c] = true;
  while (queue.length > head) {
    const [cr, cc, depth] = queue[head++];
    for (let i = 0; i < dr.length; i++) {
      const [nr, nc] = [cr + dr[i], cc + dc[i]];
      if (isOut(nr, nc) || visited[nr][nc]) continue;
      // console.log(nr, nc, num, map[nr][nc], depth)
      if (map[nr][nc] >= 2 && map[nr][nc] !== num) {
        return depth + 1;
      }
      if (map[nr][nc] === 0) {
        queue.push([nr, nc, depth + 1]);
        visited[nr][nc] = true;
      }
    }
  }
  return Infinity;
};

let min = Infinity;
visited = Array.from({ length: N }, () =>
  Array.from({ length: N }, () => false)
);
for (let r = 0; r < N; r++) {
  for (let c = 0; c < N; c++) {
    if (visited[r][c] || map[r][c] <= 1) continue;
    const depth = bfs(r, c, map[r][c]);
    min = Math.min(min, depth);
  }
}
console.log(min);

/*
가장 짧은 다리란, 다리가 격자에서 차지하는 칸의 수가 가장 작은 다리를 말한다.
지도가 주어질 때, 가장 짧은 다리 하나를 놓아 두 대륙을 연결하는 방법을 찾으시오.
N(100이하의 자연수)
0은 바다, 1은 육지를 나타낸다.

다른 섬과 구분 -> 1인 섬, 2인 섬,...
섬과 인접한 바다를 구분 -> 2인 바다, 3인 바다,...
바다를 탐색하면서 다른 숫자의 바다를 만나면 depth 업데이트

BFS 두 번
- 다른 섬과 구분
- 최단 다리 찾기

13:05~13:57 (52m)
*/
