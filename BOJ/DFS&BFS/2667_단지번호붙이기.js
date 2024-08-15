const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const N = +input[0];
const dr = [-1, 1, 0, 0];
const dc = [0, 0, -1, 1];
const map = [];

for (let i = 0; i < N; i++) {
  const arr = input[i + 1].split("").map(Number);
  map[i] = arr;
}

const isOut = (r, c) => r < 0 || r >= N || c < 0 || c >= N;

const bfs = (r, c) => {
  const queue = [[r, c]];
  let head = 0;
  let cnt = 0;
  map[r][c] = 0;
  while (queue.length > head) {
    const [cr, cc] = queue[head++];
    cnt++;
    for (let i = 0; i < dr.length; i++) {
      const [nr, nc] = [cr + dr[i], cc + dc[i]];
      if (isOut(nr, nc) || map[nr][nc] === 0) continue;
      queue.push([nr, nc]);
      map[nr][nc] = 0;
    }
  }
  return cnt;
};

const ans = [];
let houseCnt = 0;
for (let r = 0; r < N; r++) {
  for (let c = 0; c < N; c++) {
    if (map[r][c] === 0) continue;
    const cnt = bfs(r, c);
    ans.push(cnt);
    houseCnt++;
  }
}
console.log(houseCnt);
console.log(ans.sort((a, b) => a - b).join("\n"));

/*
정사각형 모양의 지도가 있다. 1은 집이 있는 곳을, 0은 집이 없는 곳을 나타낸다.
여기서 연결되었다는 것은 어떤 집이 좌우, 혹은 아래위로 다른 집이 있는 경우를 말한다. 대각선상에 집이 있는 경우는 연결된 것이 아니다.
지도를 입력하여 단지수를 출력하고, 각 단지에 속하는 집의 수를 오름차순으로 정렬하여 출력하는 프로그램을 작성하시오.

9:33~9:40 (7m)
*/
