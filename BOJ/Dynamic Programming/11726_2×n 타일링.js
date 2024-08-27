const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));
const [N] = input[0];
const DIV = 10007;
const dp = [0, 1, 2];
for (let i = 3; i <= N; i++) {
  dp[i] = (dp[i - 1] + dp[i - 2]) % DIV;
}
console.log(dp[N]);

/*
2×n 크기의 직사각형을 1×2, 2×1 타일로 채우는 방법의 수를 구하는 프로그램을 작성하시오.
첫째 줄에 2×n 크기의 직사각형을 채우는 방법의 수를 10,007로 나눈 나머지를 출력한다.
(1 ≤ n ≤ 1,000)

n=1
1

n=2
2

n=3
3

dp[i] = dp[i-1] + dp[i-2]
-> 피보나치 수열
*/
