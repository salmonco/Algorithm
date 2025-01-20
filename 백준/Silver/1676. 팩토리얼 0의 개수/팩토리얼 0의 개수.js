const input = require('fs')
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n').map(Number)
const N = input[0]
const dp = [1n, 1n, 2n]

for (let i = 3; i <= N; i++) {
    dp[i] = BigInt(i) * dp[i-1]
}
// console.log(dp)
const num = dp[N]
const arr = [...String(num)]
let cnt = 0
while (arr.length > 0) {
    const last = arr.pop()
    if (last !== '0') break
    cnt++
}
console.log(cnt)

/*
9:49

2초. 500

팩토리얼 구하고, 문자열로 바꿔서 뒤에서부터 스캔?
-> 실패. 왜?
N에 500 넣으니 Infinity가 출력됨. BigInt 써야 하나?
js는 -(2^53 -1) 와 2^53 -1 사이의 숫자값을 표현할 수 있기 때문에 이 범위의 값이 아니게 되면 Infinity로 표현이 된다고 함.

-> 런타임에러 (StackSizeExceeded). 왜?
팩토리얼 구할 때 스택크기 초과하는 거 같은데
중복되는 거 저장해놓을 수 없나?
9! = 9*8*7*6* 5!

1!
2! = 2* 1!
3! = 3* 2!
4! = 4* 3!
...
n! = n* (n-1)!

-> 95% 실패. 왜지.
문자열말고 배열로 해야 하나 -> 그래도 안 됨
다른사람풀이보니 뒤에서부터 스캔 대신 배열 pop으로 했네. 뭐가 다른 거지 -> 그래도 안 됨
N이 배열의 인덱스로 사용되니 BigInt 말고 넘버로 해야 할 듯 -> 그래도 안 됨
반례: N=0
0! = 1 이라 답은 0이 나와야 하는데 1이 출력됨

규칙 찾는 방법으로 5로 나눠서 0의 개수 구하는 방법도 있음

*/