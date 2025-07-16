function solution(n, w, num) {
    const numDir = Math.floor((num-1) / w) % 2 === 0 ? 'left' : 'right'
    const topDir = Math.floor((n-1) / w) % 2 === 0 ? 'left' : 'right'
    const rLen = Math.floor(n / w) + (n % w > 0 ? 1 : 0)
    const { cs, ce } = getTopRange(n, w, topDir)
    const { row, col } = getPos(num, w, rLen, numDir)
    const boxCnt = calculateBoxCnt(row, col, cs, ce, n, w)
    // console.log({numDir, topDir, cs, ce, rLen, row, col})
    return boxCnt
}

const getTopRange = (n, w, topDir) => {
    const cs = topDir === 'left' ? 0 : w - (n % w)
    const ce = topDir === 'left' ? n % w - 1 : w-1
    return { cs, ce }
}

const getPos = (num, w, rLen, numDir) => {
    const remainder = num % w
    const quotient = Math.floor(num / w)
    
    if (remainder === 0) {
        const row = rLen - quotient
        const col = (numDir === 'left' ? w-1 : 0)
        return { row, col }
    }
    
    const row = rLen - (quotient+1)
    const col = (numDir === 'left' ? remainder-1 : w-remainder)
    return { row, col }
}

const calculateBoxCnt = (r, c, cs, ce, n, w) => {
    if (n % w === 0) {
        return r + 1
    }
    if (c >= cs && c <= ce) {
        return r + 1
    }
    return r
}

/*
02:59

시간복잡도가... 레벨1은 원래 안 나와있는 건가.
상자 몇 개 꺼내야 하는지.

n=22, w=6
3, 4
1~2 -> 3
11~12 -> 2
13~14 -> 1

6-2 + 6-2+1

_ _ 4 3 2 1
1 2 3 4 5 0
0 5 4 3 2 1
1 2 3 4 5 0

4개의 행 (row length 4), 젤 윗 행은 오른쪽부터 상자 4열까지 있음 (col 2~5)

배열의 위치가 어딘지 알면, 상자 꺼내야 하는 개수 알 수 있지 않을까?
밑에서부터 2행 (row 2), 오른쪽부터 2열 (col 4). -> 4-2 - (col 4가 2~5 사이라서 1 안 빼줘도 됨) + 1 (찾으려는 상자)

배열의 위치가 어딘지 어떻게 알 수 있을까?
1 -> row 3, col 0
몫 0, 나머지 1 -> 밑에서부터 1행, 왼쪽부터 1열 (row 4-1, col 1-1)

2 -> row 3, col 0
몫 0, 나머지 2 -> 밑에서부터 1행, 왼쪽부터 2열

6 -> row 3, col 5
몫 1, 나머지 0 -> 밑에서부터 1행, 왼쪽부터 6열

7 -> row 2, col 5
몫 1, 나머지 1 -> 밑에서부터 2행, 오른쪽부터 1열

8 -> row 2, col 4
6으로 나누면 몫 1, 나머지 2 -> 밑에서부터 2행, 오른쪽부터 2열 (row 4-2, col 6-2)

12 -> row 2, col 0
몫 2, 나머지 0 -> 밑에서부터 2행, 오른쪽부터 6열

13 -> row 1, col 0
몫 2, 나머지 1 -> 밑에서부터 3행, 왼쪽부터 1열

18 -> row 1, col 5
몫 3, 나머지 0 -> 밑에서부터 3행, 왼쪽부터 6열

19 -> row 0, col 5
몫 3, 나머지 1 -> 밑에서부터 4행, 오른쪽부터 1열

나머지가 0이면 -> 몫은 몫-1, 나머지는 총col

row = 총row - (몫+1)
col =
  오른쪽이면 -> 총col - 나머지
  왼쪽이면 -> 나머지-1

테케 1~10 싹다 틀림.. 왜지?

4 3
1 2
n % w === 0 이면 박스개수 구할 때 마이너스 해줄 필요 없을 듯
*/