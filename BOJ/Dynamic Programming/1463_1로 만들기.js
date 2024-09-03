const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map(Number);
const N = input[0];
const dp = [0, 0];

for (let i = 2; i <= N; i++) {
  let min = dp[i - 1];
  if (i % 3 === 0) {
    min = Math.min(min, dp[i / 3]);
  }
  if (i % 2 === 0) {
    min = Math.min(min, dp[i / 2]);
  }
  dp[i] = min + 1;
}
console.log(dp[N]);

/*
정수 X에 사용할 수 있는 연산은 다음과 같이 세 가지 이다.

X가 3으로 나누어 떨어지면, 3으로 나눈다.
X가 2로 나누어 떨어지면, 2로 나눈다.
1을 뺀다.

정수 N이 주어졌을 때, 위와 같은 연산 세 개를 적절히 사용해서 1을 만들려고 한다.
연산을 사용하는 횟수의 최솟값을 출력하시오.
첫째 줄에 1보다 크거나 같고, 106보다 작거나 같은 정수 N이 주어진다.

2 -> 1
-> 1

3 -> 1
-> 1

4 -> 2
4 -> 3
-> min(1, 1)+1 -> 2

5 -> 4
-> 2+1 -> 3

6 -> 2
6 -> 3
6 -> 5
-> min(1, 1, 3)+1 -> 2

7 -> 6
-> 2+1 -> 3

8 -> 4
8 -> 7
-> min(2, 3)+1 -> 3

9 -> 3
9 -> 8
-> min(1, 3)+1 -> 2

10 -> 5
10 -> 9
-> min(3, 2)+1 -> 3

*/
