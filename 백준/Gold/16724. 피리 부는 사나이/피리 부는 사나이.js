const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
const [N, M] = input[0].split(' ').map(Number)
const map = input.slice(1).map((v) => v.split(''))
// console.log(N, M, map)

const pos = {
    D: [1, 0],
    U: [-1, 0],
    L: [0, -1],
    R: [0, 1]
}

// 0: 미방문, 1: 방문중, 2: 사이클 확정
const visited = Array.from({ length: N }, () => Array.from({ length: M }, () => 0))

let cnt = 0

const dfs = (cr, cc) => {
    // console.log({cr, cc})
    if (visited[cr][cc] === 1) {
        // console.log(cr, cc, num, visited)
        // 사이클 발견
        cnt++
        return 2 // 사이클 확정
    }
    
    if (visited[cr][cc] === 2) {
        return 2; // 이미 사이클 처리된 경로
    }

    visited[cr][cc] = 1; // 방문중 표시
    // console.log({cr, cc, map: map[cr][cc]})
    const [r, c] = pos[map[cr][cc]]
    const [nr, nc] = [r+cr, c+cc]
    // 지도 밖으로 나가는 방향의 입력은 주어지지 않는다.
    const result = dfs(nr, nc);

    visited[cr][cc] = 2; // 이 경로는 더 이상 처리할 필요 없음
    return result
}

for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
        if (visited[i][j] !== 0) {
            continue
        }
        dfs(i, j)
    }
}
// console.log(visited)
// console.log([...new Set(visited.flat())].length)
console.log(cnt)

/*
21:49

1초. N, M 최대 10^3
세이프존의 최소 개수 구하기

걍 dfs나 bfs 돌려서 1로 채우고 2로 채워서
더이상 못 갈 때마다 num++ 해서 num 수 구하면 될 거 같은데.

-> 실패. 왜?
반례가 있을 거 같은데.

DLLL
DLLU
RRRU
해도 2가 나옴. 답은 1인데.

이전 걸로 덮어씌워져. 젤 간단한 걍 매 dfs 돌려서 값 채울 때마다 최소값 구하면 되는데.
-> 메모리 초과

다른방법? 만약 7로 갔는데 12에 도착해. 그럼 둘을 쌍으로 저장해둬. 7과 12는 같은 영역이다.
음...이걸 또 나중에 이어주는 작업이 골치아플 거 같아.

일단 visited 체크된 곳은 dfs 안 돌아도 됨
-> 그래도 메모리 초과

다른사람풀이 보니...
- visited 값을 boolean 대신 0(방문 안함), 1(방문중), 2(사이클 확정됨) 같은 숫자로 관리해서 메모리 절약
- DFS 도중 이미 방문한 곳에 도달했을 때, 그게 1이면 사이클 발생, 2면 이미 확인된 경로이므로 무시
- DFS 함수 자체는 사이클 여부만 리턴하고, 세이프존 개수를 세기
*/