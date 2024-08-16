const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));
const [N] = input[0];
const dr = [-1, 1, 0, 0];
const dc = [0, 0, -1, 1];
const map = [];
const set = new Set();
for (let i = 1; i <= N; i++) {
  const arr = input[i];
  map.push(arr);
  for (let j = 0; j < arr.length; j++) {
    const c = arr[j];
    set.add(c);
  }
}
const sorted = Array.from(set).sort((a, b) => a - b);

const isOut = (r, c) => r < 0 || r >= N || c < 0 || c >= N;

const bfs = (r, c, m, limit) => {
  const queue = [[r, c]];
  let head = 0;
  m[r][c] = 0;
  while (queue.length > head) {
    const [cr, cc] = queue[head++];
    for (let i = 0; i < dr.length; i++) {
      const [nr, nc] = [cr + dr[i], cc + dc[i]];
      if (isOut(nr, nc) || m[nr][nc] <= limit) continue;
      queue.push([nr, nc]);
      m[nr][nc] = 0;
    }
  }
  return m;
};

let max = 1;
for (const h of sorted) {
  let cnt = 0;
  let m = JSON.parse(JSON.stringify(map));
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      if (m[r][c] <= h) continue;
      m = bfs(r, c, m, h);
      cnt++;
    }
  }
  max = Math.max(max, cnt);
}
console.log(max);

/*
물에 잠기지 않는 안전한 영역이라 함은 물에 잠기지 않는 지점들이 위, 아래, 오른쪽 혹은 왼쪽으로 인접해 있으며 그 크기가 최대인 영역을 말한다.
이와 같이 장마철에 내리는 비의 양에 따라서 물에 잠기지 않는 안전한 영역의 개수는 다르게 된다. 위의 예와 같은 지역에서 내리는 비의 양에 따른 모든 경우를 다 조사해 보면 물에 잠기지 않는 안전한 영역의 개수 중에서 최대인 경우는 5임을 알 수 있다.
어떤 지역의 높이 정보가 주어졌을 때, 장마철에 물에 잠기지 않는 안전한 영역의 최대 개수를 계산하는 프로그램을 작성하시오.
N은 2 이상 100 이하의 정수이다.
높이는 1이상 100 이하의 정수이다.

최소 높이부터 bfs 돌려서 cnt가 더 커지지 않으면 스탑
-> 2%에서 실패
-> 가능한 높이 다 돌려보기

-> 69%에서 실패
-> max의 초기값은 1 -> 아무 지역도 물에 잠기지 않는 경우

12:19~1:01 (42m)
*/
