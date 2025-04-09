const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(' ').map(Number))
const [T] = input[0]
let parent

const isCycle = (v1, v2) => {
    return find(v1) === find(v2)
}

const find = (v) => {
    if (parent[v] === v) return v
    // find 할 때 parent[v] 를 갱신
    return parent[v] = find(parent[v])
}

const union = (v1, v2) => {
    const p1 = find(v1)
    const p2 = find(v2)

    if (p1 < p2) {
        parent[p2] = p1
    } else {
        parent[p1] = p2
    }
}

const ans = []
let line = 1
for (let tc = 0; tc < T; tc++) {
    const [N] = input[line++]
    const nums = input[line++]
    parent = Array.from({ length: N+1 }, (_, i) => i)

    const visited = Array(N + 1).fill(false);
    const check = Array(N + 1).fill(false);
    const cycles = [];

    // 1단계: 유니온 파인드 + 사이클 대표 정점 수집
    nums.forEach((v, i) => {
        if (isCycle(i+1, v)) {
            const p = find(i+1)
            if (!check[p]) {
                check[p] = true
                cycles.push(i+1) // i+1 은 사이클을 만드는 시작점
            }
            return
        }
        union(i+1, v)
    })

    // 2단계: 사이클에 포함된 정점들을 모두 방문 처리
    for (const start of cycles) {
        let curr = start;
        while (!visited[curr]) {
          visited[curr] = true;
          curr = nums[curr - 1];
        }
    }

    // 3단계: 방문 안 된 노드 개수 세기
    let cnt = 0;
    for (let i = 1; i <= N; i++) {
        if (!visited[i]) cnt++;
     }
    ans.push(cnt)
}

console.log(ans.join('\n'))

/*
12:09

3초. N 최대 10^5

서로 연결되어 있음 되는 건데.
사이클이 생기면 -> 팀 이룸

유니온파인드로 가야겠는걸. 근데 어케 구현하더라..

구현했어. 근데 사이클만을 따질 게 아니라 뭔가 좀 더 복잡함.
꼬리잡기를 해야 해. 아 근데 그게 사이클인데.

사이클이 생긴 얘들을 묶어줘야 하는데
어케 묶지? 사이클이 생긴 얘들을 어케 알아내지?
다른사람풀이보니 dfs 로 많이들 풀었던데..

일단 사이클이 안 생긴 노드 개수를 구하는 거니깐
사이클이 생긴 노드에 대해 visited 처리해서 안 visited 인 얘들 개수 구하는 식으로 푼 듯


*/