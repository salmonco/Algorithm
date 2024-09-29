const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));
const [N, M, R] = input[0];
const itemCnt = input[1];
const graph = Array.from({ length: N + 1 }, () => []);
for (let i = 0; i < R; i++) {
  const [a, b, l] = input[2 + i];
  graph[a].push([b, l]);
  graph[b].push([a, l]);
}

const bfs = (s) => {
  const queue = [[s, 0]];
  const visited = Array.from({ length: N + 1 }, () => false);
  let head = 0;
  let cnt = itemCnt[s - 1];
  visited[s] = true;
  while (queue.length > head) {
    const [c, sumM] = queue[head++];
    // console.log(c, sumM, cnt)
    for (const [n, l] of graph[c]) {
      // if (visited[n]) continue
      const newSumM = sumM + l;
      if (newSumM > M) continue;
      if (!visited[n]) {
        cnt += itemCnt[n - 1];
        visited[n] = true;
      }
      queue.push([n, newSumM]);
    }
  }
  return cnt;
};

let max = 0;
for (let i = 1; i <= N; i++) {
  // console.log(i, 'start')
  const cnt = bfs(i);
  max = Math.max(max, cnt);
}
console.log(max);

/*
각 지역은 일정한 길이 l (1 ≤ l ≤ 15)의 길로 다른 지역과 연결되어 있고 이 길은 양방향 통행이 가능하다. 예은이는 낙하한 지역을 중심으로 거리가 수색 범위 m (1 ≤ m ≤ 15) 이내의 모든 지역의 아이템을 습득 가능하다고 할 때, 예은이가 얻을 수 있는 아이템의 최대 개수를 알려주자.

bfs
-> 9%에서 실패 -> 노드에 재방문해야 할 수도 있음에도 불구하고 한 번 방문한 노드를 다시 방문하지 않는 로직이 적용되어 있기 때문입니다.
-> 재방문 가능하도록 하고, visited 배열을 카운트 추가하는 용도로 사용
*/
