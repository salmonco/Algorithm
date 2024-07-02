const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));
const [N, P] = input[0];
const MAX_SIZE = 2 * N + 1;
const capacity = Array.from({ length: MAX_SIZE }, () =>
  Array.from({ length: MAX_SIZE }, () => 0)
);
const match = Array.from({ length: MAX_SIZE }, () => -1);
const visited = Array.from({ length: MAX_SIZE }, () => false);

// in->out의 용량 1인 간선 생성
for (let i = 1; i <= N; i++) {
  capacity[2 * i - 1][2 * i] = 1;
}
/*
1 -> 1,2
2 -> 3,4
3 -> 5,6
n -> 2*n-1, 2n
*/
for (let i = 0; i < P; i++) {
  const [from, to] = input[i + 1];
  capacity[2 * from][2 * to - 1] = Infinity;
  capacity[2 * to][2 * from - 1] = Infinity;
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
    // console.log(now % 2 ? `${(now+1)/2} out` : `${now/2} in`)
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

const START = 1 * 2;
const END = 2 * 2 - 1;
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
1번과 2번 두 도시 사이를 최대한 많이 왔다 갔다 하려 하는데,
이때 한 번 방문했던 도시(1, 2번 도시 제외)를 두 번 이상 방문하지 않으려 한다.
첫째 줄에 왔다 갔다 할 수 있는 최대 횟수를 출력한다.
-> 도착점 -> 시작점 경로가 없을 때까지 경로 찾기
-> capacity는 무한대인데, visited 도시 확인 -> 90%에서 실패. Why?
-> 정점 분할: 정점에도 가중치를 주기 위해 정점을 하나의 간선으로 만들기. in->out

최대 유량 구하기 (Edmonds-Karp 알고리즘)
1. 시작점 -> 도착점 경로 구하기 (bfs, 용량 비교, 지나온 경로 저장)
2. 최대 유량 구하기, 잔여 용량 갱신 (도착점 -> 시작점 경로 거슬러 올라가면서)
3. 시작점 -> 도착점 경로가 없을 때까지 1,2를 반복. 최대 유량의 누적합 구하기
*/
