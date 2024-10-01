const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));
const [N] = input[0];
const [A] = input.slice(1);
const increaseDP = Array.from({ length: N }, () => 1);
const decreaseDP = Array.from({ length: N }, () => 1);

for (let i = 0; i < N; i++) {
  const c = A[i];
  let cnt = 1;
  for (let j = 0; j < i; j++) {
    const n = A[j];
    if (n < c) {
      cnt = Math.max(cnt, increaseDP[j] + 1);
    }
  }
  increaseDP[i] = cnt;
}

for (let i = N - 1; i >= 0; i--) {
  const c = A[i];
  let cnt = 1;
  for (let j = i + 1; j < N; j++) {
    const n = A[j];
    if (n < c) {
      cnt = Math.max(cnt, decreaseDP[j] + 1);
    }
  }
  decreaseDP[i] = cnt;
}
// console.log(increaseDP, decreaseDP)

let ans = 0;
for (let i = 0; i < N; i++) {
  ans = Math.max(ans, increaseDP[i] + decreaseDP[i]);
}
console.log(ans - 1);

/*
11:44~12:33 (49m)

1 5 -> 2+
1 5 2 -> 3-
1 5 2 1 -> 4-
1 5 2 1 4 -> 4
뭔가 중복이 있을 것 같은데, dp로 안 되나?
새로운 거 추가되면 그에따라 경우의 수 바뀌어서 안 될듯

브루트포스는?
피크 지점을 고르고 양옆으로 스캔?
근데 그렇게 해도 중복된 거 많아서 dp 써야겠는데.. 어떻게 쓰지?

다른사람풀이: 피크 지점을 기준으로 양옆 카운트 셀 때 dp 이용
증가dp, 감소dp

1 -> 1
1 5 -> max(dp[0]+1) = 2
1 5 2 -> max(dp[0]+1) = 2
1 5 2 1 -> 1
1 5 2 1 4 -> max(dp[0]+1, dp[2]+1, dp[3]+1) = 3
*/
