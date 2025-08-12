function solution(board) {
    if (checkIsEmpty(board)) {
        return 1
    }
    
    const oCount = getCount(board, 'O')
    const xCount = getCount(board, 'X')
    // console.log({oCount, xCount})
    if (checkIsBingo(board, 'O')) {
        if (checkIsBingo(board, 'X')) {
            return 0
        }
        return oCount === xCount + 1 ? 1 : 0
    }
    
    if (checkIsBingo(board, 'X')) {
        return oCount === xCount ? 1 : 0
    }
    
    return oCount === xCount || oCount === xCount + 1 ? 1 : 0
}

const checkIsEmpty = (board) => {
    return [...board.join('')].every((v) => v === '.')
}

const checkIsBingo = (board, target) => {
    for (let i = 0; i < 3; i++) {
        const isRowBingo = [...board[i]].every((v) => v === target)
        const isColumnBingo = [board[0][i], board[1][i], board[2][i]].every((v) => v === target)
        // console.log({isRowBingo, isColumnBingo})
        if (isRowBingo || isColumnBingo) {
            return true
        }
    }
    const isLeftDiagonalBingo = [board[0][0], board[1][1], board[2][2]].every((v) => v === target)
    const isRightDiagonalBingo = [board[0][2], board[1][1], board[2][0]].every((v) => v === target)
    // console.log({isLeftDiagonalBingo, isRightDiagonalBingo})
    if (isLeftDiagonalBingo || isRightDiagonalBingo) {
        return true
    }
    return false
}

const getCount = (board, target) => {
    return [...board.join('')].filter((v) => v === target).length
}

/*
O 부터 시작.

경우의수 따져봐야할듯

빙고가 안 나온 경우 -> O 개수 = X 개수 or X 개수 + 1

O 빙고 -> O 개수 = X 개수 + 1
X 빙고 -> O 개수 = X 개수

빈 게임판 -> 가능

테케 53, 54 실패
엣지케이스가 뭘까.

질문하기 게시판에서 반례 찾음
["XXX",
 "XOO",
 "OOO"]
["XXX",
 "X..",
 "OOO"]
둘 다 빙고면 게임판이 다 채워질 수는 없는 듯.
*/