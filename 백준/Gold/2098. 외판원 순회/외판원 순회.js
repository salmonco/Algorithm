const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n").map((v) => v.split(' ').map(Number))
const [N] = input[0]
const cost = input.slice(1)
const dp = Array.from({ length: N }, () => Array.from({ length: 1 << N }, () => 0))
const START = 0

const dfs = (x, visited) => {
    // 모든 도시 방문 시
    if (visited === (1 << N) - 1) {
        // 출발점으로 가는 경로 없다면
        if (cost[x][START] === 0) {
            return Infinity
        }
        return cost[x][START]
    }
    // 이미 최소비용이 계산되어있다면
    if (dp[x][visited] !== 0) {
        return dp[x][visited]
    }
    dp[x][visited] = Infinity
    
    // 도시들 순회
    for (let i = 1; i < N; i++) {
        // 특정 도시로 가는 경로가 없다면 스킵
        if (cost[x][i] === 0) {
            continue
        }
        // 이미 방문한 도시면 스킵
        if (visited & (1 << i)) {
            continue
        }
        // 최소비용 갱신
        dp[x][visited] = Math.min(dp[x][visited], dfs(i, visited | (1 << i)) + cost[x][i])
    }
    return dp[x][visited]
}
// START번 도시부터 시작하여 모든 도시를 순회
console.log(dfs(START, 1 << START))

/*
21:35

1초. 10^6

한 도시에서 출발해 N개의 도시를 모두 거쳐 첫 도시로 돌아오기
한 번 갔던 도시로는 다시 갈 수 없음.(첫 도시 제외)
가장 적은 비용의 여행경로 구하기

최단경로. 어디서 출발?
다익스트라 -> 한 곳에서 출발
밸만포드였나? 모든 곳에서 출발해봐서 최단경로 찾기
그그 3차원 배열 쓰는 알고리즘..
아 또 헷갈렸다 벨만포드는 다익스트라랑 비슷하데 음수인 간선 있을 때 쓰는 거고.. 플로이드워셜이었음

간선의 비용이 0이면 갈 수 없음
아 근데 플로이드워셜은 각 출발지에서 목적지로 가는 최소비용이고. 우리는 순회를 해야 하는데..
출발지에서 모든 노드 다 거쳐서 다시 출발지로 되돌아오는 최소비용을 구해야 함.

다른사람풀이보니 비트마스킹, dfs, dp로 풀었음
참고한 풀이: https://blog.naver.com/dlaxodud2388/222979473127

0101 -> 0번 도시와 2번 도시를 지난 것.
1111 -> 0~3번 도시 다 돌았음

어느 도시부터 출발하더라도 순회하는 최소비용은 똑같이 나오려나?
음.. 안되네. dp라서 0번부터 돌아야 최소비용을 구할 수 있나봄.
*/