const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));
const [N] = input[0];
const M = N / 3;
const SIZE = 5 * M + (M - 1);
const map = Array.from({ length: SIZE }, () =>
  Array.from({ length: SIZE }, () => " ")
);

const recur = (m, r, c) => {
  // console.log(m, r, c)
  if (m === 1) {
    map[r][c] = "*";
    map[r + 1][c - 1] = "*";
    map[r + 1][c + 1] = "*";
    for (let i = 0; i < 5; i++) {
      map[r + 2][c - 2 + i] = "*";
    }
    return;
  }
  const newM = m / 2;
  const unit = 3 * newM;
  recur(newM, r, c);
  recur(newM, r + unit, c - unit);
  recur(newM, r + unit, c + unit);
};
const center = (SIZE - 1) / 2;
recur(M, 0, center);

console.log(map.map((v) => v.join("")).join("\n"));

/*
예제를 보고 규칙을 유추한 뒤에 별을 찍어 보세요.
첫째 줄에 N이 주어진다. N은 항상 3×2k 수이다. (3, 6, 12, 24, 48, ...) (0 ≤ k ≤ 10, k는 정수)

24 = 3 * 2^3
k=3

k -> 밑면의 개수
0 -> 5*1 + 0
1 -> 5*2 + 1
2 -> 5*4 + 3
3 -> 5*8 + 7
k -> 5*M+ (M-1)

밑면의 개수 -> 높이
5 -> 3*1
11 -> 3*2
23 -> 3*4
47 -> 3*8
SIZE -> 3*M

14:47~16:02 (75m)
*/
