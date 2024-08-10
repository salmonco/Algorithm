const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));
const [N] = input[0];
const graph = Array.from({ length: N + 1 }, () => []);
const inDegrees = Array.from({ length: N + 1 }, () => 0);
const cost = Array.from({ length: N + 1 }, () => 0);
for (let i = 1; i <= N; i++) {
  const [t, cnt, ...arr] = input[i];
  cost[i] = t;
  for (let j = 0; j < cnt; j++) {
    const v = arr[j];
    graph[v].push(i);
    inDegrees[i]++;
  }
}
// console.log(graph)
const topologicalSort = () => {
  const queue = [];
  let head = 0;
  const time = Array.from({ length: N + 1 }, () => 0);
  for (let i = 1; i <= N; i++) {
    if (inDegrees[i] === 0) {
      queue.push(i);
      time[i] = cost[i];
    }
  }
  while (queue.length > head) {
    const v = queue[head++];
    for (const nv of graph[v]) {
      inDegrees[nv]--;
      if (inDegrees[nv] === 0) queue.push(nv);
      time[nv] = Math.max(time[nv], time[v] + cost[nv]);
    }
  }
  return time;
};

const time = topologicalSort();
console.log(Math.max(...time));

/*
수행해야 할 작업 N개 (3 ≤ N ≤ 10000)가 있다. 각각의 작업마다 걸리는 시간(1 ≤ 시간 ≤ 100)이 정수로 주어진다.
몇몇 작업들 사이에는 선행 관계라는 게 있어서, 어떤 작업을 수행하기 위해 반드시 먼저 완료되어야 할 작업들이 있다.
모든 작업을 완료하기 위해 필요한 최소 시간을 구하여라. 물론, 서로 선행 관계가 없는 작업들은 동시에 수행 가능하다.

우선순위 큐. 큐에 있는 것 중 최소시간부터 꺼내기 -> 실패
* 서로 선행 관계가 없는 작업들은 동시에 수행 가능 -> max time DP

11:50 ~ 12:50 (1h)
*/
