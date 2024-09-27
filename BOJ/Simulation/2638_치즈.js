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

const isOut = (r, c) => r < 0 || r >= N || c < 0 || c >= M;

const checkAirPass = () => {
  const queue = [[0, 0]];
  const visited = Array.from({ length: N }, () =>
    Array.from({ length: M }, () => false)
  );
  let head = 0;
  visited[0][0] = 2;
  while (queue.length > head) {
    const [cr, cc] = queue[head++];
    for (let i = 0; i < dr.length; i++) {
      const [nr, nc] = [cr + dr[i], cc + dc[i]];
      if (isOut(nr, nc) || visited[nr][nc] || map[nr][nc] === 1) continue;
      map[nr][nc] = 2; // air pass
      queue.push([nr, nc]);
      visited[nr][nc] = true;
    }
  }
};

let ans = 0;
while (true) {
  const melt = [];
  checkAirPass();
  for (let r = 1; r < N - 1; r++) {
    for (let c = 1; c < M - 1; c++) {
      if (map[r][c] === 0) continue;
      let airPassCnt = 0;
      for (let i = 0; i < dr.length; i++) {
        const [nr, nc] = [r + dr[i], c + dc[i]];
        if (map[nr][nc] === 1 || map[nr][nc] === 0) continue;
        airPassCnt++;
      }
      if (airPassCnt < 2) continue;
      melt.push([r, c]);
    }
  }
  // console.log(melt)
  // if (melt.length === 0) break
  melt.forEach(([r, c]) => {
    map[r][c] = 2;
  });
  ans++;

  let isCheeseThere = false;
  for (const arr of map) {
    for (const v of arr) {
      if (v === 1) {
        isCheeseThere = true;
        break;
      }
    }
    if (isCheeseThere) break;
  }
  if (!isCheeseThere) break;
}
console.log(ans);

/*
모눈종이 모양의 치즈에서 각 치즈 격자(작 은 정사각형 모양)의 4변 중에서 적어도 2변 이상이 실내온도의 공기와 접촉한 것은 정확히 한시간만에 녹아 없어져 버린다.
치즈 내부에 있는 공간은 치즈 외부 공기와 접촉하지 않는 것으로 가정한다. 그러므 로 이 공간에 접촉한 치즈 격자는 녹지 않고 C로 표시된 치즈 격자만 사라진다.
입력으로 주어진 치즈가 모두 녹아 없어지는데 걸리는 정확한 시간을 구하는 프로그램을 작성하시오.
(5 ≤ N, M ≤ 100)
치즈가 있는 부분은 1로 표시되고, 치즈가 없는 부분은 0으로 표시

공기 통하는지 안 통하는지 확인
처음시도: 상하좌우 뚫려있는지 확인 -> 실패
둘째시도: 완전탐색으로 가장자리까지 닿는지 확인 -> 시간초과
다른사람풀이: 각각 위치에서 공기 통하는지 확인하지 말고, (0,0)위치에서 bfs돌려서 한 번에 공기 통하는 위치 모두 확인 가능. 공기 안 통하는 곳에는 치즈들로 막아져서 못 가므로.
-> 시간초과 -> 종료조건을 녹이고 녹은 거 확인하는 거 대신 바로 치즈 있는지 확인

치즈 녹이기
*/
