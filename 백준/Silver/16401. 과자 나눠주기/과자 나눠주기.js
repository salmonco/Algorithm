const input = require('fs')
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n').map((v) => v.split(' ').map(Number))
const [M, N] = input[0]
const arr = input[1]

const sortedArr = [...arr].sort((a, b) => a - b)
let left = 1
let right = sortedArr[arr.length-1]
let ans = 0
while (left <= right) {
    const mid = Math.floor((left+right)/2)
    const cnt = arr.reduce((acc, cur) => acc + Math.floor(cur/mid), 0)
    // console.log({left, right, mid, cnt})
    if (cnt >= M) {
        ans = mid
        left = mid+1
    } else {
        right = mid-1
    }
}
console.log(ans)

/*
과자 길이 10^9

문제 이해가 잘 안 간다.
다른사람 풀이 보니
min~max 사이 mid 잡고 개수가 조카 수만큼 나오는지 확인
*/