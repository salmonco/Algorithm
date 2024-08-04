const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));
const [N] = input[0];
const A = input[1];
const B = input[2];
const sortedB = [...B].sort((a, b) => a - b);
const sortedA = [...A].sort((a, b) => b - a);
let ans = 0;
for (let i = 0; i < N; i++) {
  ans += sortedA[i] * sortedB[i];
}
console.log(ans);

/*
S = A[0] × B[0] + ... + A[N-1] × B[N-1]
S의 값을 가장 작게 만들기 위해 A의 수를 재배열하자. 단, B에 있는 수는 재배열하면 안 된다.
S의 최솟값을 출력하는 프로그램을 작성하시오.

B에서 큰 값은 A에서 작은 값과 매칭시켜야 함 -> 그리디

B: 1 2 3 7 8
A: 6 1 1 1 0
*/
