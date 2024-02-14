function solution(m, n, board) {
  // 1)
  board = board.map((v) => v.split(""));

  while (true) {
    const block = [];
    // 2)
    for (let i = 0; i < m - 1; i++) {
      for (let j = 0; j < n - 1; j++) {
        let c = board[i][j];

        if (
          c &&
          c === board[i][j + 1] &&
          c === board[i + 1][j] &&
          c === board[i + 1][j + 1]
        ) {
          block.push([i, j]);
        }
      }
    }
    // 종료 조건: 새로 찾은 블록이 더 이상 없을 때
    if (block.length === 0) break;
    // 3)
    block.forEach(([i, j]) => {
      board[i][j] = 0;
      board[i][j + 1] = 0;
      board[i + 1][j] = 0;
      board[i + 1][j + 1] = 0;
    });
    // 4)
    // 아래에서 위 확인. 위에서 아래 확인 시 이미 터진 블록의 아래에 블록이 있을 수 있음
    for (let j = 0; j < n; j++) {
      for (let i = m - 1; i > 0; i--) {
        // console.log(board[i][j])
        if (board[i][j] === 0) {
          for (let k = i - 1; k >= 0; k--) {
            if (board[k][j] !== 0) {
              board[i][j] = board[k][j];
              board[k][j] = 0;
              break;
            }
          }
        }
      }
    }
    // console.log(board)
  }

  // 5)
  let answer = 0;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (board[i][j] === 0) {
        answer++;
      }
    }
  }
  return answer;
}

/*
처음시도: board 돌면서 bfs. 해당 블록의 (하,우,하우) or (하,좌,하좌)가 같은 문자열인지 확인, 바로 마킹
-> 그냥 board 돌면서 (하,우,하우)가 같은 문자열인 블록 위치를 모두 알아내기
1. board를 2차원 배열로 만들어주기
2. 2*2 블록 찾기
3. 터뜨릴 블록 0으로 변경
4. 블록 내리기
5. 터진 블록 수 계산
*/
