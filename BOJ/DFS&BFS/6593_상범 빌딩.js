const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const dr = [-1, 1, 0, 0, 0, 0];
const dc = [0, 0, -1, 1, 0, 0];
const dl = [0, 0, 0, 0, -1, 1];
let R, C, L;
let building;

const isOut = (l, r, c) =>
  r < 0 || r >= R || c < 0 || c >= C || l < 0 || l >= L;

const bfs = (l, r, c) => {
  const queue = [[l, r, c, 0]];
  let head = 0;
  building[l][r][c] = "#";
  while (queue.length > head) {
    const [cl, cr, cc, cnt] = queue[head++];
    // console.log(cl, cr, cc, building[cl][cr][cc])
    for (let i = 0; i < dr.length; i++) {
      const [nl, nr, nc] = [cl + dl[i], cr + dr[i], cc + dc[i]];
      if (isOut(nl, nr, nc) || building[nl][nr][nc] === "#") continue;
      if (building[nl][nr][nc] === "E") {
        return `Escaped in ${cnt + 1} minute(s).`;
      }
      queue.push([nl, nr, nc, cnt + 1]);
      building[nl][nr][nc] = "#";
    }
  }
  return "Trapped!";
};

const ans = [];
let line = 0;
while (input[line] !== "0 0 0") {
  const [l, r, c] = input[line++].split(" ").map(Number);
  let startPos;
  [R, C, L] = [r, c, l];
  building = [];
  for (let l = 0; l < L; l++) {
    const map = [];
    for (let r = 0; r < R; r++) {
      const arr = input[line++].split("");
      for (let c = 0; c < arr.length; c++) {
        const v = arr[c];
        if (v === "S") startPos = [l, r, c];
      }
      map.push(arr);
    }
    building.push(map);
    line++;
  }
  // console.log(building)
  const [sl, sr, sc] = startPos;
  // console.log(sl, sr, sc)
  const result = bfs(sl, sr, sc);
  ans.push(result);
}
console.log(ans.join("\n"));

/*
각 정육면체는 금으로 이루어져 있어 지나갈 수 없거나, 비어있어서 지나갈 수 있게 되어있다.
당신은 각 칸에서 인접한 6개의 칸(동,서,남,북,상,하)으로 1분의 시간을 들여 이동할 수 있다. 즉, 대각선으로 이동하는 것은 불가능하다. 
당신은 상범 빌딩을 탈출할 수 있을까? 만약 그렇다면 얼마나 걸릴까?
L(1 ≤ L ≤ 30)은 상범 빌딩의 층 수이다. R(1 ≤ R ≤ 30)과 C(1 ≤ C ≤ 30)는 상범 빌딩의 한 층의 행과 열의 개수를 나타낸다.
금으로 막혀있어 지나갈 수 없는 칸은 '#'으로 표현되고, 비어있는 칸은 '.'으로 표현된다. 당신의 시작 지점은 'S'로 표현되고, 탈출할 수 있는 출구는 'E'로 표현된다.
여기서 x는 상범 빌딩을 탈출하는 데에 필요한 최단 시간이다.

-> bfs라서 최단거리 찾기에 유용
만약 우선순위가 높은 노드를 먼저 방문해야 하는 조건이라면? 일반 큐 대신 우선순위큐 사용

9:41~10:12 (31m)
*/
