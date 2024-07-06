const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));
const [H, W] = input[0];
const board = [];
const dr = [0, -1, 0, 1];
const dc = [-1, 0, 1, 0];
const visited = Array.from({ length: H }, () =>
  Array.from({ length: W }, () => false)
);
let pictureCnt = 0;
let maxCnt = 0;

for (let i = 0; i < H; i++) {
  const row = input[i + 1];
  board[i] = row;
}
// console.log(board)
const isOut = (r, c) => r < 0 || r >= H || c < 0 || c >= W;

const bfs = (r, c) => {
  let cnt = 1;
  const queue = [[r, c]];
  let head = 0;
  visited[r][c] = true;
  while (queue.length > head) {
    const [cr, cc] = queue[head++];
    for (let i = 0; i < dr.length; i++) {
      const [nr, nc] = [cr + dr[i], cc + dc[i]];
      if (isOut(nr, nc) || visited[nr][nc] || !board[nr][nc]) continue;
      visited[nr][nc] = true;
      cnt++;
      queue.push([nr, nc]);
    }
  }
  return cnt;
};

for (let i = 0; i < H; i++) {
  for (let j = 0; j < W; j++) {
    if (!board[i][j] || visited[i][j]) continue;
    // console.log(i, j, visited)
    pictureCnt++;
    const cnt = bfs(i, j);
    maxCnt = Math.max(maxCnt, cnt);
  }
}
console.log(pictureCnt);
console.log(maxCnt);

/*
어떤 큰 도화지에 그림이 그려져 있을 때, 그 그림의 개수와, 그 그림 중 넓이가 가장 넓은 것의 넓이를 출력하여라.
단, 그림이라는 것은 1로 연결된 것을 한 그림이라고 정의하자.
가로나 세로로 연결된 것은 연결이 된 것이고 대각선으로 연결이 된 것은 떨어진 그림이다.
그림의 넓이란 그림에 포함된 1의 개수이다.
-> bfs
*/
