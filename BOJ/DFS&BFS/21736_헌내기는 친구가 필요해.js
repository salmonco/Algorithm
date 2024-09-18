const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const [N, M] = input[0].split(" ").map(Number);
const map = input.slice(1).map((v) => v.split(""));
const dr = [-1, 1, 0, 0];
const dc = [0, 0, -1, 1];

const getDoyeonPos = () => {
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (map[i][j] === "I") return [i, j];
    }
  }
  return [-1, -1];
};

const doyeonPos = getDoyeonPos();

const isOut = (r, c) => r < 0 || r >= N || c < 0 || c >= M;

const bfs = (r, c) => {
  const queue = [[r, c]];
  const visited = Array.from({ length: N }, () =>
    Array.from({ length: M }, () => false)
  );
  let head = 0;
  let cnt = 0;
  visited[r][c] = true;
  while (queue.length > head) {
    const [cr, cc] = queue[head++];
    if (map[cr][cc] === "P") cnt++;
    for (let i = 0; i < dr.length; i++) {
      const [nr, nc] = [cr + dr[i], cc + dc[i]];
      if (isOut(nr, nc) || visited[nr][nc] || map[nr][nc] === "X") continue;
      visited[nr][nc] = true;
      queue.push([nr, nc]);
    }
  }
  return cnt;
};

const cnt = bfs(...doyeonPos);
console.log(cnt === 0 ? "TT" : cnt);

/*
캠퍼스에서 이동하는 방법은 벽이 아닌 상하좌우로 이동하는 것이다.
캠퍼스에서 도연이가 만날 수 있는 사람의 수를 출력하는 프로그램을 작성해보자.

일반적인 bfs
*/
