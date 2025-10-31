const input = require('fs')
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n')
const N = Number(input[0])
const [A, B] = input[1].split(' ')
const M = Number(input[2])
const arr = input.slice(3).map((v) => v.split(' '))
const obj = Array.from({ length: N }, (v, i) => i+1).reduce((acc, cur) => {
    acc[cur] = {}
    return acc
}, {})
arr.forEach(([parent, child]) => {
    obj[parent][child] = true
    obj[child][parent] = true
})
// console.log({obj})
let minCnt = Infinity
const visited = Array.from({ length: N+1 }, () => false)
const dfs = (cur, target, cnt) => {
    if (obj[cur][target]) {
        minCnt = Math.min(minCnt, cnt)
        return
    }
    Object.keys(obj[cur]).forEach((v) => {
        if (visited[v]) return
        visited[v] = true
        dfs(v, target, cnt+1)
        visited[v] = false
    })
}
dfs(A, B, 1)
visited[A] = true
console.log(minCnt === Infinity ? -1 : minCnt)

/*
객체에 다 저장해놓고, 완전 탐색
*/