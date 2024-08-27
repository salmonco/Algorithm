const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));
const [N] = input[0];
const DIV = 10007;
const dp = [0, 1, 3];
for (let i = 3; i <= N; i++) {
  dp[i] = (dp[i - 1] + dp[i - 2] * 2) % DIV;
}
console.log(dp[N] % DIV);

/*
2×n 직사각형을 1×2, 2×1과 2×2 타일로 채우는 방법의 수를 구하는 프로그램을 작성하시오.
첫째 줄에 2×n 크기의 직사각형을 채우는 방법의 수를 10,007로 나눈 나머지를 출력한다.
(1 ≤ n ≤ 1,000)

n=1
1

n=2
3

n=3
5

n=4
11
dp[3] + dp[2]*2

n=5
dp[4] + dp[3]*2

타일이 2x1 1x2 밖에 없었다 하지만 이번엔 2x2가 새로 생겼다
n이 1일때는 새로 생긴 도형이 한개, 2일때는 새로 생긴 도형이 2개다.
https://velog.io/@song961003/%EB%B0%B1%EC%A4%80-11727-2-x-n-%ED%83%80%EC%9D%BC%EB%A7%81-2-JS
*/
