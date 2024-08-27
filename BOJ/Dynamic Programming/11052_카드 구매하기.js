const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));
const [N] = input[0];
const price = input[1];
const dp = Array.from({ length: N + 1 }, () => 0);
for (let i = 0; i < N; i++) {
  dp[i + 1] = price[i];
}
for (let i = 2; i <= N; i++) {
  for (let j = i - 1; j >= Math.ceil(i / 2); j--) {
    dp[i] = Math.max(dp[i], dp[j] + dp[i - j]);
  }
}
console.log(dp[dp.length - 1]);

/*
민규는 돈을 최대한 많이 지불해서 카드 N개 구매하려고 한다. 카드가 i개 포함된 카드팩의 가격은 Pi원이다.
예를 들어, 카드팩이 총 4가지 종류가 있고, P1 = 1, P2 = 5, P3 = 6, P4 = 7인 경우에 민규가 카드 4개를 갖기 위해 지불해야 하는 금액의 최댓값은 10원이다. 2개 들어있는 카드팩을 2번 사면 된다.
카드 팩의 가격이 주어졌을 때, N개의 카드를 구매하기 위해 민규가 지불해야 하는 금액의 최댓값을 구하는 프로그램을 작성하시오.
구매한 카드팩에 포함되어 있는 카드 개수의 합은 N과 같아야 한다.

4
1 5 6 7
dp[1] = 1
dp[2] = 5
dp[3] = 6
dp[4] = 7

dp[2] = Math.max(dp[2], dp[1] + dp[1]) = 5
dp[3] = Math.max(dp[3], dp[2] + dp[1]) = 6
dp[4] = Math.max(dp[4], dp[3] + dp[1], dp[2] + dp[2]) = 7, 6+1, 5+5 = 10

dp[n] -> 카드가 n개

9:07~9:25 (18m)
*/
