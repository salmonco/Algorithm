const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map(Number);
const T = input[0];
const MAX_NUM = 10;
const dp = Array.from({ length: MAX_NUM + 1 }, () => 0);
dp[1] = 1;
dp[2] = 2;
dp[3] = 4;

for (let i = 4; i <= MAX_NUM; i++) {
  dp[i] = dp[i - 1] + dp[i - 2] + dp[i - 3];
}

const ans = [];
for (let i = 0; i < T; i++) {
  const N = input[i + 1];
  ans.push(dp[N]);
}
console.log(ans.join("\n"));

/*
정수 n이 주어졌을 때, n을 1, 2, 3의 합으로 나타내는 방법의 수를 구하는 프로그램을 작성하시오.
-> DP. 1부터 10까지 경우의 수 미리 구해놓기

1
1
-> 1

2
1+1
2
-> 2

3
1+1+1
1+2
2+1
3
-> 4

4
1+1+1+1
1+1+2
1+2+1
2+1+1
2+2
1+3
3+1
-> 7
: dp[1]+3 -> 1가지
: dp[2]+2 -> 2가지
: dp[3]+1 -> 4가지
*/
