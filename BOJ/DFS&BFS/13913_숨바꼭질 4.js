const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));
const [N, K] = input[0];
const MAX = 100000;
const path = Array.from({ length: MAX + 1 }, () => -1);

const bfs = (f, t) => {
  // const queue = [[f, [f]]]
  const queue = [[f, 0]];
  const visited = Array.from({ length: MAX + 1 }, () => false);
  let head = 0;
  visited[f] = true;
  while (queue.length > head) {
    // const [c, history] = queue[head++]
    const [c, cnt] = queue[head++];
    // if (c === t) return history
    if (c === t) return cnt;
    for (const n of [c - 1, c + 1, 2 * c]) {
      if (n < 0 || n > MAX || visited[n]) continue;
      // queue.push([n, [...history, n]])
      queue.push([n, cnt + 1]);
      visited[n] = true;
      path[n] = c;
    }
  }
  return -1;
};

// const history = bfs(N, K)
const cnt = bfs(N, K);
// console.log(history.length-1)
console.log(cnt);
// console.log(history.join(' '))
const order = [K];
let prev = path[K];
for (let i = 0; i < cnt; i++) {
  order.push(prev);
  prev = path[prev];
}
console.log(order.reverse().join(" "));

/*
수빈이는 현재 점 N(0 ≤ N ≤ 100,000)에 있고, 동생은 점 K(0 ≤ K ≤ 100,000)에 있다.
수빈이의 위치가 X일 때 걷는다면 1초 후에 X-1 또는 X+1로 이동하게 된다. 
순간이동을 하는 경우에는 1초 후에 2*X의 위치로 이동하게 된다.
수빈이와 동생의 위치가 주어졌을 때, 수빈이가 동생을 찾을 수 있는 가장 빠른 시간이 몇 초 후인지 구하는 프로그램을 작성하시오.

-> 메모리초과 -> 큐에 넣을 때마다 history 배열 업데이트하느라 생성해서 그런 듯
다른사람풀이: 경로 역추적. path 배열

15:45~16:08 (23m)
*/
