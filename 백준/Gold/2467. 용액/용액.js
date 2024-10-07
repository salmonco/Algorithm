const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n").map((v) => v.split(' ').map(Number))
const [N] = input[0]
const arr = input[1]

let ans
let min = Infinity
let left = 0
let right = N-1
while (left < right) {
    const l = arr[left]
    const r = arr[right]
    const sum = l+r
    const abs = Math.abs(sum) 
    if (abs < min) {
        min = abs
        ans = l + ' ' + r
    }
    if (sum < 0) {
        left++
    } else if (sum > 0) {
        right--
    } else {
        break
    }
}
console.log(ans)

/*
9:02

브루트포스로 하면 10^5^2 시간초과

투포인터. 젤 첨이랑 젤 끝부터 시작해서 0보다 작으면 왼++
0보다 크면 오--
abs 최솟값 저장하기
왜 틀렸지? 0보다 큰지 작은지 볼 때 abs랑 비교하는 게 아닌, 실제 합이랑 비교하기
왜 틀렸지? right-- 여야 하는데 ++로 했음
왜 틀렸지? 종료조건을 left <= right로 했는데 left < right로 해야 함
*/
