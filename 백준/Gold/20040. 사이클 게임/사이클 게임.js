const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n").map((v) => v.split(' ').map(Number))
const [N, M] = input[0]
const parent = Array.from({ length: N }, () => -1)

const find = (v) => {
    if (parent[v] === -1) return v
    parent[v] = find(parent[v])
    return parent[v]
}

const union = (v1, v2) => {
    // console.log(v1, v2, parent)
    const p1 = find(v1)
    const p2 = find(v2)
    if (p1 < p2) parent[p2] = p1
    else parent[p1] = p2
}

const isCycle = (v1, v2) => find(v1) === find(v2)

let ans = 0
for (let i = 0; i < M; i++) {
    const [v1, v2] = input[1+i]
    if (isCycle(v1, v2)) {
        ans = i+1
        break
    }
    union(v1, v2)
}
console.log(ans)

/*
10:53

사이클을 확인해야 함. 유니온파인드
두 점 사이 선분을 잇는다. 그래프.


*/
