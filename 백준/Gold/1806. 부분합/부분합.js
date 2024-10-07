const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n").map((v) => v.split(' ').map(Number))
const [N, S] = input[0]
const seq = input[1]

let left = 0
let right = 0
let sum = seq[0]
let ans = Infinity
while (left <= right && right < N) {
    // console.log(left, right, sum)
    if (sum < S) {
        right++
        sum += seq[right]
    } else {
        ans = Math.min(ans, right-left+1)
        sum -= seq[left]
        left++
    }
}
console.log(ans === Infinity ? 0 : ans)

/*
10:06

1 2 3 4 5 5 7 8 9 10
정렬하고 젤 큰 것부터 더해가면 안되나? 그리디
    왜 틀렸지? 수열에서 연속된 수들의 부분합이었음
    정렬하면 연속된 수가 깨짐

부분수열의 처음과 끝을 가리키는 투포인터
https://tesseractjh.tistory.com/300
부분합의 시작점을 i, 끝을 j라고 할 때, 반복문을 통해 j를 증가시키면서 arr[j]를 sum에 누적한다. sum이 S 이상일 때 sum이 S 미만이 될 때까지 i를 증가시키면서 sum이 S 이상일 때의 길이(minLength)를 갱신
*/
