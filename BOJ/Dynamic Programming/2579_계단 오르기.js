const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map(Number);
const N = input[0];
const dp = [0];
dp[1] = input[1];
dp[2] = input[1] + input[2];
for (let i = 3; i <= N; i++) {
  dp[i] = Math.max(dp[i - 3] + input[i - 1] + input[i], dp[i - 2] + input[i]);
}
console.log(dp[N]);

/*
각각의 계단에는 일정한 점수가 쓰여 있는데 계단을 밟으면 그 계단에 쓰여 있는 점수를 얻게 된다.
계단 오르는 데는 다음과 같은 규칙이 있다.
1. 계단은 한 번에 한 계단씩 또는 두 계단씩 오를 수 있다. 즉, 한 계단을 밟으면서 이어서 다음 계단이나, 다음 다음 계단으로 오를 수 있다.
2. 연속된 세 개의 계단을 모두 밟아서는 안 된다. 단, 시작점은 계단에 포함되지 않는다.
3. 마지막 도착 계단은 반드시 밟아야 한다.
각 계단에 쓰여 있는 점수가 주어질 때 이 게임에서 얻을 수 있는 총 점수의 최댓값을 구하는 프로그램을 작성하시오.
계단의 개수는 300이하의 자연수이고, 계단에 쓰여 있는 점수는 10,000이하의 자연수이다.

dp[n] -> n번째 계단을 밟았을 때 최대값
dp[2] = input[1] + input[2]
dp[3] = max(input[2]+input[3], input[1]+input[3])
dp[4] = max(dp[1]+input[3]+input[4], dp[2]+input[4])
dp[n] = max(dp[n-3]+input[n-1]+input[n], dp[n-2]+input[n])

https://s0ojin.tistory.com/4
*/
