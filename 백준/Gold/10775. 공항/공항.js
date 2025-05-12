const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n").map(Number)
const G = input[0]
const P = input[1]
const gs = input.slice(2)

const parents = Array.from({ length: G+1 }, (_, i) => i)

const find = (v) => {
    if (parents[v] === v) {
        return v
    }
    return parents[v] = find(parents[v])
}

const union = (v1, v2) => {
    const p1 = find(v1)
    const p2 = find(v2)
    if (p1 !== p2) {
        parents[p1] = p2
    }
}

let ans = 0
for (let i = 0; i < P; i++) {
    const g = gs[i]
    const maxG = find(g)
    // console.log({maxG, parents})
    if (maxG === 0) break
    union(maxG, maxG-1)
    ans++
}
console.log(ans)

/*
22:37

1초. 10^5

[2][1][3][]
[1][2][3][]

브루트포스로 하면... 얼마만큼 걸리지.
일단 가능한 경우의 수 다 도킹해봐야 max비행기수 구할 수 있을 거 같은데.
dfs 백트래킹으로 하면 안 되나? 근데 그럼 메모리초과날 거 같고 시간도...

다른사람풀이 보니, 그리디랑 유니온파인드 썼다.
- 가장 큰 번호의 게이트에 비행기를 도킹시켜야 최대한 많은 비행기를 도킹시킬 수 있다.
도킹하고 다음으로 작은 번호를 바라보게 하기 -> 다음 작은 번호가 부모가 되도록 유니온으로 묶기
어케 생각해낸거지....
참고한 풀이: https://fordang.tistory.com/283
*/