const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const [N, M] = input[0].split(" ").map(Number);
const maze = Array.from({ length: N });

for (let i = 0; i < N; i++) {
  maze[i] = input[1 + i].split("").map(Number);
}

let min = Infinity;
const dx = [-1, 0, 1, 0];
const dy = [0, 1, 0, -1];

const isOut = (r, c) => {
  return r < 0 || r >= N || c < 0 || c >= M;
};

const bfs = (r, c, cnt) => {
  const queue = [[r, c, cnt]];

  while (queue.length) {
    const [r, c, cnt] = queue.shift();

    if (min <= cnt) return;
    if (r === N - 1 && c === M - 1) {
      min = cnt;
      return;
    }

    for (let i = 0; i < dx.length; i++) {
      const [x, y] = [dx[i], dy[i]];
      const [nextX, nextY] = [r + x, c + y];

      if (isOut(nextX, nextY) || maze[nextX][nextY] !== 1) continue;
      maze[nextX][nextY] = 2;
      queue.push([nextX, nextY, cnt + 1]);
    }
  }
};

bfs(0, 0, 1);
console.log(min);

/*
dfs로 구현 -> 시간초과
-> 도착점에 도착해야 알 수 있음. 모든 경로를 탐색해봐야 함

반면 bfs는 최단 거리를 찾자마자 종료할 수 있음
-> 최단 거리 구할 때 bfs가 더 유리함
*/
