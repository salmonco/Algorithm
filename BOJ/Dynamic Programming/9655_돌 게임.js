const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));
const [N] = input[0];
// const MAX_NUM = 1000
// for (let i = 1; i <= MAX_NUM; i++) {

// }
console.log(N % 2 === 0 ? "CY" : "SK");

/*
탁자 위에 돌 N개가 있다. 상근이와 창영이는 턴을 번갈아가면서 돌을 가져가며, 돌은 1개 또는 3개 가져갈 수 있다.
마지막 돌을 가져가는 사람이 게임을 이기게 된다.
게임은 상근이가 먼저 시작한다.
상근이가 게임을 이기면 SK를, 창영이가 게임을 이기면 CY을 출력한다.
-> N이 1부터 1000까지일 때 이기는 사람 미리 구해놓기. DP

1
1
-> SK

2
1, 1
-> CY

3
1, 1, 1
3
-> SK

4
1, 1, 1, 1
1, 3
3, 1
-> CY
: dp[1]+dp[3] -> SK + SK
: dp[2]+dp[2] -> CY + CY
: dp[3]+dp[1] -> SK + SK

5
1, 1, 1, 1, 1
1, 1, 3
1, 3, 1
3, 1, 1
-> SK
: dp[2]+dp[3] -> CY + SK
: dp[3]+dp[2] -> SK + CY
: dp[4]+dp[1] -> CY + SK

두 dp가 같은 값이면 CY
다른 값이면 SK
-> 그냥 홀수면 SK, 짝수면 CY
*/
