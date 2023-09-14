const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));
const [R, C, T] = input[0];
const A = Array.from({ length: R }, () => Array.from({ length: C }));
for (let i = 0; i < R; i++) {
  for (let j = 0; j < C; j++) {
    A[i][j] = input[1 + i][j];
  }
}
// console.log(A)
const dx = [-1, 0, 1, 0];
const dy = [0, -1, 0, 1];
let sec = 0;

while (sec < T) {
  // 1. 미세먼지 확산
  const spreads = []; // [x, y, 확산된 양]

  for (let i = 0; i < R; i++) {
    for (let j = 0; j < C; j++) {
      const dust = A[i][j];
      const add = Math.floor(dust / 5);
      let dirCnt = 0;

      if (dust <= 0) continue;
      for (let k = 0; k < dx.length; k++) {
        const [r, c] = [i + dx[k], j + dy[k]];

        if (r < 0 || r >= R || c < 0 || c >= C || A[r][c] === -1) continue;
        spreads.push([r, c, add]);
        dirCnt++;
      }
      A[i][j] -= add * dirCnt;
    }
  }
  for (let i = 0; i < spreads.length; i++) {
    const spread = spreads[i];
    const [x, y, add] = spread;

    A[x][y] += add;
  }
  // console.log(A, spreads, '확산')
  // 2. 공기청정기 작동
  let rowStart;
  for (let i = 0; i < R; i++) {
    if (A[i][0] === -1) {
      rowStart = i;
      break;
    }
  }
  // 2-1. 위쪽 순환
  for (let i = rowStart - 2; i >= 0; i--) {
    A[i + 1][0] = A[i][0];
  }
  for (let i = 1; i < C; i++) {
    A[0][i - 1] = A[0][i];
  }
  for (let i = 1; i <= rowStart; i++) {
    A[i - 1][C - 1] = A[i][C - 1];
  }
  for (let i = C - 2; i >= 1; i--) {
    A[rowStart][i + 1] = A[rowStart][i];
  }
  A[rowStart][1] = 0;
  // 2-2. 아래쪽 순환
  rowStart++;
  for (let i = rowStart + 2; i < R; i++) {
    A[i - 1][0] = A[i][0];
  }
  for (let i = 1; i < C; i++) {
    A[R - 1][i - 1] = A[R - 1][i];
  }
  for (let i = R - 2; i >= rowStart; i--) {
    A[i + 1][C - 1] = A[i][C - 1];
  }
  for (let i = C - 2; i >= 1; i--) {
    A[rowStart][i + 1] = A[rowStart][i];
  }
  A[rowStart][1] = 0;
  // console.log(A, '순환')
  sec++;
}
console.log(
  A.reduce(
    (p, dust) => p + dust.reduce((pp, v) => (v === -1 ? pp : pp + v), 0),
    0
  )
);
