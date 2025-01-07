const input = require('fs')
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n').map((v) => v.split(' ').map(Number))
const [N, M] = input[0]
const relationship = input.slice(1)
const distance = Array.from({ length: N+1 }, () => Array.from({ length: N+1 }, () => Infinity))
relationship.forEach(([a, b]) => {
    distance[a][b] = 1
    distance[b][a] = 1
})
for (let k = 1; k <= N; k++) {
    for (let i = 1; i <= N; i++) {
        for (let  j = 1; j <= N; j++) {
            distance[i][j] = Math.min(distance[i][j], distance[i][k] + distance[k][j])
        }
    }
}
// console.log(distance)
const score = []
distance.slice(1).forEach((arr, index) => {
    const sum = arr.slice(1).reduce((acc, cur, i) => {
        if (i === index) return acc
        return acc + cur
    }, 0)
    score.push(sum)
})
// console.log(score)
const min = Math.min(...score)
const ans = score.indexOf(min)+1
console.log(ans)

/*
11:13

모든 관계를 탐색해야 할 듯. 그러나 1->2를 봤으면 2->1는 동일해서 안 봐도 됨.
1->2, 1->3, 1->4, 1->5
2->3, 2->4, 2->5
3->4, 3->5
4->5
탐색해야 할 관계의 수는 5명이면 4+3+2+1, n(n-1)/2라서 n^2. (10^2)^2 = 10^4
한 관계당 최대 몇 번을 타고타고 가야 하냐면 5,000번. 약 10^3
10^7인가.. 시간제한 2초라서 괜찮을 듯
아니면 관계에 중복이 많을 것 같으니까 그래프 전체를 탐색하다가 발견하는 관계마다 저장?
어디서부터 탐색을 시작하느냐. 시작노드를 다르게 해주어야 하니 중복은 어차피 생기려나?
각 노드에서 최단경로. 다익스트라는 한 노드에서만 보는 거고.. 뭐였지 벨만포드?
암튼 그거 알고리즘 쓰면 될 듯. 3중 포문이었나. 벨만포드는 다익스트라랑 비슷한데 음수인 간선 있을 때 쓰면 되는 거고.. 그래 플로이드 와샬

*/