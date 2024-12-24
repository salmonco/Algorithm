const input = require('fs')
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n').map((v) => v.split(' ').map(Number))
const [CNT] = input[0]
const divisors = input[1]

const min = Math.min(...divisors)
const max = Math.max(...divisors)
console.log(min*max)

// const getGCD = (a, b) => b === 0 ? a : getGCD(b, a%b)
// const getLCM = (a, b, gcd) => a*b/gcd

// const lcm = divisors.reduce((acc, cur) => getLCM(acc, cur, getGCD(acc, cur)), divisors[0])

// if (divisors.includes(lcm)) {
//     console.log(lcm*2)
// } else {
//     console.log(lcm)
// }

/*
17:54

(4 2)의 최소공배수는 4
4가 포함되니깐 *2

(3 4 2 12 6 8)의 최소공배수는 24

최소공배수 구하고 주어진 수에 포함되는지 봐서 2 곱할지말지 결정
최소공배수 어떻게 구하냐? 두 수의 최대공약수 구하고, 두 수의 곱 / 최대공약수
최대공약수 어떻게 구하냐?
4,2
2,0
-> 2

4*2/2

-> 실패. 왜지?
-> 그냥 주어진 약수 중에서 가장 작은 수와 가장 큰 수를 곱하면 N을 구할 수 있다고 함
그러고보니 그러네..
*/