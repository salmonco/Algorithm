const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));
const [N, K] = input[0];
const dp = Array.from({ length: N + 1 }, () =>
  Array.from({ length: K + 1 }, () => 0)
);

for (let i = 1; i <= N; i++) {
  const [W, V] = input[i];

  for (let j = 1; j <= K; j++) {
    if (W > j) {
      dp[i][j] = dp[i - 1][j];
    } else {
      dp[i][j] = Math.max(dp[i - 1][j], V + dp[i - 1][j - W]);
    }
  }
}

console.log(dp[N][K]);
