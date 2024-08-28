const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));
const [N] = input[0];
const seq = input[1];
const dp = Array.from({ length: N }, () => 1);
for (let i = 0; i < N - 1; i++) {
  const start = seq[i];
  for (let j = i + 1; j < N; j++) {
    if (start < seq[j]) {
      dp[j] = Math.max(dp[j], dp[i] + 1);
    }
  }
}
console.log(Math.max(...dp));

/*
수열 A가 주어졌을 때, 가장 긴 증가하는 부분 수열을 구하는 프로그램을 작성하시오.
첫째 줄에 수열 A의 크기 N (1 ≤ N ≤ 1,000)이 주어진다.
둘째 줄에는 수열 A를 이루고 있는 Ai가 주어진다. (1 ≤ Ai ≤ 1,000)
첫째 줄에 수열 A의 가장 긴 증가하는 부분 수열의 길이를 출력한다.

예를 들어, 수열 A = {10, 20, 10, 30, 20, 50} 인 경우에
가장 긴 증가하는 부분 수열은 {10, 20, 30, 50} 이고, 길이는 4이다.

처음 시도: 인덱스 idx부터 시작해서 for문 돌리며 증가하는 부분 수열을 찾기 -> 실패
-> 모든 가능한 부분 수열을 고려하지 않으므로 최적의 길이를 찾을 수 없습니다.

다른사람풀이: dp
-> i부터 j까지 모든 가능한 부분 수열을 고려
https://hamo0.tistory.com/41
*/
