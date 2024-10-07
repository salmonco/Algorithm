const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n").map((v) => v.split('').map(Number))
const map = input
const N = 9

const print = (map) => {
    console.log(map.map((v) => v.join('')).join('\n'))
}

const isValidNum = (r, c, map, n) => {
    for (let i = 0; i < N; i++) {
        if (map[r][i] === n) return false
    }
    for (let i = 0; i < N; i++) {
        if (map[i][c] === n) return false
    }
    const startR = Math.floor(r/3)*3
    const startC = Math.floor(c/3)*3
    for (let i = startR; i < startR+3; i++) {
        for (let j = startC; j < startC+3; j++) {
            if (map[i][j] === n) return false
        }
    }
    return true
}

let isFin = false
const dfs = (map, blank) => {
    if (blank === 0) {
        print(map)
        isFin = true
        return
    }
    if (isFin) return
    
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            if (map[i][j] !== 0) continue
            for (let k = 1; k <= N; k++) {
                if (isValidNum(i, j, map, k)) {
                    map[i][j] = k
                    dfs(map, blank-1)
                    map[i][j] = 0
                }
                if (k === N) return // 이거 안 하면 Time Limit Exceeded
            }
        }
    }
}

const getBlankCnt = () => {
    let blank = 0
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            if (map[i][j] === 0) {
                blank++
            }
        }
    }
    return blank
}

dfs(map, getBlankCnt())

/*
10:34

8 -> 2,2
그리디가 안 됨. 가능한 숫자 다 넣어보기

처음시도: 1부터 9까지 넣을 수 있는 숫자 배열 받아서 하나씩 넣어보며 dfs -> Time Limit Exceeded

다른사람풀이: 넣을 수 있는 숫자 배열을 받는 거 대신, 걍 1부터 9까지 돌면서 그 숫자를 넣을 수 있는지 체크
https://jaekwan.tistory.com/162
*/
