const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));
const [T] = input[0];
const ans = [];
let line = 1;
let tc = 0;
while (tc < T) {
  const [N] = input[line++];
  const coins = input[line++];
  const [M] = input[line++];

  const dp = Array.from({ length: M + 1 }, () => 0);
  dp[0] = 1;
  for (const v of coins) {
    for (let j = v; j <= M; j++) {
      dp[j] += dp[j - v];
      // console.log(j, v, dp[j])
    }
  }
  ans.push(dp[M]);
  tc++;
}
console.log(ans.join("\n"));

/*
우리나라 화폐단위, 특히 동전에는 1원, 5원, 10원, 50원, 100원, 500원이 있다.
예를 들어, 30원을 만들기 위해서는 1원짜리 30개 또는 10원짜리 2개와 5원짜리 2개 등의 방법이 가능하다.
동전의 종류가 주어질 때에 주어진 금액을 만드는 모든 방법을 세는 프로그램을 작성하시오.
각 금액은 정수로서 1원부터 10000원까지 있을 수 있으며 공백으로 구분된다.
N가지 동전으로 만들어야 할 금액 M(1 ≤ M ≤ 10000)
편의를 위해 방법의 수는 2^31 - 1 보다 작고, 같은 동전이 여러 번 주어지는 경우는 없다.

다른사람풀이: dp
dp[i]는 주어진 동전들을 사용해 i원을 만들 수 있는 경우의 수를 의미합니다.
https://ddb8036631.github.io/boj/9084_%EB%8F%99%EC%A0%84/
*/
