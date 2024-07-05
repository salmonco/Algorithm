const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));
const [N] = input[0];
const weights = [0, ...input[1]];
const edges = Array.from({ length: N + 1 }, () => []);
const memo = Array.from({ length: N + 1 }, () => [-1, -1]);
const visited = Array.from({ length: N + 1 }, () => false);

for (let i = 0; i < N - 1; i++) {
  const [v1, v2] = input[i + 2];
  edges[v1].push(v2);
  edges[v2].push(v1);
}
// console.log(edges)
const traversal = (pos) => {
  memo[pos][0] = 0;
  memo[pos][1] = weights[pos];
  if (edges[pos].length === 0) return;
  visited[pos] = true;
  for (let child of edges[pos]) {
    if (visited[child]) continue;
    traversal(child);
    if (memo[child][0] > memo[child][1]) {
      memo[pos][0] += memo[child][0];
    } else {
      memo[pos][0] += memo[child][1];
    }
    memo[pos][1] += memo[child][0];
  }
  visited[pos] = false;
};

const trace = (pos, isPicked) => {
  visited[pos] = true;
  if (isPicked) {
    selectedNodes.push(pos);
    for (let child of edges[pos]) {
      if (visited[child]) continue;
      trace(child, 0);
    }
  } else {
    for (let child of edges[pos]) {
      if (visited[child]) continue;
      if (memo[child][1] >= memo[child][0]) {
        trace(child, 1);
      } else {
        trace(child, 0);
      }
    }
  }
  visited[pos] = false;
};

traversal(1);
// console.log(memo)
const selectedNodes = [];
if (memo[1][1] > memo[1][0]) {
  console.log(memo[1][1]);
  trace(1, 1);
} else {
  console.log(memo[1][0]);
  trace(1, 0);
}
selectedNodes.sort((a, b) => a - b);
console.log(selectedNodes.join(" "));

/*
그래프 G(V, E)에서 정점의 부분 집합 S에 속한 모든 정점쌍이 서로 인접하지 않으면 (정점쌍을 잇는 간선이 없으면) S를 독립 집합(independent set)이라고 한다.
독립 집합의 크기는 정점에 가중치가 주어져 있지 않을 경우는 독립 집합에 속한 정점의 수를 말하고, 정점에 가중치가 주어져 있으면 독립 집합에 속한 정점의 가중치의 합으로 정의한다.
독립 집합이 공집합일 때 그 크기는 0이라고 하자. 크기가 최대인 독립 집합을 최대 독립 집합이라고 한다.
문제는 일반적인 그래프가 아니라 트리(연결되어 있고 사이클이 없는 그래프)와 각 정점의 가중치가 양의 정수로 주어져 있을 때, 최대 독립 집합을 구하는 것이다.
output: 첫째 줄에 최대 독립집합의 크기를 출력한다. 둘째 줄에는 최대 독립집합에 속하는 정점을 오름차순으로 출력한다. 최대 독립 집합이 하나 이상일 경우에는 하나만 출력하면 된다.
-> 인접하지 않게 정점 선택
-> 그 정점들의 가중치 합이 최대가 되도록
-> 트리 + DP

memo[u][0]: 정점 u를 포함하지 않는 경우의 최대 독립 집합 크기
memo[u][1]: 정점 u를 포함하는 경우의 최대 독립 집합 크기

최대 독립집합에 속하는 정점 구하기
-> memo[child][0], memo[child][1] 두 값 중에서 더 높은 값을 찾아 추적
*/
