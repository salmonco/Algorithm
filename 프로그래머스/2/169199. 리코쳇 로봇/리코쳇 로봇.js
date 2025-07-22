function solution(board) {
    const parsedBoard = board.map((v) => [...v])
    const R = parsedBoard.length
    const C = parsedBoard[0].length
    const startPos = getStartPos(parsedBoard, R, C)
    const cnt = getCnt(startPos, parsedBoard, R, C)
    // console.log({R, C, startPos})
    return cnt
}

const getStartPos = (board, R, C) => {
    for (let i = 0; i < R; i++) {
        for (let j = 0; j < C; j++) {
            if (board[i][j] === 'R') {
                return [i, j]
            }
        }
    }
    return null
}

const getCnt = (startPos, board, R, C) => {
    const queue = [[...startPos, 0]]
    const visited = Array.from({ length: R }, () => Array.from({ length: C }, () => Infinity)) // cnt 겸용
    const dr = [0, 1, -1, 0]
    const dc = [1, 0, 0, -1]
    let head = 0
    visited[startPos[0]][startPos[1]] = 0
    
    while (queue.length > head) {
        const [cr, cc, ccnt] = queue[head++]
        // console.log({cr, cc, ccnt})
        if (board[cr][cc] === 'G') {
            return ccnt
        }
        
        for (let i = 0; i < dr.length; i++) {
            // 쭉 이동
            let [r, c] = [cr, cc]
            let [tr, tc] = [cr, cc]
            while (true) {
                const [nr, nc] = [dr[i]+r, dc[i]+c]
                if (isOut(nr, nc, R, C)) {
                    ([tr, tc] = [r, c]);
                    break
                }
                if (board[nr][nc] === 'D') {
                    ([tr, tc] = [r, c]);
                    break
                }
                ([r, c] = [nr, nc]);
            }
            if (ccnt+1 >= visited[tr][tc]) {
                continue
            }
            // console.log({tr, tc})
            visited[tr][tc] = ccnt+1
            queue.push([tr, tc, ccnt+1])
        }
    }
    return -1
}

const isOut = (r, c, R, C) =>  r < 0 || r >= R || c < 0 || c >= C

/*
23:00

dfs나 bfs 돌리면 될 듯.
최소 이동횟수니깐 bfs가면 될 듯.

음..근데 틀림. 문제 이해를 잘 못 했음.
게임 이해부터 이해 함..
갈 수 있는 방향으로 쭉 가는 거임. 근데 어느 방향으로 턴 할지는 몰겠음.
가능한 모든 방향으로 턴해보기. 아직 방문 안 한 거라면.

장애물이 나올 때까지 그 방향으로 이동하기

visited 체크 안 해야 할 듯..? 왜냐면 경로가 겹칠 수도..
도착지점에만 visited 체크해도 될 듯

0,6 - 0
1,6 - 1
1,2 - 2
0,2 - 3
0,0 - 4
2,0 - 5
2,3 - 6
1,3 - 7

테케 8, 24, 25, 28 틀림
반례 질문게시판에서 찾음
"..R"
"..."
"..."
"..D"
"DG."

0,2 - 0
0,0 - 1
3,0 - 2
3,1 - 3
4,1 - 4

visited 인데 카운트 적으면 큐에 넣기
visited 체크하는데 한 phase 내에서는 카운트 없이 방문체크 해야 함
다른 phase 로 넘어가면 카운트 보고 체크

답이 -1 인 경우 (목표위치 도달 못하는 경우)에 무한루프에 빠지는 문제

부딪혀서 방향전환할 때마다 다른 phase 가 생겨나는 듯
어디서부터 온건지가 다르니깐. 레퍼러를 보고 visited 체크하는건?
cnt 를 저장하나 레퍼러를 저장하나 똑같이 무한루프.

아, visited 를 걍 최대 cnt 로 저장해놓고 최소 cnt 인 경우에만 큐에 넣으면?
*/