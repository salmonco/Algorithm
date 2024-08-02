// const input = require("fs")
//   .readFileSync("/dev/stdin")
//   .toString()
//   .trim()
//   .split("\n")
//   .map((v) => v.split(''))
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
// const N = +input[0][0];
const N = +input[0];
const map = [];
const dr = [-1, 0, 1, 0];
const dc = [0, 1, 0, -1];
let visited = Array.from({ length: N }, () =>
  Array.from({ length: N }, () => false)
);
let cnt = 0;
let rgSameCnt = 0;

for (let i = 0; i < N; i++) {
  // const arr = input[i+1]
  const arr = input[i + 1].split("");
  map[i] = arr;
}

const isOut = (r, c) => r < 0 || r >= N || c < 0 || c >= N;

const bfs = (r, c) => {
  const queue = [[r, c]];
  const color = map[r][c];
  let head = 0;
  visited[r][c] = true;
  while (queue.length > head) {
    const [cr, cc] = queue[head++];
    // console.log(cr, cc, color, visited, cnt)
    for (let i = 0; i < dr.length; i++) {
      const [nr, nc] = [cr + dr[i], cc + dc[i]];
      if (isOut(nr, nc) || visited[nr][nc]) continue;
      if (map[nr][nc] !== color) continue;
      visited[nr][nc] = true;
      queue.push([nr, nc]);
    }
  }
};

// 적록색약 아닌 경우
for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (visited[i][j]) continue;
    bfs(i, j);
    cnt++;
    // console.log(cnt, visited)
  }
}

// 적록색약인 경우
for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (map[i][j] === "G") {
      map[i][j] = "R";
    }
    visited[i][j] = false;
  }
}
// visited = Array.from({ length: N }, () => Array.from({ length: N }, () => false))
for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (visited[i][j]) continue;
    bfs(i, j);
    rgSameCnt++;
    // console.log(rgSameCnt, visited)
  }
}
console.log(cnt, rgSameCnt);

/*
적록색약은 빨간색과 초록색의 차이를 거의 느끼지 못한다.
RRRBB
GGBBB
BBBRR
BBRRR
RRRRR
적록색약이 아닌 사람이 봤을 때 구역의 수는 총 4개이다. (빨강 2, 파랑 1, 초록 1)
하지만, 적록색약인 사람은 구역을 3개 볼 수 있다. (빨강-초록 2, 파랑 1)

그림이 입력으로 주어졌을 때, 적록색약인 사람이 봤을 때와 아닌 사람이 봤을 때 구역의 수를 구하는 프로그램을 작성하시오.

-> bfs에서 적록색약 조건처리 or map에서 R과 G를 동일하게 해준 상태에서 bfs 돌리자
-> 4%에서 실패
-> input에서 N이랑 map 가져올 때, split을 먼저 했더니 실패. N을 가져온 이후 split했더니 됨. why?

chatGPT 답변:
const N = +input[0][0];은 input[0]이 이미 배열로 변환된 상태에서 첫 번째 요소의 첫 번째 문자를 가져오게 됩니다. 이는 문자열 "5"의 첫 번째 문자 '5'가 되어, 올바르게 숫자로 변환되지 않을 수 있습니다.
올바른 방식은 먼저 N을 정확히 파싱한 후, 각 줄을 문자로 분리하여 배열로 저장하는 것입니다.
-> 잘 이해가 가지 않음.
*/
