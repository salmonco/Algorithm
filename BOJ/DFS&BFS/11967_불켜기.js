const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));
const [N, M] = input[0];
const dr = [-1, 1, 0, 0];
const dc = [0, 0, -1, 1];
const switchs = Array.from({ length: N + 1 }, () =>
  Array.from({ length: N + 1 }, () => [])
);
for (let i = 0; i < M; i++) {
  const [x, y, a, b] = input[i + 1];
  // switchs[y][x].push([b, a])
  switchs[x][y].push([a, b]);
}
// console.log(switchs)
const isOut = (r, c) => r <= 0 || r > N || c <= 0 || c > N;

const bfs = (r, c) => {
  const queue = [[r, c]];
  const visited = Array.from({ length: N + 1 }, () =>
    Array.from({ length: N + 1 }, () => false)
  );
  const lights = Array.from({ length: N + 1 }, () =>
    Array.from({ length: N + 1 }, () => false)
  );
  const retryRooms = Array.from({ length: N + 1 }, () =>
    Array.from({ length: N + 1 }, () => false)
  );
  let head = 0;
  let cnt = 0;
  visited[r][c] = true;
  lights[r][c] = true;
  while (queue.length > head) {
    const [cr, cc] = queue[head++];
    for (const [lr, lc] of switchs[cr][cc]) {
      // console.log(cr, cc, lr, lc)
      if (lights[lr][lc]) continue;
      lights[lr][lc] = true;
      cnt++;
      if (retryRooms[lr][lc] && !visited[lr][lc]) {
        queue.push([lr, lc]);
        visited[lr][lc] = true;
      }
    }
    // console.log(lights)
    for (let i = 0; i < dr.length; i++) {
      const [nr, nc] = [cr + dr[i], cc + dc[i]];
      if (isOut(nr, nc) || visited[nr][nc]) continue;
      if (!lights[nr][nc]) {
        retryRooms[nr][nc] = true;
        continue;
      }
      queue.push([nr, nc]);
      visited[nr][nc] = true;
    }
  }
  return cnt;
};

const cnt = bfs(1, 1);
console.log(cnt + 1);

/*
각 방은 (1, 1)부터 (N,N)까지 번호가 매겨져있다(2 ≤ N ≤ 100).
어둠을 무서워하는 암소 베시는 최대한 많은 방에 불을 밝히고 싶어한다.
베시는 유일하게 불이 켜져있는 방인 (1, 1)방에서 출발한다. 어떤 방에는 다른 방의 불을 끄고 켤 수 있는 스위치가 달려있다. 예를 들어, (1, 1)방에 있는 스위치로 (1, 2)방의 불을 끄고 켤 수 있다.
베시는 불이 켜져있는 방으로만 들어갈 수 있고, 각 방에서는 상하좌우에 인접한 방으로 움직일 수 있다.
베시가 불을 켤 수 있는 방의 최대 개수를 구하시오.

-> 불 안 켜져있어서 못 간 방 위치 저장해놓고, 불 켰을 때 바로 갈 수 있도록 하기
-> 불을 밝힐 수 있는 방의 최대 개수라, (1, 1)방도 카운팅해야 하는 듯

10:33~11:02 (29m)
*/
