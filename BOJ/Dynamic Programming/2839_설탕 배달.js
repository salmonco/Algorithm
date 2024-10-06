const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const N = +input[0];
const dp = Array.from({ length: N + 1 }, () => Infinity);
dp[3] = 1;
dp[5] = 1;
for (let i = 6; i <= N; i++) {
  dp[i] = Math.min(dp[i - 3], dp[i - 5]) + 1;
}
console.log(dp[N] === Infinity ? -1 : dp[N]);

/*
11:26~11:44 (18m)

dp

3 -> 1
5 -> 1
6 -> 2
8 -> min(dp[8-3], dp[8-5])+1 = 2
9 -> min(dp[9-3], dp[9-5])+1 = 3
10 -> min(dp[10-3], dp[10-5])+1 = 2
12 -> min(dp[12-3], dp[12-5])+1 = 4

*/
