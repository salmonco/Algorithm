const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
const arr1 = input[0].split('')
const arr2 = input[1].split('')
const arr1Len = arr1.length
const arr2Len = arr2.length
const dp = Array.from({ length: arr1Len+1 }, () => Array.from({ length: arr2Len+1 }, () => 0))
for (let i = 1; i <= arr1Len; i++) {
    for (let j = 1; j <= arr2Len; j++) {
        if (arr1[i-1] === arr2[j-1]) {
            dp[i][j] = dp[i-1][j-1]+1
        } else {
            dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1])
        }
    }
}
// console.log(dp)
const ans = []
let r = arr1Len
let c = arr2Len
while (r > 0 && c > 0) {
    // console.log(r, c, ans)
    if (dp[r][c] === dp[r-1][c]) {
        r--
    } else if (dp[r][c] === dp[r][c-1]) {
        c--
    } else {
        ans.push(arr1[r-1]) // arr1의 유효한 값의 인덱스는 0부터 시작, dp는 1부터 시작
        r--
        c--
    }
}
ans.reverse()
console.log(dp[arr1Len][arr2Len])
console.log(ans.join(''))

/*
저번에 풀었을 때 dp였던 것 같은데.
점화식 뭐였지? 찾아보자

개수 구하는 거까진 됐는데, 어떻게 트래킹하지?
parent 저장 -> 못하겠음

다른사람풀이: https://m.blog.naver.com/dlaxodud2388/222731687690
이후 문자열이 무엇인지는 오른쪽 하단부터 탐색하기 시작한다.
dy[col][row] === dy[col - 1][row]일경우 col을 -- 해주고, 
dy[col][row] === dy[col][row - 1] 일경우 row를 -- 해준다. 둘 다 아니라면 col과 row를 모두 --하여 좌표를 계속해서 이동한다.
둘 다 아닌 경우에서 문자를 추가해주면 LCS를 출력할 수 있다.
*/
