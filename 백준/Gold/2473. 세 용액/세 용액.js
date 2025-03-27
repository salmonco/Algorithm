const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(' ').map(Number))
const [N] = input[0]
const arr = input[1]
arr.sort((a, b) => a - b)

let min = Infinity
let ans = ''
for (let i = 0; i < arr.length; i++) {
    const val = arr[i]
    let left = i+1
    let right = arr.length-1
    while (left < right) {
        // console.log({val, min, ans, left, right, l: arr[left], r: arr[right]})
        const sum = val + arr[left] + arr[right]
        if (sum === 0) {
            console.log(`${val} ${arr[left]} ${arr[right]}`)
            return
        }
        const abs = Math.abs(sum)
        if (abs < min) {
            ans = `${val} ${arr[left]} ${arr[right]}`
            min = abs
        }
        if (left === right-1) {
            break
        }
        if (sum < 0) {
            left++
        } else {
            right--
        }
    }
}
console.log(ans)

/*
8:51

1초. N은 3 이상 5,000 이하의 정수
세 가지 용액 섞어 특성값이 0에 가장 가까운 용액 찾기

-97 -6 -2 6 98
세 가지 가능한 조합을 찾기 위해 브루트포스 돌리면 시간초과 예상. 10^9 넘어서.

투포인터를 생각. 근데 세 가지 조합이야. 쓰리포인터?
근데 차피 정렬하고 젤 처음 거랑 젤 마지막 거부터 좁혀가는 게 0에 가장 가까운 경우의 수라는 보장이 없잖아.

음 근데 다른 방법이 생각이 안 나.
다른사람풀이 보니 투포인터 썼는데.
좁혀가서 0에 가장 가까운 수를 찾을 수 있구나.

근데 세 가지 용액이야.
다른사람풀이 보니 1개를 고정시키고 (idex: i)
i+1 ~ N-1 구간에서 투포인터 돌렸대. 오호..


*/