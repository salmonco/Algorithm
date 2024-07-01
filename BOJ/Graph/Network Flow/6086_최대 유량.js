const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" "));
const [N] = input[0].map(Number);
const MAX_SIZE = 52;
const pipe = Array.from({ length: MAX_SIZE }, () =>
  Array.from({ length: MAX_SIZE }, () => 0)
); // 용량을 저장
const match = Array.from({ length: MAX_SIZE }, () => -1);

const charToInt = (c) => {
  const num = c.charCodeAt();
  if (c >= "A" && c <= "Z") return num - "A".charCodeAt();
  if (c >= "a" && c <= "z") return num - "a".charCodeAt() + 26;
  return -1;
};

for (let i = 0; i < N; i++) {
  const [from, to, capacity] = input[i + 1];
  const f = charToInt(from);
  const t = charToInt(to);
  pipe[f][t] += +capacity;
  pipe[t][f] += +capacity;
}
// console.log(pipe)
// 시작점 -> 도착점 경로 구하기
const bfs = (start, end) => {
  const queue = [start];
  match[start] = start;
  let head = 0;
  while (queue.length > head) {
    const now = queue[head++];
    if (now === end) break;
    for (let i = 0; i < pipe[now].length; i++) {
      if (pipe[now][i] > 0 && match[i] === -1) {
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
    flow = Math.min(flow, pipe[match[now]][now]);
    now = match[now];
  }
  // 파이프의 잔여 용량 갱신 (도착점 -> 시작점 거슬러 올라가면서)
  now = end;
  while (now !== start) {
    pipe[match[now]][now] -= flow;
    pipe[now][match[now]] += flow;
    now = match[now];
  }
  return flow;
};

const START = 0;
const END = "Z".charCodeAt() - "A".charCodeAt();
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
최대 유량 구하기 (Edmonds-Karp 알고리즘)
1. 시작점 -> 도착점 경로 구하기 (bfs, 용량 비교, 지나온 경로 저장)
2. 최대 유량 구하기, 잔여 용량 갱신 (도착점 -> 시작점 경로 거슬러 올라가면서)
3. 시작점 -> 도착점 경로가 없을 때까지 1,2를 반복. 최대 유량의 누적합 구하기
*/
