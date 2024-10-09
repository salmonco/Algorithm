const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
const T = +input[0]
let parent

const find = (v) => {
    if (parent[v] === v) return v
    parent[v] = find(parent[v])
    return parent[v]
}

const union = (v1, v2) => {
    const p1 = find(v1)
    const p2 = find(v2)
    if (p1 < p2) parent[p2] = p1
    else parent[p1] = p2
}

const isCycle = (v1, v2) => find(v1) === find(v2)

let line = 1
const ans = []
for (let i = 0; i < T; i++) {
    const N = +input[line++]
    const seq = input[line++].split(' ').map(Number)
    // const graph = []
    let cnt = 0
    parent = Array.from({ length: N+1 }, (_, i) => i)
    for (let i = 0; i < N; i++) {
        if (isCycle(i+1, seq[i])) {
            cnt++
        }
        union(i+1, seq[i])
    }
    // const cnt = [...new Set(parent.slice(1))].length
    ans.push(cnt)
}
console.log(ans.join('\n'))

/*
좀 걸림

사이클 개수 구하기
    유니온 파인드 써야 할 듯?
    서로 다른 부모의 개수 구하기
왜 틀렸지? 이어주고 부모만 확인하면 사이클이 생겼는지 알 수 없을 듯?
    추가하면서 사이클 체크를 해야 할 듯
    근데 이거 어차피 연결 요소의 개수가 사이클의 개수 아닌가? 아닐수도
*/
