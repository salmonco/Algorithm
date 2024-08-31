const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const [N, M] = input[0].split(" ").map(Number);
const SIZE = 8;
const board = [];
for (let i = 0; i < N; i++) {
  const arr = input[i + 1].split("");
  board[i] = arr;
}

const getMissCnt = (sr, sc) => {
  let missCnt = 0;
  for (let r = sr; r < sr + SIZE; r++) {
    for (let c = sc; c < sc + SIZE; c++) {
      const color = board[r][c];
      if ((r + c) % 2 === 0) {
        if (color !== "W") missCnt++;
      } else {
        if (color !== "B") missCnt++;
      }
    }
  }
  return missCnt;
};

let ans = Infinity;
for (let r = 0; r <= N - SIZE; r++) {
  for (let c = 0; c <= M - SIZE; c++) {
    const missCnt = getMissCnt(r, c);
    const minCnt = Math.min(missCnt, SIZE * SIZE - missCnt);
    ans = Math.min(ans, minCnt);
  }
}
console.log(ans);

/*
M×N 크기의 보드를 잘라서 8×8 크기의 체스판으로 만들려고 한다.
체스판을 색칠하는 경우는 두 가지뿐이다. 하나는 맨 왼쪽 위 칸이 흰색인 경우, 하나는 검은색인 경우이다.
지민이가 다시 칠해야 하는 정사각형의 최소 개수를 구하는 프로그램을 작성하시오.
N과 M은 8보다 크거나 같고, 50보다 작거나 같은 자연수이다.
B는 검은색이며, W는 흰색이다.

시작 가능 위치
0 ~ N-8
0 ~ M-8

0,0 -> W 짝
0,1 -> B 홀
1,0 -> B 홀
1,1 -> W 짝
1,2 -> B 홀

12:33~12:48 (15m)
*/
