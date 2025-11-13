const input = require('fs')
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n').map((v) => v.split(' ').map(Number))
const [N, S] = input[0]
const seq = input[1]

const allSubSeq = []

const dfs = (arr, visited, startIdx) => {
    if (arr.length > 0) {
        allSubSeq.push(arr)
    }
    for (let i = startIdx; i < N; i++) {
        if (visited[i]) {
            continue
        }
        visited[i] = true
        dfs([...arr, seq[i]], visited, i+1)
        visited[i] = false
    }
}
dfs([], {}, 0)
// console.log({allSubSeq})
const sum = allSubSeq.map((arr) => arr.reduce((acc, cur) => acc + cur, 0))
const equalCnt = sum.filter((v) => v === S).length
console.log(equalCnt)

/*
x + y + ... = S

완탐으로 하면? n*(n-1)*(n-2)*...*1 = n^n ? 시간초과날듯

1~n 개의 수를 더한다고 치면,
x = S
x + y = S
x + y + z = S
...
이런식으로.

n* ?
x + y +... = S - z - t
이러면 10^8까지는 줄일 수 있음
둘이 비교할 때 이분탐색 돌리면 될듯?
ㄱㄱ? 음 근데 10^8개 경우의 수 만들어내는 게 어렵네.

다른사람 풀이 보고 접근 맞는지 확인
어떤사람은 dfs 완탐으로 모든 부분수열 만들어내서 풀었는데 시간 괜찮은 건가?
이분탐색 문제집에 들어가있었는데 걍 완탐으로 풀 수 있는 문제네

지피티한테 물어보니깐
N ≤ 20 이라서 완전 탐색(2^20 = 1,048,576)도 가능하지만,
조금 더 효율적으로는 meet in the middle을 쓰면 깔끔하게 해결돼요.
Meet in the Middle + 이분탐색 접근으로도 풀 수 있대

왜 완탐이 2^n 이냐?
가능한 부분수열(부분집합)의 개수
각 원소에 대해 두 가지 선택이 있어요:
포함한다, 포함하지 않는다
따라서 전체 가능한 조합(부분집합)의 개수는: 2^n

아하 이분탐색으로 할 거면 meet in the middle 접근을 써야 하는구나
그래서 이전 문제에서 x + y = k - z 로 풀었던 거구나
근데 이 문제에서 이분탐색으로 풀기 좀 복잡하니깐 완탐으로 가야겠다
*/