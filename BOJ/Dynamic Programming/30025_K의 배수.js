const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));
const [N, M, K] = input[0];
const selected = input[1];
const dp = Array.from({ length: M + 1 }, () =>
  Array.from({ length: K }, () => 0)
);

for (let i = 0; i < N; i++) {
  if (selected[i] === 0) continue;
  const remain = selected[i] % K;

  dp[1][remain]++;
}

for (let i = 2; i <= M; i++) {
  for (let j = 0; j < N; j++) {
    for (let l = 0; l < K; l++) {
      const remain = (l * 10 + selected[j]) % K;

      dp[i][remain] += dp[i - 1][l];
      dp[i][remain] %= 10 ** 9 + 7;
    }
  }
}

console.log(dp[M][0]);

/*
고른 숫자 중 M개 조합: 약 10^100 -> 경우의 수 너무 많음
M자리의 K의 배수 중에서 각 자리의 수가 고른 숫자에 포함되는지 확인
-> 이것도 너무 많을 수 있음. ex) 30자리의 2의 배수

각 자릿수를 K로 나눈 나머지의 합은 해당 수를 K로 나눈 나머지와 같음
ex) 75 -> 70 + 5
K가 25라고 하면, 70 % 25 = 20, 5 % 25 = 5, (20 + 5) % 25 = 0

ex) 11 -> 10 + 1
K가 11이라고 하면, 10 % 11 = 10, 1 % 11 = 1, (10 + 1) % 11 = 0

나머지를 다시 K로 나눴을 때 0이면 해당 수는 K의 배수임
다음 자리 수의 나머지 = 이전 자리수의 나머지 * 10 % K

100*10*1000 = 10^6
*/
