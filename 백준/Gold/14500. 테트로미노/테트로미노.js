const input = require('fs')
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n').map((v) => v.split(' ').map(Number))
const [N, M] = input[0]
const map = input.slice(1)
// const candidates = [
//     [[0, 0], [0, 1], [0, 2], [0, 3]], // 가로
//     [[0, 0], [1, 0], [2, 0], [3, 0]], // 세로
//     [[0, 0], [0, 1], [1, 0], [1, 1]], // 네모
//     [[0, 0], [1, 0], [2, 0], [2, 1]], // L
//     [[0, 0], [1, 0], [2, 0], [2, -1]], // _ㅣ
//     [[0, 0], [1, 0], [2, 0], [0, 1]], // ㅣ'-
//     [[0, 0], [0, 1], [1, 1], [2, 1]], // ㄱ
//     [[0, 0], [1, 0], [1, 1], [2, 1]],
//     [[0, 0], [0, 1], [0, 2], [1, 1]]
// ]
const dr = [-1, 0, 1, 0]
const dc = [0, 1, 0, -1]
const SIZE = 4
let ans = 0
const visited = Array.from({ length: N }, () => Array.from({ length: M }, () => false))

const isOut = (r, c) => r < 0 || r >= N || c < 0 || c >= M

const ddr = [
  [0, 0, 0, 1],
  [0, 1, 2, 1],
  [0, 0, 0, -1],
  [0, -1, 0, 1],
]
const ddc = [
  [0, 1, 2, 1],
  [0, 0, 0, 1],
  [0, 1, 2, 1],
  [0, 1, 1, 1],
]

const checkBrute = (r, c) => {
    for (let i = 0; i < ddr.length; i++) {
        let sum = 0
        let canPatch = true
        for (let j = 0; j < ddr[0].length; j++) {
            const [nr, nc] = [r+ddr[i][j], c+ddc[i][j]]
            if (isOut(nr, nc)) {
                canPatch = false
                break
            }
            sum += map[nr][nc]
        }
        if (canPatch) {
            ans = Math.max(ans, sum)
        }
    }
}

const dfs = (r, c, cnt, depth) => {
    // console.log({r, c, cnt, visited, depth})
    if (depth === SIZE) {
        ans = Math.max(ans, cnt)
        return
    }
    for (let i = 0; i < dr.length; i++) {
        const [nr, nc] = [r+dr[i], c+dc[i]]
        if (isOut(nr, nc) || visited[nr][nc]) continue
        const newCnt = cnt + map[nr][nc]
        visited[nr][nc] = true
        dfs(nr, nc, newCnt, depth+1)
        visited[nr][nc] = false
    }
}

for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
        // console.log('start------')
        const cnt = map[i][j]
        visited[i][j] = true
        dfs(i, j, cnt, 1)
        visited[i][j] = false
        checkBrute(i, j)
    }
}

console.log(ans)


/*
11:34

2초. 회전,대칭 가능

가능한 경우의 수 다 붙여봐야 할 듯.

테트로미노를 여러 개 놓을 수 있는 게 아니라, 하나를 놓는 거였음
붙일 수 있는 가능한 경우의 수 후보를 만들어놓고 붙여보기 -> 회전,대칭 포함하면 경우의 수가 생각보다 많아서 복잡..
걍 변에 연속된 거를 다 붙여봐서 연속된 게 4개가 되면 그때 비교해서 stop하면 될 듯?
변에 연속된 거 상하좌우 4가지 경우의 수.

ㅏ ㅗ ㅜ ㅓ -> 이 경우를 포함 못하는 문제.
만약 --- ㅣ 이라면 중앙 거를 기준으로도 탐색할 수 있게 해줘야 할 듯?
그럴려면 지난 방문한 위치를 저장해놔야 함
음..시도해봤는데 뭔가 꼬임. 연속이 아니라 갑자기 점프함. 뭐가 문제지...

큐에 담아야 하나.... 방문한 위취를 배열에 담고 각 위치에 대해서 탐색
-> 시간초과
지나온 위치에 대해 모두 탐색하니 중복이 너무 발생함..

다른사람풀이보니, ㅏ 이런 경우는 브루트포스로, 나머지 경우는 dfs씀
*/