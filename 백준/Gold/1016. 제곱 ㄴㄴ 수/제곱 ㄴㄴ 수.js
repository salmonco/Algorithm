const input = require('fs')
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n').map((v) => v.split(' ').map(Number))
const [MIN, MAX] = input[0]
let cnt = MAX-MIN+1
const check = Array.from({ length: cnt }, () => false)

for (let i = 2; i*i <= MAX; i++) {
    let pow = i*i
    let temp = Math.floor(MIN/pow)
    if (MIN % pow !== 0) {
        temp += 1
    }
    for (let j = temp; j*pow <= MAX; j++) {
        const canSquare = j*pow-MIN
        // console.log({i, pow,j, canSquare})
        if (!check[canSquare]) {
            check[canSquare] = true
            cnt -= 1
        }
    }
}
console.log(cnt)

/*
10^12 완탐으로 구하면 시간초과
절반만 봐야 할듯
그래도 10^6 * 10^6 이라 시간초과인데.
누적합으로 봐야 하나?
그래도 똑같은데.
역발상을 해야 하나? 제곱수 개수 구해서 빼기.

1 10
10 -> 최대 제곱수 3 
1 -> 최대 제곱수 1
min이 제곱수인가? o 그럼 1 추가
총 제곱수 = 3 - 1 + 1 = 3개
제곱ㄴㄴ수 = (10-1+1) - 3 = 7개

15 15
3 - 3 = 0
(15-15+1) - 0 = 1

1 1000
31 - 1 + 1 = 31
(1000-1+1) - 31 = 
아. 나누어떨어지지 않는 이구나.
2,3,5,... -> 소수만 보면 됨
2의 제곱수는 4의 제곱수랑 같은 거니깐.
그래서 제곱수의 개수를 셀 거면, 범위 내에 가능한 소수를 구하고,
그 소수의 제곱수가 들어갈 수 있는 최대 소수의 개수?
예를 들어, 1 1000
1000 -> 최대 소수가?

다른사람풀이 보니,
min과 max 사이 범위(10^6)에서 제곱수를 for문 돌리고,
해당 제곱수에 1씩 더해가면서 곱한 결과 제곱수를 기존 cnt에서 빼는 식으로 구함

제곱수 개수 구해서 빼는 접근은 비슷한데,
min과 max 사이의 범위만 보면 시간초과 안 나나 봄
난 누적합 접근으로 생각해서 시간초과가 예상됐나 봄
*/