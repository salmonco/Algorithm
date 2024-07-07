const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const answer = [];
const dr = [0, 0, -1, 1];
const dc = [1, -1, 0, 0];
let curW, curH;
let board;
let cost; // 로봇 위치, 더러운 칸 각각 사이의 거리

const isOut = (r, c) => r < 0 || r >= curH || c < 0 || c >= curW;

const bfs = (pos, i) => {
  const [cr, cc] = pos;
  const visited = Array.from({ length: curH }, () =>
    Array.from({ length: curW }, () => false)
  );
  visited[cr][cc] = true;
  const queue = [];
  let head = 0;
  queue.push([cr, cc, 0]);
  while (queue.length > head) {
    const [r, c, cnt] = queue[head++];
    for (let k = 0; k < dr.length; k++) {
      const [nr, nc] = [r + dr[k], c + dc[k]];
      if (isOut(nr, nc) || visited[nr][nc] || board[nr][nc] == "x") continue;
      visited[nr][nc] = true;
      queue.push([nr, nc, cnt + 1]);
      if (
        board[nr][nc] === "." ||
        board[nr][nc] <= i ||
        cost[i][board[nr][nc]] <= cnt + 1
      )
        continue;
      cost[i][board[nr][nc]] = cnt + 1;
      cost[board[nr][nc]][i] = cnt + 1;
    }
  }
};

while (true) {
  const [W, H] = input.shift().split(" ").map(Number);
  curW = W;
  curH = H;
  if (H == 0) {
    console.log(answer.join("\n"));
    return;
  }
  board = [];
  for (let i = 0; i < H; i++) {
    const line = input.shift().split("");
    // cost 구하기
    board.push(line);
  }
  const points = [];
  let symbol = 1;
  for (let i = 0; i < H; i++) {
    for (let j = 0; j < W; j++) {
      if (board[i][j] == "o") {
        board[i][j] = 0;
        points.unshift([i, j]);
      } else if (board[i][j] == "*") {
        board[i][j] = symbol++;
        points.push([i, j]);
      }
    }
  }
  // console.log(points, board)
  cost = Array.from({ length: points.length }, () =>
    Array.from({ length: points.length }, () => Infinity)
  );
  for (let i = 0; i < points.length; i++) {
    bfs(points[i], i);
  }
  // console.log(cost)
  // cost를 기반으로 최소 이동 횟수 구하기
  const visited = Array.from({ length: points.length }, () => false);
  let result = Infinity;
  visited[0] = true;

  function dfs(now, sum, cnt) {
    if (sum > result) return;
    if (cnt == points.length) {
      result = Math.min(result, sum);
      return;
    }
    const next = cost[now];
    for (let i = 0; i < points.length; i++) {
      if (visited[i]) continue;
      visited[i] = true;
      dfs(i, sum + next[i], cnt + 1);
      visited[i] = false;
    }
  }
  dfs(0, 0, 1);
  if (result == Infinity) result = -1;
  answer.push(result);
}

// const input = require("fs")
//   .readFileSync("/dev/stdin")
//   .toString()
//   .trim()
//   .split("\n");
// const dr = [0, -1, 0, 1];
// const dc = [-1, 0, 1, 0];
// let curW, curH;
// let room;

// const getPermutations = (arr) => {
//   if (arr.length === 0) return [[]];
//   const result = [];

//   arr.forEach((item, i) => {
//     const rest = arr.slice(0, i).concat(arr.slice(i + 1));
//     const restPermutations = getPermutations(rest);
//     const attached = restPermutations.map((p) => [item, ...p]);
//     result.push(...attached);
//   });

//   return result;
// };

// const isOut = (r, c) => {
//   return r < 0 || r >= curH || c < 0 || c >= curW;
// };

// const bfs = (pos) => {
//   const [r, c] = pos;
//   const dist = Array.from({ length: curH }, () =>
//     Array.from({ length: curW }, () => 0)
//   );
//   dist[r][c] = 1;
//   const queue = [pos];
//   let head = 0;
//   while (queue.length > head) {
//     const [r, c] = queue[head++];
//     for (let i = 0; i < dr.length; i++) {
//       const [nr, nc] = [r + dr[i], c + dc[i]];
//       if (isOut(nr, nc) || dist[nr][nc] || room[nr][nc] === "x") continue;
//       dist[nr][nc] = dist[r][c] + 1;
//       queue.push([nr, nc]);
//     }
//   }
//   return dist;
// };

// let line = 0;
// while (input[line] !== "0 0") {
//   const [W, H] = input[line].split(" ").map(Number);
//   curW = W;
//   curH = H;

//   room = [];
//   let robotPos;
//   const dirtyPos = [];
//   for (let i = 0; i < H; i++) {
//     const row = input[line + 1 + i].split("");
//     for (let j = 0; j < row.length; j++) {
//       if (row[j] === "o") robotPos = [i, j];
//       else if (row[j] === "*") dirtyPos.push([i, j]);
//     }
//     room[i] = row;
//   }
//   // console.log(line, room)
//   const robotToDirty = Array.from({ length: dirtyPos.length }, () => 0);
//   let dist = bfs(robotPos);
//   // console.log(dist)
//   let isRobotCanVisitAllDirtyPos = true;
//   for (let i = 0; i < dirtyPos.length; i++) {
//     const [r, c] = dirtyPos[i];
//     let temp = dist[r][c];
//     if (!temp) {
//       // 로봇 청소기가 방문할 수 없는 더러운 칸이 있으면
//       isRobotCanVisitAllDirtyPos = false;
//       break;
//     }
//     robotToDirty[i] += temp - 1;
//   }
//   if (!isRobotCanVisitAllDirtyPos) {
//     console.log(-1);
//     line += H + 1;
//     continue;
//   }
//   const dirtyToDirty = Array.from({ length: dirtyPos.length }, () =>
//     Array.from({ length: dirtyPos.length }, () => 0)
//   );
//   for (let i = 0; i < dirtyPos.length - 1; i++) {
//     dist = bfs(dirtyPos[i]);
//     for (let j = i + 1; j < dirtyPos.length; j++) {
//       const [nr, nc] = dirtyPos[j];
//       dirtyToDirty[i][j] = dist[nr][nc] - 1;
//       dirtyToDirty[j][i] = dist[nr][nc] - 1;
//     }
//   }
//   let ans = Infinity;
//   const permutations = getPermutations([...Array(dirtyToDirty.length).keys()]);
//   // console.log([...Array(dirtyToDirty.length).keys()], permutations)
//   permutations.forEach((li) => {
//     let start = li[0];
//     let temp = robotToDirty[start];
//     for (let i = 1; i < li.length; i++) {
//       const end = li[i];
//       temp += dirtyToDirty[start][end];
//       start = end;
//     }
//     ans = Math.min(ans, temp);
//   });
//   console.log(ans);

//   line += H + 1;
// }

/*
방의 정보가 주어졌을 때, 더러운 칸을 모두 깨끗한 칸으로 만드는데 필요한 이동 횟수의 최솟값을 구하는 프로그램을 작성하시오.
- 로봇 청소기의 위치로부터 더러운 칸까지의 거리, 모든 더러운 칸 사이의 거리를 구하기(bfs)
- 모두 깨끗한 칸으로 바꾸는 이동횟수는, 청소하려는 칸의 순서에 따라 달라짐(순열)

bfs 완전 탐색 + 순열
-> 10%에서 메모리 초과

https://lhoiktiv.tistory.com/897
- 로봇 청소기의 위치로부터 더러운 칸까지의 거리, 모든 더러운 칸 사이의 거리를 구하기(bfs),
- 구해진 거리를 기반으로 최소 이동 횟수 구하기(dfs)
*/
