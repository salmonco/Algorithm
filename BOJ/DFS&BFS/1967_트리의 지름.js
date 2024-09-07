const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));
const [N] = input[0];
const graph = Array.from({ length: N + 1 }, () => []);
for (let i = 0; i < N - 1; i++) {
  const [parent, child, weight] = input[i + 1];
  graph[parent].push([child, weight]);
  graph[child].push([parent, weight]);
}

const bfs = (s) => {
  const queue = [[s, 0]];
  const visited = Array.from({ length: N + 1 }, () => false);
  let head = 0;
  let max = 0;
  let maxNode = null;
  visited[s] = true;
  while (queue.length > head) {
    const [c, sum] = queue[head++];
    if (max < sum) {
      max = sum;
      maxNode = c;
    }
    for (const [n, w] of graph[c]) {
      if (visited[n]) continue;
      const newSum = sum + w;
      visited[n] = true;
      queue.push([n, newSum]);
    }
  }
  return { max, maxNode };
};

// let ans = 0
// for (let i = 1; i <= N; i++) {
//     const max = bfs(i)
//     ans = Math.max(ans, max)
// }
if (N === 1) {
  console.log(0);
} else {
  const { maxNode } = bfs(1);
  const { max } = bfs(maxNode);
  console.log(max);
}

/*
트리에서 어떤 두 노드를 선택해서 양쪽으로 쫙 당길 때, 가장 길게 늘어나는 경우가 있을 것이다.
이럴 때 트리의 모든 노드들은 이 두 노드를 지름의 끝 점으로 하는 원 안에 들어가게 된다.
이런 두 노드 사이의 경로의 길이를 트리의 지름이라고 한다. 정확히 정의하자면 트리에 존재하는 모든 경로들 중에서 가장 긴 것의 길이를 말한다.
입력으로 루트가 있는 트리를 가중치가 있는 간선들로 줄 때, 트리의 지름을 구해서 출력하는 프로그램을 작성하시오.
노드의 개수 n(1 ≤ n ≤ 10,000)
루트 노드의 번호는 항상 1이라고 가정하며, 간선의 가중치는 100보다 크지 않은 양의 정수이다.

각 노드부터 시작해서 최대경로 구하기
각 노드에서 bfs 돌리기 -> 시간초과

다른사람풀이: 각 노드에서 각각 bfs 돌릴 필요 없이,
임의의 노드 X에서 bfs를 실행해서 최대 거리인 노드 Y와 거리를 구하고,
최대 거리 노드 Y에서 한번 더 bfs를 실행해서 Y로부터 최대 거리 노드인 Z를 구하고, 최대 거리를 구한다.
-> bfs 2번만 돌려서 구할 수 있는 방법
https://gobae.tistory.com/46

-> 런타임 에러 (TypeError) -> N이 1인 경우 처리해줘야 함

21:47
*/
