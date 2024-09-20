const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const N = +input[0];
const dp = [0, 1, 2, 3, 1, 2];
for (let i = 6; i <= N; i++) {
  if (Number.isInteger(i ** (1 / 2))) {
    dp[i] = 1;
    continue;
  }
  let min = Infinity;
  for (let j = 1; j <= Math.floor(i ** (1 / 2)); j++) {
    min = Math.min(min, dp[i - j ** 2]);
  }
  dp[i] = 1 + min;
}
console.log(dp[N]);

/*
자연수 n이 주어질 때, n을 최소 개수의 제곱수 합으로 표현하는 컴퓨터 프로그램을 작성하시오.
1 ≤ n ≤ 50,000

처음시도: bfs -> 런타임 killed
다른사람풀이: dp

1 -> 1 -> 1개
2 -> 1, 1 -> 2개
3 -> 1, 1, 1 -> 3개
4 -> 2 -> 1개
5 -> 2, 1 -> 2개
6 -> 1 + Math.min(dp[6-1], dp[6-4])
*/
