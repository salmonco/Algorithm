const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
const T = +input[0]
const MAX = 20
const dp = Array.from({ length: MAX+1 }, () => Array.from({ length: MAX+1 }, () => Array.from({ length: MAX+1 }, () => 0n)))
dp[1][1][1] = 1n
for (let n = 2; n <= MAX; n++) {
    for (let l = 1; l <= n; l++) {
        for (let r = 1; r <= n; r++) {
            dp[n][l][r] += dp[n-1][l-1][r] // A를 가장 왼쪽에 놓는 경우
            dp[n][l][r] += dp[n-1][l][r-1] // A를 가장 오른쪽에 놓는 경우
            dp[n][l][r] += dp[n-1][l][r] * (BigInt(n)-2n) // A를 막대 사이에 놓는 경우
            // console.log(n, j, k, dp[n][j][k])
        }
    }
}
const ans = []
for (let i = 0; i < T; i++) {
    const [N, L, R] = input[i+1].split(' ').map(Number)
    ans.push(dp[N][L][R])
}
console.log(ans.join('\n'))

/*
엄청 오래 걸림

위치 인덱스 왼,오 줘서 재귀함수로 풀려했다가 실패

다른사람풀이: dp
dp[n][l][r]: 막대를 n 개 배치한 상태에서 왼쪽에서는 l 개, 오른쪽에서는 r 개의 막대가 보이도록 하는 배치의 경우의 수
가장 높은 높이 n인 막대부터 시작해서 내림차순으로 막대를 배치한다고 가정
곱하는 (n - 2)는 막대 사이에 놓을 수 있는 위치의 개수를 의미. 가장 왼,오 빼서.

4% 실패. 왜?
테케 매번 dp 만들지 말고, 최대 범위로 dp 한 번 만들어놓고 테케에서 출력만 할까? 이게 더 좋아보이긴 한데 그래도 실패.

-> JavaScript에서는 기본적으로 Number 타입이 float로 처리되기 때문에, 큰 수의 연산에서 오버플로우가 발생할 수 있습니다.
-> BigInt로 변경
*/
