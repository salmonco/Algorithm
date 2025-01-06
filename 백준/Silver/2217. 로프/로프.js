const input = require('fs')
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n').map(Number)
const N = input[0]
const weights = input.slice(1)
const sortedWeights = [...weights].sort((a, b) => a - b)
let ans = 0
for (let i = 0; i < N; i++) {
    const v = sortedWeights[i]
    const result = v * (N-i)
    ans = Math.max(ans, result)
}
console.log(ans)

/*
9:21

10, 15 -> 최솟값 10 * 2 = 20
15 -> 15

10, 25 -> 최솟값 10 *2 = 20
25 -> 25

8, 10, 23 -> 최솟값 8 * 3 = 24
10, 23 -> 10 * 2 = 20

큰 값을 우선적으로 선택해야 함
n개일 때, 3개일 때, 2개일 때, 1개일 때

오름차순 정렬, 앞에서부터 *n ...
*/