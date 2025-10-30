const input = require('fs')
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n').map((v) => v.split(' ').map(Number))
const [N, M] = input[0]
const arr = input.slice(1)
const parents = Array.from({ length: N+1 }, () => -1)

const find = (v1) => {
    if (parents[v1] === -1) return v1
    parents[v1] = find(parents[v1]) // NOTE
    return parents[v1]
}

const union = (v1, v2) => {
    const p1 = find(v1)
    const p2 = find(v2)
    if (p1 < p2) {
        parents[p2] = p1
    } else {
        parents[p1] = p2
    }
}

const isCycle = (v1, v2) => find(v1) === find(v2)

let cnt = 0
arr.forEach(([v1, v2]) => {
    if (isCycle(v1, v2)) {
        cnt += 1
        return
    }
    union(v1, v2)
})
// console.log({cnt, parents})
cnt += parents.filter((v) => v === -1).length - 2

console.log(cnt)

/*
유니온 파인드로 사이클 생기는지 여부 확인, 안 생기면 연결
무엇을 이어야 할지 어떻게 알까. 다 이어봐야 할 것 같은데. 그럼 10^5^2라서 시간초과임.
그럼 어케? isCycle 조건문으로 걸러내도 시간초과이려나? -> 시간초과

다른사람 풀이 보니
사이클이 이미 생성되어 있으면 -> 연결 잘라야 함. cnt += 1
그담에 루트의 개수 -1 더하기 (실제로 연결할 필요 없이 연결해줄 카운트만 세기)
*/
