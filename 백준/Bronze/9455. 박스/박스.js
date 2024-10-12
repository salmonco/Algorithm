const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n").map((v) => v.split(' ').map(Number))
const [T] = input[0]

let line = 1
for (let i = 0; i < T; i++) {
    const [M, N] = input[line++]
    const map = []
    for (let j = 0; j < M; j++) {
        const arr = input[line++]
        map[j] = arr
    }

    let empty
    let ans = 0
    for (let c = 0; c < N; c++) {
         empty = M-1
        for (let r = M-1; r >= 0; r--) {
            if (map[r][c] === 0) continue
            ans += empty - r
            empty--
        }
    }
    console.log(ans)
}

/*
-> 0
0
-> 1
1
2
[1]
-> 2
3
4
[1+2]
-> 3
*/
