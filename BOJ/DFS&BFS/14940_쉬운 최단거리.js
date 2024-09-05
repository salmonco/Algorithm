const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));
const [N, M] = input[0];
const map = input.slice(1);
const dr = [-1, 1, 0, 0];
const dc = [0, 0, -1, 1];

const get2Pos = () => {
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (map[i][j] === 2) return [i, j];
    }
  }
  return [-1, -1];
};

const checkZero = (distances) => {
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (map[i][j] === 0) distances[i][j] = 0;
    }
  }
};

const isOut = (r, c) => r < 0 || r >= N || c < 0 || c >= M;

const bfs = (r, c) => {
  const queue = [[r, c, 0]];
  const distances = Array.from({ length: N }, () =>
    Array.from({ length: M }, () => -1)
  );
  checkZero(distances);
  let head = 0;
  distances[r][c] = 0;
  while (queue.length > head) {
    const [cr, cc, dist] = queue[head++];
    // console.log(cr, cc, dist)
    for (let i = 0; i < dr.length; i++) {
      const [nr, nc] = [cr + dr[i], cc + dc[i]];
      if (isOut(nr, nc) || distances[nr][nc] !== -1) continue;
      if (map[nr][nc] === 0) continue;
      const newDist = dist + 1;
      distances[nr][nc] = newDist;
      queue.push([nr, nc, newDist]);
    }
  }
  return distances;
};

const twoPos = get2Pos();
const distances = bfs(...twoPos);
console.log(distances.map((v) => v.join(" ")).join("\n"));

/*
지도가 주어지면 모든 지점에 대해서 목표지점까지의 거리를 구하여라.
문제를 쉽게 만들기 위해 오직 가로와 세로로만 움직일 수 있다고 하자.
(2 ≤ n ≤ 1000, 2 ≤ m ≤ 1000)
0은 갈 수 없는 땅이고 1은 갈 수 있는 땅, 2는 목표지점이다. 입력에서 2는 단 한개이다.
원래 갈 수 없는 땅인 위치는 0을 출력하고, 원래 갈 수 있는 땅인 부분 중에서 도달할 수 없는 위치는 -1을 출력한다.

목적지로부터 각 지점까지의 거리 구하기
다익스트라인데 가중치가 모두 동일하므로 그냥 bfs해도 최단거리 구해진다.

13:40~14:12 (32m)
*/
