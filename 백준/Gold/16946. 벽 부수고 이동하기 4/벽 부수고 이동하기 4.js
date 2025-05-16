const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
const [N, M] = input[0].split(' ').map(Number)
const map = input.slice(1).map((arr) => arr.split('').map(Number))
const markedMap = JSON.parse(JSON.stringify(map))
const MOD = 10

const dr = [-1, 1, 0, 0]
const dc = [0, 0, -1, 1]

const isOut = (r, c) => r < 0 || r >= N || c < 0 || c >= M

let visited = Array.from({ length: N }, () => Array.from({ length: M }, () => false))

const cnts = {}

const mark = (r, c, n) => {
    // console.log({r, c, num})
    if (map[r][c] === 1) {
        return
    }
    markedMap[r][c] = n
    cnts[n] = cnts[n] + 1 || 1
    for (let i = 0; i < dr.length; i++) {
        const [nr, nc] = [r+dr[i], c+dc[i]]
        if (isOut(nr, nc) || visited[nr][nc]) {
            continue
        }
        visited[nr][nc] = true
        mark(nr, nc, n)
    }
}

let num = 2
for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
        if (map[i][j] === 1 || visited[i][j]) {
            continue
        }
        visited[i][j] = true
        mark(i, j, num)
        num += 1
    }
}
// console.log({markedMap, cnts})

const getSum = (r, c) => {
    const set = new Set()
    for (let i = 0; i < dr.length; i++) {
        const [nr, nc] = [r+dr[i], c+dc[i]]
        if (isOut(nr, nc) || markedMap[nr][nc] <= 1) {
            continue
        }
        set.add(markedMap[nr][nc])
    }
    return [...set].reduce((acc, cur) => acc + cnts[cur], 0) + 1
}

for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
        if (map[i][j] !== 1) {
            continue
        }
        const sum = getSum(i, j) % MOD
        map[i][j] = sum
    }
}

console.log(map.map((arr) => arr.join('')).join('\n'))

/*
23:25

2초. 10^3

자신도 이동할 수 있는 곳에 포함이 되나 봄.

브루트포스로 0의 개수 찾으면 안 되나?
시간을 어케 계산하지.. 가거나 안 가거나. 총 면적 10^6. 그럼 2^(10^6)? 에반데.. 이게 맞는 계산법인가?
그게 아니라면 다른 방법을 떠올려야 함
근데 잘 생각이 안 남.. 그래서 계산이 틀렸다고 가정하고 걍 진행해야 하나..

dfs 풀이 시간초과..
음....
어떻게 최적화하지?
bfs로 한다고 시간적인 면에서 달라질 게 있을까?
아님 더 효율적인 풀이가 있나?


다른사람풀이 보니, bfs로 하면 시간산정을 (NM)^2 로 해서 시간초과래.
어떻게 (NM)^2 로 계산한 거지?
gpt한테 물어보니, 모든 칸마다 bfs수행한다고 생각하면
총 NM번 bfs돌리는데 각 bfs가 O(NM)라서 총 시간복잡도를 O(NM*NM)=O((NM)^2)로 계산했대.

-> 벽마다 bfs 돌리면 시간초과
-> 인접한 0끼리 묶어서 마킹하는 dfs를 한 번 실행하고, 마킹한 맵을 이용해서 벽마다 상하좌우값을 중복없이 카운트
일단 접근은 알겠음. 0 묶음마다 먼저 카운트 세놓고, 벽마다 0 묶음의 개수를 카운팅하면 될 듯.

11001
00111
01010
10101
여기서 0 묶음에 번호를 2부터 매기면 아래처럼 됨
11221
33111
31415
16171

*/