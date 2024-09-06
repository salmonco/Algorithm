const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const STR1 = input[0];
const STR2 = input[1];
const dp = Array.from({ length: STR2.length + 1 }, () =>
  Array.from({ length: STR1.length + 1 }, () => 0)
);
for (let i = 1; i <= STR2.length; i++) {
  for (let j = 1; j <= STR1.length; j++) {
    if (STR2[i - 1] === STR1[j - 1]) dp[i][j] = dp[i - 1][j - 1] + 1;
    else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
  }
}
console.log(dp[STR2.length][STR1.length]);

/*
LCS(Longest Common Subsequence, 최장 공통 부분 수열)문제는 두 수열이 주어졌을 때, 모두의 부분 수열이 되는 수열 중 가장 긴 것을 찾는 문제이다.
예를 들어, ACAYKP와 CAPCAK의 LCS는 ACAK가 된다.
문자열은 알파벳 대문자로만 이루어져 있으며, 최대 1000글자로 이루어져 있다.

브루트포스 -> X의 모든 부분 수열을 구하고, 이 중에서 Y의 부분 수열이 되는 것을 구한뒤, 가장 길이가 긴 것을 구하면 된다.
-> X가 N개의 원소를 가질 때, O(2^N) -> 시간초과

다른사람풀이: dp
- 두 수열에서 X[i] === Y[j] 이면, memo[i - 1][j - 1] + 1의 값을 memo[i][j] 에 기록한다
- 두 수열에서 X[i] !== Y[j] 이면, memo[i][j-1] 과 memo[i - 1][j] 중에서 큰 값을 memo[i][j] 에 기록한다
반복문이 끝나면 memo[m + 1][n + 1] 값을 출력한다
https://ggarden.tistory.com/entry/%EB%B0%B1%EC%A4%80-9251-LCS-JavaScript
https://m.blog.naver.com/dlaxodud2388/222730438458

16:28~16:54 (26m)
*/
