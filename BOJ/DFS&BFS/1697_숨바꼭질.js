const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));
const [N, K] = input[0];
const MAX_SIZE = 100000;

const bfs = (s, K) => {
  const queue = [[s, 0]];
  const visited = Array.from({ length: MAX_SIZE + 1 }, () => false);
  let head = 0;
  while (queue.length > head) {
    const [p, t] = queue[head++];
    if (p === K) return t;
    for (const np of [p - 1, p + 1, 2 * p]) {
      if (np < 0 || np > MAX_SIZE || visited[np]) continue;
      queue.push([np, t + 1]);
      visited[np] = true;
    }
  }
  return -1;
};

const time = bfs(N, K);
console.log(time);

/*
수빈이는 현재 점 N(0 ≤ N ≤ 100,000)에 있고, 동생은 점 K(0 ≤ K ≤ 100,000)에 있다.
수빈이는 걷거나 순간이동을 할 수 있다.
만약, 수빈이의 위치가 X일 때 걷는다면 1초 후에 X-1 또는 X+1로 이동하게 된다.
순간이동을 하는 경우에는 1초 후에 2*X의 위치로 이동하게 된다.
수빈이와 동생의 위치가 주어졌을 때, 수빈이가 동생을 찾을 수 있는 가장 빠른 시간이 몇 초 후인지 구하는 프로그램을 작성하시오.

13:02~13:08 (6m)
*/
