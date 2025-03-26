const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(' ').map(Number))
const seq = input[0].slice(0, -1)
const MAX_POS_SIZE = 5
const dp = Array.from({ length: seq.length+1 }, () => Array.from({ length: MAX_POS_SIZE }, () => Array.from({ length: MAX_POS_SIZE }, () => Infinity)))
dp[0][0][0] = 0

const getCost = (pos, target) => {
    if (pos === target) return 1
    if (target === 0 || pos === 0) return 2
    if (Math.abs(pos - target) === 2) return 4
    return 3
}

for (let i = 0; i < seq.length; i++) {
    const next = seq[i]
    for (let l = 0; l < MAX_POS_SIZE; l++) {
        for (let r = 0; r < MAX_POS_SIZE; r++) {
            if (dp[i][l][r] === Infinity) continue
            // 왼발 이동
            dp[i+1][next][r] = Math.min(dp[i+1][next][r], dp[i][l][r] + getCost(l, next))
            // 오른발 이동
            dp[i+1][l][next] = Math.min(dp[i+1][l][next], dp[i][l][r] + getCost(r, next))
        }
    }
}

let ans = Infinity
 for (let l = 0; l < MAX_POS_SIZE; l++) {
    for (let r = 0; r < MAX_POS_SIZE; r++) {
        ans = Math.min(ans, dp[seq.length][l][r])
    }
 }

// console.log(dp)
console.log(ans)

/*
9:02

2초. 

현재 두 발의 위치를 계속 트래킹해야 함
두 발 중 다음 위치에서 가장 가까운 걸 찾아야 함. 그리고 그 발을 움직여야 함.
최소의 노력을 들이기 위해선 그리디로 가야 함

현재 위치와 다음 위치 사이 거리 구하는 함수
(0,0) - (0,1) (1,0) (0,-1) (-1,0) -> 2 -> 거리: 1
(0,1) - (1,0) (-1,0) -> 3 -> 거리: 루트2
(0,1) - (0,-1) -> 4 -> 거리: 2

-> 실패. 왜?
gpt 한테 물어보니 그리디가 최적이 아닐 수 있대. 반례가 뭐지?
반례 찾고 dp로 시도하기

반례: 1 2 3 2 1 3 0
1 1 루트2 루트2 (루트2) 0
그러네.. 두 발 다 같은 거린데 두 발 중 어느 발을 움직이느냐 따라서도 결과가 달라지네
-> 그리디 가설 철회

이게 어떻게 dp까지 생각이 발전할 수 있었지?
아님 가능한 알고리즘을 대입하다가 생각해낸 것일까?

dp[i][l][r]: i번째 수까지 진행했을 때, 왼발(l)과 오른발(r)의 위치일 때의 최소 힘.
왼발을 선택하는 경우와 오른발을 선택하는 경우 중 최소값을 저장하면 됨.

*/