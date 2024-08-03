const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));
const [TC_NUM] = input[0];
const dr = [-2, -1, 1, 2, 2, 1, -1, -2];
const dc = [1, 2, 2, 1, -1, -2, -2, -1];

const isOut = (r, c, L) => r < 0 || r >= L || c < 0 || c >= L;

const bfs = (sr, sc, tr, tc, L) => {
  const queue = [[sr, sc, 0]];
  const visited = Array.from({ length: L }, () =>
    Array.from({ length: L }, () => false)
  );
  let head = 0;
  visited[sr][sc] = true;
  while (queue.length > head) {
    const [cr, cc, cnt] = queue[head++];
    if (cr === tr && cc === tc) {
      return cnt;
    }
    for (let i = 0; i < dr.length; i++) {
      const [nr, nc] = [cr + dr[i], cc + dc[i]];
      if (isOut(nr, nc, L) || visited[nr][nc]) continue;
      visited[nr][nc] = true;
      queue.push([nr, nc, cnt + 1]);
    }
  }
  return -1;
};

const ans = [];
let tcCnt = 0;
let line = 1;
while (tcCnt < TC_NUM) {
  const [L] = input[line++];
  const [sr, sc] = input[line++];
  const [tr, tc] = input[line++];
  const cnt = bfs(sr, sc, tr, tc, L);
  ans.push(cnt);
  tcCnt++;
}
console.log(ans.join("\n"));

/*
bfs
12:20~12:33 (13m)
*/
