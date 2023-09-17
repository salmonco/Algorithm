const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));
const [N] = input[0];
const graph = Array.from({ length: N + 1 }, () => []);
const times = [0];
const inDegrees = Array.from({ length: N + 1 }, () => 0);

for (let i = 0; i < N; i++) {
  const t = input[1 + i][0];

  times.push(t);
  for (let j = 1; j < input[1 + i].length - 1; j++) {
    const from = input[1 + i][j];

    graph[from].push(i + 1);
    inDegrees[i + 1]++;
  }
}

const queue = [];
let result = Array.from({ length: N + 1 }, () => 0);

for (let i = 1; i <= N; i++) {
  if (!inDegrees[i]) queue.push(i);
  result[i] = times[i];
}

while (queue.length) {
  const vertex = queue.shift();

  for (const next of graph[vertex]) {
    inDegrees[next]--;
    if (!inDegrees[next]) queue.push(next);
    result[next] = Math.max(result[next], result[vertex] + times[next]);
  }
}

for (let i = 1; i <= N; i++) {
  console.log(result[i]);
}

/*
처음 시도: 방문한 정점들을 저장해놓은 passed 배열을 큐에 함깨 넣기
-> 나중에 방문한 정점들의 시간을 합할 때 사용하기 위함

여러 개의 건물을 동시에 지을 수 있다.
A -> C
B -> C

A, B 중 더 오래 걸리는 것을 C의 passed 배열에 추가해야 함
-> 큐에 넣을 때 빨리 끝나는 것을 먼저 넣기 -> 실패

-> 다음으로 방문할 건물에 대해 지금까지 총 소요된 시간을 저장해놓기 (dp)
*/
