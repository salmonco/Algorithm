const fs = require("fs");
const [n, ...input] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

let cost = Array.from({ length: input.length }, () => Array(3));
let dp = Array.from({ length: input.length }, () => Array(3));
let answer = Infinity;

for (let i = 0; i < +n; i++) {
  cost[i] = input[i].split(" ").map((item) => +item);
}

for (let start = 0; start < 3; start++) {
  dp[0] = [Infinity, Infinity, Infinity];
  dp[0][start] = cost[0][start];

  for (let i = 0; i < +n - 1; i++) {
    dp[i + 1][0] = cost[i + 1][0] + Math.min(dp[i][1], dp[i][2]);
    dp[i + 1][1] = cost[i + 1][1] + Math.min(dp[i][0], dp[i][2]);
    dp[i + 1][2] = cost[i + 1][2] + Math.min(dp[i][0], dp[i][1]);
  }

  for (let j = 0; j < 3; j++) {
    if (start === j) continue;
    answer = Math.min(answer, dp[+n - 1][j]);
  }
}

console.log(answer);
