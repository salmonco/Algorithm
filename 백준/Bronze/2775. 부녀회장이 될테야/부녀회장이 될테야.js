const input = require('fs')
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n').map(Number)
const T = input[0]
const MAX = 14

const dp = Array.from({ length: MAX+1 }, () => Array.from({ length: MAX+1 }, () => 0))
for (let i = 1; i <= MAX; i++) {
    dp[0][i] = i
}
for (let i = 1; i <= MAX; i++) {
    for (let j = 1; j <= MAX; j++) {
        let sum = 0
        for (let l = 1; l <= j; l++) {
            sum += dp[i-1][l]
        }
         dp[i][j] = sum
    }
}
// console.log(dp)

const ans = []
for (let i = 0; i < T; i++) {
    const K = input[i*2+1]
    const N = input[i*2+2]
    const result = dp[K][N]
    ans.push(result)
}
console.log(ans.join('\n'))

/*
10:21

k층에 n호에는 몇 명이 살고 있는지?

0층
    1호: 1
    2호: 2
    3호: 3
    ...
1층
    1호: 1
    2호: 1+2=3
    3호: 1+2+3=6
    ...
2층
    1호: 1
    2호: 1+3
    3호: 1+3+6
    ...
중복으로 계산한 값을 재사용
중복을 줄이는 방법. 언뜻 생각나는 건 dp.
dp로 최대 범위까지 다 구해놓고 테케 돌리면 될 듯?

dp[층][호]
dp[0][1] ~ dp[14][14]

*/