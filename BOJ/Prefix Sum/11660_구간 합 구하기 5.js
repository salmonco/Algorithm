const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));
const [N, M] = input[0];
const map = [];
let line = 1;
for (let i = 0; i < N; i++) {
  map[i] = input[line++];
}

const prefixSum = Array.from({ length: N }, () =>
  Array.from({ length: N }, () => 0)
);
prefixSum[0][0] = map[0][0];
for (let j = 1; j < N; j++) {
  prefixSum[0][j] = prefixSum[0][j - 1] + map[0][j];
}
for (let i = 1; i < N; i++) {
  prefixSum[i][0] = prefixSum[i - 1][0] + map[i][0];
}
for (let i = 1; i < N; i++) {
  for (let j = 1; j < N; j++) {
    prefixSum[i][j] =
      prefixSum[i][j - 1] +
      prefixSum[i - 1][j] -
      prefixSum[i - 1][j - 1] +
      map[i][j];
  }
}
// console.log(prefixSum)

const ans = [];
for (let i = 0; i < M; i++) {
  const [ox1, oy1, ox2, oy2] = input[line++];
  const [x1, y1, x2, y2] = [ox1 - 1, oy1 - 1, ox2 - 1, oy2 - 1];
  // console.log(x1,y1,x2,y2)
  // (x2, y2) - (x1-1, y2) - (x2, y1-1) + (x1-1, y1-1)
  // const sum = prefixSum[x2][y2] - prefixSum[x1-1][y2] - prefixSum[x2][y1-1] + prefixSum[x1-1][y1-1]
  let sum = prefixSum[x2][y2];
  if (x1 - 1 >= 0) sum -= prefixSum[x1 - 1][y2];
  if (y1 - 1 >= 0) sum -= prefixSum[x2][y1 - 1];
  if (x1 - 1 >= 0 && y1 - 1 >= 0) sum += prefixSum[x1 - 1][y1 - 1];
  ans.push(sum);
}
console.log(ans.join("\n"));

/*
N×N개의 수가 N×N 크기의 표에 채워져 있다.
(x1, y1)부터 (x2, y2)까지 합을 구하는 프로그램을 작성하시오. (x, y)는 x행 y열을 의미한다.
(1 ≤ N ≤ 1024, 1 ≤ M ≤ 100,000)
표에 채워져 있는 수는 1,000보다 작거나 같은 자연수이다. (x1 ≤ x2, y1 ≤ y2)

(x1, y1) ~ (x2, y2)
= (x2, y2) - (x1-1, y2) - (x2, y1-1) + (x1-1, y1-1)

15:44~16:26 (42m)
*/
