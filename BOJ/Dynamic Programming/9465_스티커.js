const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));
const [T] = input[0];

const ans = [];
let line = 1;
let t = 0;
while (t < T) {
  const [N] = input[line++];
  const row1 = input[line++];
  const row2 = input[line++];
  const map = [row1, row2];

  const dp = [[0, row1[0], row2[0]]];
  for (let i = 1; i < N; i++) {
    dp[i] = [
      Math.max(...dp[i - 1]),
      Math.max(dp[i - 1][0], dp[i - 1][2]) + row1[i],
      Math.max(dp[i - 1][0], dp[i - 1][1]) + row2[i],
    ];
  }
  // console.log(dp)
  const max = Math.max(...dp[N - 1]);
  ans.push(max);

  t++;
}
console.log(ans.join("\n"));

/*
상근이의 여동생 상냥이는 문방구에서 스티커 2n개를 구매했다. 스티커는 그림 (a)와 같이 2행 n열로 배치되어 있다.
뗀 스티커의 왼쪽, 오른쪽, 위, 아래에 있는 스티커는 사용할 수 없게 된다.
모든 스티커를 붙일 수 없게된 상냥이는 각 스티커에 점수를 매기고, 점수의 합이 최대가 되게 스티커를 떼어내려고 한다.
상냥이가 뗄 수 있는 스티커의 점수의 최댓값을 구하는 프로그램을 작성하시오.
(1 ≤ n ≤ 100,000)

처음시도: bfs -> 1% 메모리초과
다른사람풀이: dp
- 하나의 열에서 고를 수 있는 가짓수는 3가지다.
  - 두 개의 행에서 아무것도 안 고를 때 -> dp[i][0]
  - 위의 행을 고를 때 -> dp[i][1]
  - 아래의 행을 고를 때 -> dp[i][2]
- 그 다음 dp 배열에서 하나의 열에서 고를 수 있는 최대값은 다음과 같다.
  - 이전 열에서 최댓값 (아무것도 고르지 않았으니 최대값을 고르면 된다.)
  - (이전 열에서 아무것도 고르지 않은 경우와, 이전 열에서 아래의 행을 골랐을 경우 중에 최대값) + 현재 열에서 고른 수
  - (이전 열에서 아무것도 고르지 않은 경우와, 이전 열에서 위의 행을 골랐을 경우 중에 최대값) + 현재 열에서 고른 수
https://junghyeonsu.tistory.com/290
*/
