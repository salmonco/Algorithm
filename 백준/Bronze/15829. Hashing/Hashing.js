const input = require('fs')
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n')
const L = Number(input[0])
const STR = input[1]
const R = 31n
const MOD = 1234567891n
let exponent = 1n

const getHash = (str) => {
    const arr = str.split('')
    return arr.reduce((acc, cur, i) => {
        const replacedNum = BigInt(cur.charCodeAt() - 96)
        const result = replacedNum*exponent % MOD
        exponent *= R % MOD
        return (acc + result) % MOD
    }, 0n)
}

const ans = getHash(STR)
console.log(ans.toString())

/*
9:38

1초. 해시함수 만들기

-> 50점. 부분통과. 개선점이 뭘까. 지수 곱 계산할 때 divide and conquer 해줘야 하나?
-> 그래도 50점. 흠 뭐지.
다른사람풀이 보니 매번 반복문에서 exponent를 새로 계산해줄 필요 없이,
반복문 돌 때마다 변수에 계속 R만큼 곱해주는 식으로 지수 계산하면 하면 시간 절약 가능
-> 그래도 50점. 뭐지
exponent에도 MOD로 나눠주기
반환값인 acc+result 도 MOD로 나눠주기
-> 그래도 50점. 뭐지
BigInt 써야 하나? 아직 큰 수 범위 기준에 대해 잘 몰겠음..

*/