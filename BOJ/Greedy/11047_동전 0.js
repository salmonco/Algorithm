const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const [N, K] = input[0].split(" ").map(Number);
const coin = input.slice(1).map(Number);
let remain = K;
let cnt = 0;
for (let i = N - 1; i >= 0; i--) {
  const value = coin[i];
  if (remain < value) continue;
  const d = Math.floor(remain / value);
  remain -= d * value;
  cnt += d;
  if (remain === 0) break;
}
console.log(cnt);

/*
준규가 가지고 있는 동전은 총 N종류이고, 각각의 동전을 매우 많이 가지고 있다.
동전을 적절히 사용해서 그 가치의 합을 K로 만들려고 한다.
이때 필요한 동전 개수의 최솟값을 구하는 프로그램을 작성하시오.
(1 ≤ N ≤ 10, 1 ≤ K ≤ 100,000,000)
(1 ≤ Ai ≤ 1,000,000, A1 = 1, i ≥ 2인 경우에 Ai는 Ai-1의 배수)

처음시도: dp
1 -> 1
2 -> 2
3 -> 3
4 -> 4
5 -> 1
6 -> min(dp[5]+dp[1], dp[4]+dp[2], dp[3]+dp[3]) -> 2
7 -> min(dp[6]+dp[1], dp[5]+dp[2], dp[4]+dp[3]) -> 3
-> 시간초과

다른사람풀이: 그리디

*/
