const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));
const [R, C, K] = input[0];
const map = Array.from({ length: R }, () => Array.from({ length: C }, () => 0));
for (let i = 0; i < K; i++) {
  const [c1, r1, c2, r2] = input[i + 1];
  const [nr1, nr2] = [R - r1, R - r2];
  for (let r = nr2; r < nr1; r++) {
    for (let c = c1; c < c2; c++) {
      // console.log(r, c)
      map[r][c] = 1;
    }
  }
}
// console.log(map)
const dr = [-1, 0, 1, 0];
const dc = [0, 1, 0, -1];

const isOut = (r, c) => r < 0 || r >= R || c < 0 || c >= C;

const bfs = (r, c) => {
  const queue = [[r, c]];
  let head = 0;
  let size = 0;
  map[r][c] = 1;
  while (queue.length > head) {
    const [cr, cc] = queue[head++];
    size++;
    for (let i = 0; i < dr.length; i++) {
      const [nr, nc] = [cr + dr[i], cc + dc[i]];
      if (isOut(nr, nc) || map[nr][nc] === 1) continue;
      queue.push([nr, nc]);
      map[nr][nc] = 1;
    }
    // console.log(queue, cr, cc, size)
  }
  return size;
};

const ans = [];
let cnt = 0;
for (let r = 0; r < R; r++) {
  for (let c = 0; c < C; c++) {
    if (map[r][c] === 1) continue;
    const size = bfs(r, c);
    ans.push(size);
    cnt++;
  }
}
console.log(cnt);
console.log(ans.sort((a, b) => a - b).join(" "));

/*
M, N과 K 그리고 K개의 직사각형의 좌표가 주어질 때, K개의 직사각형 내부를 제외한 나머지 부분이 몇 개의 분리된 영역으로 나누어지는지,
그리고 분리된 각 영역의 넓이가 얼마인지를 구하여 이를 출력하는 프로그램을 작성하시오.
M, N, K는 모두 100 이하의 자연수이다.
모눈종이의 왼쪽 아래 꼭짓점의 좌표는 (0,0)이고, 오른쪽 위 꼭짓점의 좌표는(N,M)이다.

3:00~3:33 (33m)
*/
