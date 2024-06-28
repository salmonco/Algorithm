const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));
const [M, N] = input[0];
const map = input.slice(1);
const dist = Array.from({ length: N }, () =>
  Array.from({ length: M }, () => 0)
);
// console.log(map)
const dr = [0, -1, 1, 0];
const dc = [-1, 0, 0, 1];

const isOut = (r, c) => {
  return r < 0 || r >= N || c < 0 || c >= M;
};

const queue = [];

for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (map[i][j] === 1) {
      queue.push([i, j]);
    }
    if (map[i][j] === 0) {
      dist[i][j] = -1;
    }
  }
}

let head = 0;
while (queue.length > head) {
  const [r, c] = queue[head++];
  for (let i = 0; i < dr.length; i++) {
    const [nr, nc] = [r + dr[i], c + dc[i]];
    if (isOut(nr, nc)) continue;
    if (dist[nr][nc] !== -1) continue;
    dist[nr][nc] = dist[r][c] + 1;
    queue.push([nr, nc]);
  }
}

let answer = 0;
for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (dist[i][j] === -1) {
      console.log(-1);
      return;
    }
    answer = Math.max(answer, dist[i][j]);
  }
}

console.log(answer);

/*
매번 탐색 -> 시간초과 -> 한 번의 bfs
queue shift -> 시간초과 -> head++
*/
