const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" "));
const [N, P] = input[0].map(Number);
const MAX_SIZE = N + 1;
const capacity = Array.from({ length: MAX_SIZE }, () =>
  Array.from({ length: MAX_SIZE }, () => 0)
);
const match = Array.from({ length: MAX_SIZE }, () => -1);

for (let i = 0; i < P; i++) {
  const [from, to] = input[i + 1];
  capacity[from][to] += 1;
}
// console.log(capacity)
// 시작점 -> 도착점 경로 구하기
const bfs = (start, end) => {
  const queue = [start];
  match[start] = start;
  let head = 0;
  while (queue.length > head) {
    const now = queue[head++];
    if (now === end) break;
    for (let i = 0; i < capacity[now].length; i++) {
      if (capacity[now][i] > 0 && match[i] === -1) {
        queue.push(i);
        match[i] = now;
      }
    }
  }
};

const calculateFlow = (start, end) => {
  // 최대 유량 구하기 (도착점 -> 시작점 거슬러 올라가면서)
  let flow = Infinity;
  let now = end;
  while (now !== start) {
    flow = Math.min(flow, capacity[match[now]][now]);
    now = match[now];
  }
  // 파이프의 잔여 용량 갱신 (도착점 -> 시작점 거슬러 올라가면서)
  now = end;
  while (now !== start) {
    capacity[match[now]][now] -= flow;
    capacity[now][match[now]] += flow;
    now = match[now];
  }
  return flow;
};

const START = 1;
const END = 2;
let cnt = 0;
while (true) {
  // 시작점 -> 도착점 경로가 없을 때까지 반복
  match.fill(-1);
  bfs(START, END);
  if (match[END] === -1) break;
  cnt += calculateFlow(START, END); // 최대 유량의 누적합
}
console.log(cnt);

/*
N개의 도시가 P개의 단방향 길로 연결되어 있다.
1번에서 2번으로 가는 서로 다른 경로를 최대한 많이 찾으려고 하는데, 이때 한 경로에 포함된 길이 다른 경로에 포함되면 안된다.
-> 도착점 -> 시작점 경로가 없을 때까지 경로 찾기
-> capacity가 1인 최대 유량 구하기

최대 유량 구하기 (Edmonds-Karp 알고리즘)
1. 시작점 -> 도착점 경로 구하기 (bfs, 용량 비교, 지나온 경로 저장)
2. 최대 유량 구하기, 잔여 용량 갱신 (도착점 -> 시작점 경로 거슬러 올라가면서)
3. 시작점 -> 도착점 경로가 없을 때까지 1,2를 반복. 최대 유량의 누적합 구하기
*/
