const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
const [N, L, R] = input[0].split(' ').map(Number)
const MAX = 100
const MOD = 1_000_000_007n
const dp = Array.from({ length: MAX+1 }, () => Array.from({ length: MAX+1 }, () => Array.from({ length: MAX+1 }, () => 0n)))
dp[1][1][1] = 1n
for (let n = 2; n <= N; n++) {
    for (let l = 1; l <= n; l++) {
        for (let r = 1; r <= n; r++) {
            dp[n][l][r] += dp[n-1][l-1][r] + dp[n-1][l][r-1] + dp[n-1][l][r] * (BigInt(n)-2n)
            dp[n][l][r] %= MOD
        }
    }
}
console.log(dp[N][L][R].toString())

/*
dp

왼, 오, 사이에 빌딩 추가하면서 n개일 때 l, r 업데이트
*/
