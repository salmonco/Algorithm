const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));
const [N] = input[0];
const map = input.slice(1);

const isOut = (r, c) => r < 0 || r >= N || c < 0 || c >= N;

// type
// 0 : 가로
// 1 : 세로
// 2 : 대각선
// let cnt = 0
// const dfs = (r, c, type) => {
//     // console.log(cr, cc, ctype)
//      if (r === N-1 && c === N-1) {
//         cnt++
//         return
//     }
//     // 가로
//     if (type !== 1 && !isOut(r, c+1) && map[r][c+1] === 0) {
//         dfs(r, c+1, 0)
//     }
//     // 세로
//    if (type !== 0 && !isOut(r+1, c) && map[r+1][c] === 0) {
//         dfs(r+1, c, 1)
//     }
//     // 대각선
//     if (!isOut(r+1, c+1) && map[r+1][c+1] === 0 && map[r][c+1] === 0 && map[r+1][c] === 0) {
//         dfs(r+1, c+1, 2)
//     }
// }
// dfs(0, 1, 0)
// console.log(cnt)

const d1 = Array.from({ length: N }, () => Array.from({ length: N }, () => 0)); // 가로
const d2 = Array.from({ length: N }, () => Array.from({ length: N }, () => 0)); // 세로
const d3 = Array.from({ length: N }, () => Array.from({ length: N }, () => 0)); // 대각선
d1[0][1] = 1;
for (let r = 0; r < N; r++) {
  for (let c = 0; c < N; c++) {
    // 가로
    if (!isOut(r, c + 1) && map[r][c + 1] === 0) {
      d1[r][c + 1] += d1[r][c] + d3[r][c];
    }
    // 세로
    if (!isOut(r + 1, c) && map[r + 1][c] === 0) {
      d2[r + 1][c] += d2[r][c] + d3[r][c];
    }
    // 대각선
    if (
      !isOut(r + 1, c + 1) &&
      map[r + 1][c + 1] === 0 &&
      map[r][c + 1] === 0 &&
      map[r + 1][c] === 0
    ) {
      d3[r + 1][c + 1] += d1[r][c] + d2[r][c] + d3[r][c];
    }
  }
}
const ans = d1[N - 1][N - 1] + d2[N - 1][N - 1] + d3[N - 1][N - 1];
console.log(ans);

/*
오래 걸림

dp 냄새가 나는데..
0 0
0 0

0 0 1
0 0 1
0 0 1

0 0 1 1
0 0 1 2
0 0 1 2
0 0 0 3

0 0 1 1 1
0 0 1 2 3
0 0 1 2 4
0 0 0 3 5
0 0 0 0 8
규칙이 있나?
대각선에 있는 것들은 대각선+위
그외 것들은 대각선+왼

0 0 1 1 1 1
0 x 1 2 3 4
0 0 1 2 4 7
0 0 0 3 5 9
0 0 0 0 8 13
0 0 0 0 0 21
답은 13이라 규칙이 성립 안 함.

근데 걍 bfs 돌리면 되지 않을까?
대각선의 경우 끝점 이외에 위, 왼도 빈칸이어야 함
-> 65% 시간초과
N <= 16
16*16=256
2^256 ??
-> dfs로 하니깐 됨. why?
: DFS의 경우, 재귀 호출이 순차적으로 진행되면서 상태가 스택에 쌓였다가 제거되므로, 중복 경로를 탐색하더라도 BFS만큼 메모리 사용량이 폭증하지는 않습니다.

다른사람풀이: dp
가로, 세로, 대각선 dp 3개 만들기 or 3차원 dp
-> 위에서 규칙 탐색할 때 가로, 세로, 대각선 각각 나누어 봤으면 좋았을 듯
생각이 도달하지 못했다면 뭐 때문에 안 될 것 같은지 써놓기. 그래야 개선책이 보일 듯
ex. 각 위치 별로 파이프 방향이 다를 수 있어서 규칙이란 게 없어보인다
*/
