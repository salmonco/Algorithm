const input = require('fs')
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n')
const PAY = +input[0]
const INIT = 1000
const candidates = [500, 100, 50, 10, 5, 1]
let idx = 0
let remain  = INIT-PAY
let ans = 0
while (remain > 0) {
    const money = candidates[idx]
    const div = Math.floor(remain / money)
    if (div === 0) {
        idx++
        continue
    }
    ans += div
    remain -= money * div
    idx++
}
console.log(ans)

/*
17:32

1000-380
= 620
500 * 1
-> 120 남음
100 * 1
-> 20 남음
10 * 2

가장 큰 돈부터 낼 수 있는지 확인
*/