const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(' ').map(Number))
const [N, M] = input[0]
const activeBites = input[1]
const cost = input[2]
const costSum = cost.reduce((acc, cur) => acc+cur, 0)
const dp = Array.from({ length: N+1 }, () => Array.from({ length: costSum+1 }, () => 0))

for (let i = 1; i <= N; i++) {
    for (let j = costSum; j >= 0; j--) {
        const c = cost[i-1]
        const m = activeBites[i-1]
        if (j-c < 0) {
            dp[i][j] = dp[i-1][j]
        } else {
            dp[i][j] = Math.max(dp[i-1][j], dp[i-1][j-c] + m)
        }
    }
}
// console.log(dp, costSum)
const minCost = dp[N].findIndex((v) => v >= M)
console.log(minCost)

/*
8:59

1초. n=10^2

현재 활성화된 앱을 M 바이트만큼 메모리 해제하는데, 코스트 젤 적게 들어야 함.

이거 배낭문제 같은데.. dp
일단 그리디는 아님. 바이트랑 코스트 둘 다 고려해야 해서.
dp로 풀어야겠다. 어떻게?
한 앱에 대해, 메모리를 해제하거나 말거나. 선택지는 두 개다.
min(메모리를 해제하는 경우 + cost, 해제하지 않는 경우)
n개의 앱에 대해 돌면서 dp 갱신하고, 현재 남아있는 바이트는 어디다 저장하지?

dp[i][m]
i번째 앱 돌면서, 남아있는 메모리 m
-> 근데 초기값을 어케 설정해야 하지? 메모리도 연속적이지 않은데.
-> 메모리를 인덱스로 해서 연속적이게 만들 수 있는데, 10^7 이라 메모리초과 예상

다른사람풀이보니, dp에 cost를 인덱스로 두고, 값을 메모리로 뒀음. cost는 최대 100 이라 괜찮.
dp[i][j] -> i 번째 앱 까지 포함했을 때, j 의 비용으로 얻을 수 있는 메모리
*/