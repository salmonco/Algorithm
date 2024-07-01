const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const [R, C] = input[0].split(" ").map(Number);
const map = input.slice(1).map((v) => v.split(""));
// console.log(R,C,map)
const dr = [0, -1, 1, 0];
const dc = [-1, 0, 0, 1];

const isOut = (r, c) => {
  return r < 0 || r >= map.length || c < 0 || c >= map[0].length;
};

function melting(waterQueue, liver, R, C) {
  const next = [];
  let head = 0;
  while (waterQueue.length > head) {
    const [r, c] = waterQueue[head++];
    for (let i = 0; i < 4; i++) {
      const nr = r + dr[i];
      const nc = c + dc[i];
      if (isOut(nr, nc)) continue;
      if (liver[nr][nc] === "X") {
        liver[nr][nc] = ".";
        next.push([nr, nc]);
      }
    }
  }
  return next;
}

function isFoundDuck(duckQueue, liver, visited, R, C) {
  const next = [];
  let head = 0;
  while (duckQueue.length > head) {
    const [r, c] = duckQueue[head++];
    for (let i = 0; i < 4; i++) {
      const nr = r + dr[i];
      const nc = c + dc[i];
      if (isOut(nr, nc) || visited[nr][nc]) continue;
      if (liver[nr][nc] === ".") {
        visited[nr][nc] = true;
        duckQueue.push([nr, nc]);
        continue;
      }
      if (liver[nr][nc] === "X") next.push([r, c]);
      else if (liver[nr][nc] === "L") return true;
    }
  }
  return next;
}

function solution(R, C, liver) {
  let duckQueue = [];
  let waterQueue = [];
  let isFounded = false;
  let result = 0;
  const visited = Array.from({ length: R }, () =>
    Array.from({ length: C }, () => false)
  );

  //setting
  for (let i = 0; i < R; i++) {
    for (let j = 0; j < C; j++) {
      if (liver[i][j] === ".") waterQueue.push([i, j]);
      else if (!isFounded && liver[i][j] === "L") {
        waterQueue.push([i, j]);
        liver[i][j] = ".";
        visited[i][j] = true;
        duckQueue.push([i, j]);
        isFounded = true;
      } else if (isFounded && liver[i][j] === "L") {
        waterQueue.push([i, j]);
      }
    }
  }

  //play logic
  while (true) {
    duckQueue = isFoundDuck(duckQueue, liver, visited, R, C);
    if (duckQueue === true) {
      console.log(result);
      break;
    }
    waterQueue = melting(waterQueue, liver, R, C);
    result++;
  }
}

solution(R, C, map);

/*
waterQueue: 물 위치 저장하는 큐. 매번 melting하고 물 위치 저장
duckQueue: 백조의 시작 위치 저장하는 큐. 매번 isFoundDuck으로 위치 업데이트
*/
