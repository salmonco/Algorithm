const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));
const [N] = input[0];
const dp = Array.from({ length: N + 1 }, () =>
  Array.from({ length: 3 }, () => 0)
);
for (let i = 1; i <= N; i++) {
  const [r, g, b] = input[i];
  dp[i][0] = Math.min(dp[i - 1][1], dp[i - 1][2]) + r;
  dp[i][1] = Math.min(dp[i - 1][0], dp[i - 1][2]) + g;
  dp[i][2] = Math.min(dp[i - 1][0], dp[i - 1][1]) + b;
}
const ans = Math.min(...dp[N]);
console.log(ans);

/*
각각의 집을 빨강, 초록, 파랑으로 칠하는 비용이 주어졌을 때, 아래 규칙을 만족하면서 모든 집을 칠하는 비용의 최솟값을 구해보자.
- 1번 집의 색은 2번 집의 색과 같지 않아야 한다.
- N번 집의 색은 N-1번 집의 색과 같지 않아야 한다.
- i(2 ≤ i ≤ N-1)번 집의 색은 i-1번, i+1번 집의 색과 같지 않아야 한다.

DP
*/
