const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map(Number);
const N = input[0];
const grades = input.slice(1);
grades.sort((a, b) => a - b);
const off = Math.round(N * (15 / 100));
let sum = 0;
for (let i = off; i < N - off; i++) {
  const g = grades[i];
  sum += g;
}
console.log(N === 0 ? 0 : Math.round(sum / (N - off * 2)));

/*
사용자들이 어떤 문제에 제출한 난이도 의견 목록이 주어질 때, solved.ac가 결정한 문제의 난이도를 계산하는 프로그램을 작성하시오.
아직 아무 의견이 없다면 문제의 난이도는 0으로 결정한다.
의견이 하나 이상 있다면, 문제의 난이도는 모든 사람의 난이도 의견의 30% 절사평균으로 결정한다.
30% 절사평균의 경우 위에서 15%, 아래에서 15%를 각각 제외하고 평균을 계산한다.
(0 ≤ n ≤ 3 × 10^5)
모든 난이도 의견은 1 이상 30 이하이다.

0 1 2 3 [4 ... 21] 22 23 24 25
*/
