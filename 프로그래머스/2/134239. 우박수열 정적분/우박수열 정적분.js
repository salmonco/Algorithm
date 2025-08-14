function solution(k, ranges) {
    const { cnt, seq } = getWoobak(k)

    return ranges.map((arr) => {
        const range = getXaxisRange(arr, cnt)
        // console.log({range, cnt})
        const [s, e] = range
        if (s > e) {
            return -1
        }
        return getArea(s, e, seq)
    })
}

const getWoobak = (num) => {
    let n = num
    let cnt = 0
    const seq = {}
    while (true) {
        seq[cnt] = n
        if (n === 1) {
            return { cnt, seq }
        }
        if (n % 2 === 0) {
            n /= 2
        } else {
            n *= 3
            n += 1
        }
        cnt += 1
    }
}

const getXaxisRange = (arr, n) => {
    const [a, b] = arr
    return [a, n+b]
}

const getArea = (s, e, seq) => {
    let sum = 0
    for (let i = s; i < e; i++) {
        const [cs, ce] = [i, i+1]
        const sy = seq[cs]
        const ey = seq[ce]
        const xLen = ce-cs
        const nemoYLen = Math.min(sy, ey)
        const semoYLen = sy > ey ? sy-ey : ey-sy
        const nemo = xLen*nemoYLen
        const semo = xLen*semoYLen/2
        sum += nemo+semo
    }
    return sum
}

/*
우박수열 횟수 구하기

x축 범위 구하기

영역 넓이 구하기
네모 + 세모

[0, 4]
0~1
1~2
2~3
3~4
*/