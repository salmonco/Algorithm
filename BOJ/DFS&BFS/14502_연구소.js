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
const MAX_WALL_CNT = 3;

const getVirusPos = () => {
  const virusPos = [];
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < M; c++) {
      if (map[r][c] === 2) virusPos.push([r, c]);
    }
  }
  return virusPos;
};

const isOut = (r, c) => r < 0 || r >= N || c < 0 || c >= M;

const getSafeCnt = () => {
  // const newMap = JSON.parse(JSON.stringify(map))
  const newMap = map.map((v) => [...v]);
  const queue = [];
  const visited = Array.from({ length: N }, () =>
    Array.from({ length: M }, () => false)
  );
  const virusPos = getVirusPos();
  let head = 0;
  virusPos.forEach(([r, c]) => {
    queue.push([r, c]);
    visited[r][c] = true;
  });
  while (queue.length > head) {
    const [cr, cc] = queue[head++];
    for (let i = 0; i < dr.length; i++) {
      const [nr, nc] = [cr + dr[i], cc + dc[i]];
      if (isOut(nr, nc) || visited[nr][nc]) continue;
      if (newMap[nr][nc] === 1 || newMap[nr][nc] === 2) continue;
      newMap[nr][nc] = 2;
      visited[nr][nc] = true;
      queue.push([nr, nc]);
    }
  }
  let safeCnt = 0;
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < M; c++) {
      if (newMap[r][c] === 0) safeCnt++;
    }
  }
  return safeCnt;
};

let ans = 0;
const dfs = (wallCnt) => {
  if (wallCnt === MAX_WALL_CNT) {
    // console.log(map)
    const safeCnt = getSafeCnt();
    ans = Math.max(ans, safeCnt);
    return;
  }
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < M; c++) {
      if (map[r][c] === 1 || map[r][c] === 2) continue;
      map[r][c] = 1;
      dfs(wallCnt + 1);
      map[r][c] = 0;
    }
  }
};
dfs(0);
console.log(ans);

/*
9:03 ~ 9:53 (50m)

벽을 세워야 하는 위치를 어떻게 알 수 있지?
그리디로 알기 어렵다

바이러스가 퍼질 떼마다 모든 경우의 수 벽 세우고, 
더이상 바이러스 안 퍼질 때 최대 안전영역 크기 구하기

8*8=64
벽을 세우냐 마냐라서 2^64 시간초과날 거 같은데..
근데 다른 방법이 안 떠올라서 그대로 함

8 8
2 0 0 0 0 0 0 2
2 0 0 0 0 0 0 2
2 0 0 0 0 0 0 2
2 0 0 0 0 0 0 2
2 0 0 0 0 0 0 2
0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0
-> 시간초과
벽이 하나도 없으면 모서리를 공략해야 하나?
근데 애초에 8*8에서 시간초과날 거였으면 7*7에서도 시간초과나야 하는 거 아닌가?

다른사람풀이: bfs, dfs 사용하는 거 나랑 로직 똑같이 했는데 왜 난 안되지?
배열 깊은 복사할 때 방법이 달랐음
-> JSON.parse(JSON.stringify(map)) 대신 map.map((v) => [...v])로 변경하니 해결
*/
