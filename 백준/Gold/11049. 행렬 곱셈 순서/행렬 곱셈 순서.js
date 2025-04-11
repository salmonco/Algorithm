const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(' ').map(Number))
const [N] = input[0]
const matrices = input.slice(1)
const dp = Array.from({ length: N }, () => Array.from({ length: N }, () => Infinity))

for (let i = 0; i < N; i++) {
    dp[i][i] = 0 // 한 개의 행렬은 곱셈 연산 필요 없음
}

for (let len = 1; len < N; len++) {
    for (let i = 0; i+len < N; i++) {
        const j = i+len
        for (let k = i; k < j; k++) {
            dp[i][j] = Math.min(
                dp[i][j],
                dp[i][k] + dp[k+1][j] + matrices[i][0] * matrices[k][1] * matrices[j][1]
            )
        }
    }
}

console.log(dp[0][N-1])

/*
00:06

1초. N, R, C 최대 500
행렬을 곱하는데, 곱셈 순서에 따라 연산 횟수가 달라진다. 곱셈 연산 횟수 최솟값 구하기

A, B 두 행렬이 곱셈 연산을 할 수 있으려면
A 행렬의 c 와, B 행렬의 r 이 같아야 함

걍 dfs 돌리면 안 되나?
곱셈 가능하면 하고, 아니면 stop
min 연산 횟수 저장

-> 시간초과

dfs 는 시간복잡도 가늠이 잘 안 간다... gpt 한테 물어보니
순열 만드는 경우의 수 N! 이랑 각 단계에 걸리는 N 곱한 거래. 즉 N! x N 이란 건데,
N!은 N ≈ 10~11부터는 1초 안에 완전탐색 거의 불가능하대.

다른사람 풀이 보니 dp 로 풂
어케 dp 방법을 생각해낼 수 있는지가 궁금한데.

음. 중복이 있겠네. 저장해두면 재사용 가능하겠네.
A x B x C
A x B x D
A x B 를 재사용 가능
행렬 곱셈 연산 횟수의 최소비용을 저장해두자.

dp[i][j]는 i번째 행렬부터 j번째 행렬까지 곱하는 데 필요한 최소 연산 횟수
점화식은 어케 되지..

이해하기 쉽게 가시화한 포스팅: https://eunchanee.tistory.com/294
코드 참고한 포스팅: https://fordang.tistory.com/341

[i ~ k] x [k+1 ~ j]
dp[i][k] + dp[k+1][j]

[iR, kC] x [k+1R, jC] 행, 열이 이렇다고 치면
+ 두 행렬 사이를 연결하는 곱셈을 수행하는데, 이때 iR * kC * jC
혹은 iR * k+1R * jC

*/