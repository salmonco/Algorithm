const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n").map((v) => v.split(' ').map(Number))
const [N, M] = input[0]
const graph = []
for (let i = 0; i < M; i++) {
    const [A, B, C] = input[1+i]
    graph.push([A, B, C])
    // graph.push([B, A, C])
}
graph.sort((a, b) => a[2] - b[2])
// console.log(graph)
const parent = Array.from({ length: N+1 }, () => -1)

const find = (v) => {
    if (parent[v] === -1) return v
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

const cost = []
for (const [s, e, c] of graph) {
    if (isCycle(s, e)) continue
    union(s, e)
    cost.push(c)
}
cost.pop()

const ans = cost.reduce((p, c) => p+c, 0)
console.log(ans)

/*
9:28

최소 신장 트리

그리디? 유지비 높은 것부터 끊는다. 예외가 있나? 예외 있는 듯. 젤 큰 거 하나 끊은 것보다 합친 게 더 유지비 많이 들 수 있잖아.
    그리디로 끊음으로써 분리된 마을이 생길 경우 예외가 있다고 생각

어디서 끊을 것인가?
만약 끊다가 아예 마을이 분리되는 경우가 있을 수 있는데 이때 이후론 끊을 때 더 이상 마을이 분리되면 안 돼
분리된 마을이라는 걸 어떻게 알지? 끊을 때마다 분리된 마을이 있는지 확인해야 하나?

최소 유지비여야 하니 젤 큰 유지비부터 끊은 게 맞는 것 같아
    마을이 분리되지 않는 선에서 그리디로 끊어서 최소신장트리 만들기
    그 중에 젤 큰 유지비 하나 끊기
    예외가 있나?... 이대로 예외 못찾아서 코드 짰다가 시간낭비 할 수도..

-> 시간초과
끊을 때마다 분리된 마을 있는지 확인하는 거에서 시간 오래 걸리는 것 같은데..
    지금은 유니온파인드로 되어있는데 다른 방법 없나?

다른사람풀이: 최소신장트리, 유지비 낮은 것부터 트리에 추가하기
    아, 나는 기존 마을에서 연결을 끊는 접근만 했었는데 반대로 연결을 추가해가면 되는구나
    그럼 매번 분리된 마을 있는지 확인할 필요 없이 최소신장트리 만들 수 있음
    유지비 낮은 연결부터 추가하기
*/
