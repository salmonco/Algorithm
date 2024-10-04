const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const [N, M] = input[0].split(" ").map(Number);
const map = input.slice(1).map((v) => v.split("").map(Number));
const dr = [-1, 1, 0, 0];
const dc = [0, 0, -1, 1];

const isOut = (r, c) => r < 0 || r >= N || c < 0 || c >= M;

const bfs = () => {
  const queue = [];
  const visited = Array.from({ length: N }, () =>
    Array.from({ length: M }, () => false)
  );
  for (let i = 0; i < M; i++) {
    if (map[0][i] === 0) {
      queue.push([0, i]);
      visited[0][i] = true;
    }
  }
  let head = 0;
  while (queue.length > head) {
    const [cr, cc] = queue[head++];
    if (cr === N - 1) return true;
    for (let i = 0; i < dr.length; i++) {
      const [nr, nc] = [cr + dr[i], cc + dc[i]];
      if (isOut(nr, nc) || visited[nr][nc] || map[nr][nc] === 1) continue;
      visited[nr][nc] = true;
      queue.push([nr, nc]);
    }
  }
  return false;
};
const ans = bfs();
console.log(ans === false ? "NO" : "YES");

// const visited = Array.from({ length: N }, () => Array.from({ length: M }, () => false))
// let ans = false
// const dfs = (r, c) => {
//     if (ans === true) return
//     // console.log(r, c)
//     if (r === N-1) {
//         ans = true
//         return
//     }
//     for (let i = 0; i < dr.length; i++) {
//         if (ans === true) return
//         const [nr, nc] = [r+dr[i], c+dc[i]]
//         if (isOut(nr, nc) || visited[nr][nc] || map[nr][nc] === 1) continue
//         // console.log(nr, nc, r, c)
//         visited[nr][nc] = true
//         dfs(nr, nc)
//         visited[nr][nc] = false
//     }
// }

// for (let i = 0; i < M; i++) {
//     if (map[0][i] === 0) {
//         visited[0][i] = true
//         dfs(0, i)
//         visited[0][i] = false
//     }
// }
// console.log(ans === false ? 'NO' : 'YES')

/*
dfs. 먼저 끝에 닿는 게 있으면 종료해서 시간 줄여주지 않을까?
-> 시간초과. why?
DFS는 재귀 호출을 사용하여 경로 하나를 끝까지 탐색하고 다시 돌아와 다른 경로를 탐색하므로, 깊이가 깊어질수록 시간이 오래 걸리며, 중복 경로 탐색이 발생합니다. 이 때문에 시간 초과가 발생합니다.
*/
