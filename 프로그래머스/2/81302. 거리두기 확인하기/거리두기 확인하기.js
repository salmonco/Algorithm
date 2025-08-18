const dr = [0, 0, -1, 1]
const dc = [-1, 1, 0, 0]

function solution(places) {
    const ans = []
    places.forEach((board) => {
        const target = []
        board.forEach((v, i) => {
            const arr = [...v]
            arr.forEach((a, j) => {
                if (a === 'P') {
                    target.push([i, j])
                }
            })
        })
        // console.log({target})
        let out = false
        for (const [r, c] of target) {
            const queue = [[r, c, 0]]
            const visited = Array.from({ length: 5 }, () => Array.from({ length: 5 }, () => false))
            let head = 0
            visited[r][c] = true
            
            while (queue.length > head) {
                const [cr, cc, dist] = queue[head++]
                if (dist === 2) {
                    continue
                }
                for (let i = 0; i < dr.length; i++) {
                    const [nr, nc] = [dr[i]+cr, dc[i]+cc]
                    // console.log({cr, cc, nr, nc, dist})
                    if (isOut(nr, nc) || visited[nr][nc]) {
                        continue
                    }
                    if (board[nr][nc] === 'X') {
                        continue
                    }
                    if (board[nr][nc] === 'P') {
                        out = true
                        break
                    }
                    queue.push([nr, nc, dist+1])
                }
            }
            if (out) {
                break  
            }
        }
        if (out) {
            ans.push(0)
        } else {
            ans.push(1)
        }
    })
    return ans
}

const isOut = (r, c) => r < 0 || r >= 5 || c < 0 || c >= 5

/*
맨해튼 거리 구하기

P 위치 조합 구하기

걍 모든 P 위치에서 상하좌우로 bfs 돌려서 길이 2 이하에서 만나는 P 있는지 보면 되는 거 아닌가.
시간복잡도 괜찮나?
*/