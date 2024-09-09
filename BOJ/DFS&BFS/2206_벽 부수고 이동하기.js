const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const [N, M] = input[0].split(" ").map(Number);
const MAX_BREAK_CNT = 1;
const map = input.slice(1).map((v) => v.split("").map(Number));
const dr = [-1, 1, 0, 0];
const dc = [0, 0, -1, 1];

const isOut = (r, c) => r < 0 || r >= N || c < 0 || c >= M;

const bfs = (r, c) => {
  const queue = [[r, c, 1, 0]];
  const visited = Array.from({ length: N }, () =>
    Array.from({ length: M }, () =>
      Array.from({ length: MAX_BREAK_CNT + 1 }, () => false)
    )
  );
  let head = 0;
  while (queue.length > head) {
    const [cr, cc, cnt, breakCnt] = queue[head++];
    // console.log(cr, cc, cnt, breakCnt)
    if (cr === N - 1 && cc === M - 1) return cnt;
    for (let i = 0; i < dr.length; i++) {
      const [nr, nc] = [cr + dr[i], cc + dc[i]];
      if (isOut(nr, nc)) continue;
      if (map[nr][nc] === 1) {
        if (breakCnt === MAX_BREAK_CNT) continue;
        if (visited[nr][nc][breakCnt + 1]) continue;
        queue.push([nr, nc, cnt + 1, breakCnt + 1]);
        visited[nr][nc][breakCnt + 1] = true;
      } else {
        if (visited[nr][nc][breakCnt]) continue;
        queue.push([nr, nc, cnt + 1, breakCnt]);
        visited[nr][nc][breakCnt] = true;
      }
    }
  }
  return -1;
};

const minCnt = bfs(0, 0);
console.log(minCnt);

/*
N×M의 행렬로 표현되는 맵이 있다. 맵에서 0은 이동할 수 있는 곳을 나타내고, 1은 이동할 수 없는 벽이 있는 곳을 나타낸다.
당신은 (1, 1)에서 (N, M)의 위치까지 이동하려 하는데, 이때 최단 경로로 이동하려 한다.
만약에 이동하는 도중에 한 개의 벽을 부수고 이동하는 것이 좀 더 경로가 짧아진다면, 벽을 한 개 까지 부수고 이동하여도 된다.
한 칸에서 이동할 수 있는 칸은 상하좌우로 인접한 칸이다.
맵이 주어졌을 때, 최단 경로를 구해 내는 프로그램을 작성하시오.
N(1 ≤ N ≤ 1,000), M(1 ≤ M ≤ 1,000)

12:03~12:21 (18m)
*/
