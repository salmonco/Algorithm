const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map(Number);
const T = input[0];
const dp = [0, 1, 1, 1, 2, 2, 3, 4, 5, 7, 9, 12];
for (let i = 12; i <= 100; i++) {
  dp[i] = dp[i - 1] + dp[i - 5];
}

const ans = [];
for (let i = 0; i < T; i++) {
  const N = input[i + 1];
  ans.push(dp[N]);
}
console.log(ans.join("\n"));

/*
1, 1, 1, 2, 2, 3, 4, 5, 7, 9, 12
dp[i] = dp[i-1] + dp[i-5]
*/
