const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));
const [N, K] = input[0];
const MAX_SIZE = 100000;

const isOut = (pos) => pos < 0 || pos > MAX_SIZE;

const bfs = (s, K) => {
  const queue = [[s, 0]];
  const visited = Array.from({ length: MAX_SIZE + 1 }, () => false);
  let head = 0;
  while (queue.length > head) {
    const [pos, t] = queue[head++];
    if (pos === K) return t;

    const quickPos = 2 * pos;
    if (!isOut(quickPos) && !visited[quickPos]) {
      visited[quickPos] = true;
      queue.push([quickPos, t]);
    }

    for (const nPos of [pos - 1, pos + 1]) {
      if (isOut(nPos) || visited[nPos]) continue;
      visited[nPos] = true;
      queue.push([nPos, t + 1]);
    }
  }
  return -1;
};

const minTime = bfs(N, K);
console.log(minTime);

/*
수빈이는 현재 점 N(0 ≤ N ≤ 100,000)에 있고, 동생은 점 K(0 ≤ K ≤ 100,000)에 있다.
수빈이는 걷거나 순간이동을 할 수 있다.
만약, 수빈이의 위치가 X일 때 걷는다면 1초 후에 X-1 또는 X+1로 이동하게 된다.
순간이동을 하는 경우에는 0초 후에 2*X의 위치로 이동하게 된다.
수빈이와 동생의 위치가 주어졌을 때, 수빈이가 동생을 찾을 수 있는 가장 빠른 시간이 몇 초 후인지 구하는 프로그램을 작성하시오.

순간이동하면 0초니까, 순간이동 먼저 큐에 넣기

21:34~21:44 (10m)
*/
