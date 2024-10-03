const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));
const [N] = input[0];
const map = input.slice(1);
const dr = [-1, 0, 0, 1];
const dc = [0, -1, 1, 0];

const getBabyPos = () => {
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (map[i][j] === 9) return [i, j];
    }
  }
  return null;
};

const isOut = (r, c) => r < 0 || r >= N || c < 0 || c >= N;

const getEatPos = (r, c, size) => {
  const queue = [[r, c, 0]];
  const visited = Array.from({ length: N }, () =>
    Array.from({ length: N }, () => false)
  );
  let head = 0;
  visited[r][c] = true;
  const candidates = [];
  let minDepth = Infinity;
  while (queue.length > head) {
    const [cr, cc, depth] = queue[head++];
    // console.log(cr, cc)
    if (depth > minDepth) break;
    if (!(cr === r && cc === c) && map[cr][cc] !== 0 && map[cr][cc] < size) {
      candidates.push([cr, cc, depth]);
      minDepth = depth;
      continue;
    }
    for (let i = 0; i < dr.length; i++) {
      const [nr, nc] = [cr + dr[i], cc + dc[i]];
      if (isOut(nr, nc) || visited[nr][nc] || map[nr][nc] > size) continue;
      visited[nr][nc] = true;
      queue.push([nr, nc, depth + 1]);
    }
  }
  // console.log(candidates)
  if (candidates.length === 0) return null;
  candidates.sort((a, b) => a[1] - b[1]).sort((a, b) => a[0] - b[0]);
  return candidates[0];
};

const babyPos = getBabyPos();

let [r, c] = babyPos;
map[r][c] = 0;
let size = 2;
let eatCnt = 0;
let ans = 0;
while (true) {
  if (getEatPos(r, c, size) === null) break;
  const [er, ec, depth] = getEatPos(r, c, size);
  // console.log(er, ec, size, eatCnt)
  ans += depth;
  map[er][ec] = 0;
  r = er;
  c = ec;
  eatCnt++;
  if (eatCnt === size) {
    size++;
    eatCnt = 0;
  }
}
console.log(ans);

// const eatPos = getEatPos(3, 1, 3)
// console.log(eatPos)

/*
오래 걸림. bfs+시뮬

N×N 크기의 공간에 물고기 M마리와 아기 상어 1마리가 있다.
아기 상어와 물고기는 모두 크기를 가지고 있고, 이 크기는 자연수이다.
가장 처음에 아기 상어의 크기는 2이고, 아기 상어는 1초에 상하좌우로 인접한 한 칸씩 이동한다.
아기 상어는 자신의 크기보다 작은 물고기만 먹을 수 있다.
크기가 같은 물고기는 먹을 수 없지만, 그 물고기가 있는 칸은 지나갈 수 있다.
아기 상어는 자신의 크기와 같은 수의 물고기를 먹을 때 마다 크기가 1 증가한다. 예를 들어, 크기가 2인 아기 상어는 물고기를 2마리 먹으면 크기가 3이 된다.
(2 ≤ N ≤ 20)
0: 빈 칸
1, 2, 3, 4, 5, 6: 칸에 있는 물고기의 크기
9: 아기 상어의 위치

-> 테케 4 실패
다른사람풀이: https://tesseractjh.tistory.com/198
처음에는 문제에서 주어진 먹이를 먹는 순서를 상, 좌, 우, 하 순서로 4방향을 탐색하는 것으로 구현하였다. 그렇게 해서 처음으로 먹을 수 있는 크기의 물고기가 탐색되면 먹고 탐색을 종료시키도록 하였다. 그러나 이는 올바른 순서로 먹이를 먹는 것을 보장하지 못하여 테스트 케이스 4번에서 실패하였다. 테스트 케이스 4번에서 원래 정답이 60인데 56이 나온다면 이 부분 때문일 것이다.
동일한 거리에 있는 먹을 수 있는 물고기 중에서 어떤 물고기를 먹어야 하는지는 x좌표, y좌표 순으로 비교하여 더 작은 쪽 좌표의 물고기를 먹도록 하면 된다.

왜 상, 좌, 우 하 순서로 bfs 탐색해서 젤 먼저 찾아지는 물고기를 먹는 것이 순서를 보장하지 않는 걸까?
그렇네.. 아래 예제 보면 아래에 있는 1이 위에 있는 1보다 먼저 찾아진다.
5 4 2 2 3 4
4 2 2 2 4 5
3 2 9 2 1 6
2 1 2 2 4 5
3 2 1 6 5 4
6 6 6 6 6 6
[[0,2], [2,1], [2,3], [3,2]]
[[0,2], [1,1], [1,3], [2,0], ([3,1]), ([2,4]), [3,3] ([4,2])]
-> 더 위에 있는 [2,4]를 먼저 찾아야 하는데 [3,1]이 먼저 찾아진다.

현재 위치에서 먹이까지 거리 구할 때 abs(r-er) + abs(c-ec)로 했음 -> 실패
-> 중간에 지나갈 수 없는 위치들이 있으므로 depth를 더해야 함
*/
