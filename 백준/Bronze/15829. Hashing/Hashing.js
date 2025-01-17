const input = require('fs')
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n')
const L = Number(input[0])
const STR = input[1]
const R = 31
const MOD = 1234567891

const getHash = (str) => {
    const arr = str.split('')
    return arr.reduce((acc, cur, i) => {
        const replacedNum = cur.charCodeAt() - 96
        const result = replacedNum*(R**i) % MOD
        return acc + result
    }, 0)
}

const ans = getHash(STR)
console.log(ans)

/*
9:38

1초. 해시함수 만들기
*/