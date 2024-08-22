const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));
const [N, M, G, R] = input[0];
const map = input.slice(1);

const dr = [-1, 1, 0, 0];
const dc = [0, 0, -1, 1];

const waterPos = [];
for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (map[i][j] === 2) waterPos.push([i, j]);
  }
}

const getCombinations = (arr, selectNumber) => {
  const results = [];
  if (selectNumber === 1) return arr.map((el) => [el]); // n개중에서 1개 선택할 때(nC1), 바로 모든 배열의 원소 return
  arr.forEach((fixed, index, origin) => {
    const rest = origin.slice(index + 1); // 해당하는 fixed를 제외한 나머지 뒤
    const combinations = getCombinations(rest, selectNumber - 1); // 나머지에 대해서 조합을 구한다.
    const attached = combinations.map((el) => [fixed, ...el]); //  돌아온 조합에 떼 놓은(fixed) 값 붙이기
    results.push(...attached);
  });
  return results;
};

const isOut = (r, c) => r < 0 || r >= N || c < 0 || c >= M;

const simulate = (gPos, rPos) => {
  const gTime = Array.from({ length: N }, () =>
    Array.from({ length: M }, () => -1)
  );
  const rTime = Array.from({ length: N }, () =>
    Array.from({ length: M }, () => -1)
  );
  const flowerPos = Array.from({ length: N }, () =>
    Array.from({ length: M }, () => false)
  );
  const queue = [];
  let flowerCnt = 0;
  for (const [r, c] of gPos) {
    queue.push([r, c, "G"]);
    gTime[r][c] = 0;
  }
  for (const [r, c] of rPos) {
    queue.push([r, c, "R"]);
    rTime[r][c] = 0;
  }
  let head = 0;
  while (queue.length > head) {
    const [cr, cc, color] = queue[head++];
    // console.log(cr, cc, gTime, rTime)
    // 이미 꽃 피운 위치인 경우
    if (flowerPos[cr][cc]) continue;

    const currentTime = color === "G" ? gTime[cr][cc] : rTime[cr][cc];
    for (let i = 0; i < dr.length; i++) {
      const [nr, nc] = [cr + dr[i], cc + dc[i]];
      if (isOut(nr, nc)) continue;
      if (map[nr][nc] === 0) continue;

      // 초록 배양액 퍼짐
      if (color === "G" && gTime[nr][nc] === -1) {
        // 이미 빨간색 배양액을 뿌린 경우
        if (rTime[nr][nc] >= 0 && rTime[nr][nc] <= currentTime) continue;
        gTime[nr][nc] = currentTime + 1;
        // 꽃이 피는 조건
        if (rTime[nr][nc] === currentTime + 1) {
          flowerCnt++;
          flowerPos[nr][nc] = true;
          continue;
        }
        queue.push([nr, nc, "G"]);
        continue;
      }

      // 빨간 배양액 퍼짐
      if (color === "R" && rTime[nr][nc] === -1) {
        // 이미 초록색 배양액을 뿌린 경우
        if (gTime[nr][nc] >= 0 && gTime[nr][nc] <= currentTime) continue;
        rTime[nr][nc] = currentTime + 1;
        // 꽃이 피는 조건
        if (gTime[nr][nc] === currentTime + 1) {
          flowerCnt++;
          flowerPos[nr][nc] = true;
          continue;
        }
        queue.push([nr, nc, "R"]);
      }
    }
  }
  // console.log(gTime, rTime)
  return flowerCnt;
};

// 가능한 배양액 위치 조합을 생성
let maxFlowerCnt = 0;
const pos = getCombinations(waterPos, G + R);
for (const p of pos) {
  const gPosArr = getCombinations(p, G);
  for (const gPos of gPosArr) {
    const rPos = p.filter((v) => !gPos.includes(v));
    // 초록, 빨강 위치 조합으로 배양액 뿌리기
    const cnt = simulate(gPos, rPos);
    maxFlowerCnt = Math.max(maxFlowerCnt, cnt);
    // console.log(gPos, rPos, cnt)
  }
}
console.log(maxFlowerCnt);

/*
정원은 땅과 호수로 이루어져 있고 2차원 격자판 모양이다.
초록색 배양액과 빨간색 배양액을 땅에 적절하게 뿌려서 꽃을 피울 것이다. 이 때 배양액을 뿌릴 수 있는 땅은 미리 정해져있다.
배양액은 매 초마다 이전에 배양액이 도달한 적이 없는 인접한 땅으로 퍼져간다.
초록색 배양액과 빨간색 배양액이 동일한 시간에 도달한 땅에서는 두 배양액이 합쳐져서 꽃이 피어난다.
꽃이 피어난 땅에서는 배양액이 사라지기 때문에 더 이상 인접한 땅으로 배양액을 퍼트리지 않는다.
주어진 모든 배양액을 남김없이 사용해야 한다. 또한 모든 배양액은 서로 다른 곳에 뿌려져야 한다.
정원과 두 배양액의 개수가 주어져있을 때 피울 수 있는 꽃의 최대 개수를 구해보자.
0은 호수, 1은 배양액을 뿌릴 수 없는 땅, 2는 배양액을 뿌릴 수 있는 땅을 의미한다.
배양액을 뿌릴 수 있는 땅의 수는 R+G개 이상이고 10개 이하이다.

1. 배양액 뿌릴 수 있는 땅 위치 구하기
-> waterPos 배열

2. 초록, 빨강 조합해가면서 최대 꽃 개수 카운팅
-> 배양액 뿌릴 수 있는 땅 위치 조합
처음시도: dfs, 위치 조합을 배열에 저장 -> 시간초과
다른사람풀이: 배양액 위치 조합을 먼저 만들기
-> getCombinations 함수로 G+R 조합 만들고, G 조합 만든 거 바탕으로 R 조합 생성

-> 배양액 뿌릴 수 있는 땅 각각부터 시작해서 몇 초 걸리는지 체크
처음시도: 같은 색의 배양색 각각 어떤 위치에 몇 초 걸리는지 카운팅해서, 각 위치의 카운트 최소값을 계산하여 gTime, rTime 배열 구하기
다른사람풀이: bfs로 구하면 배양액으로부터 각 위치까지 갈 수 있는 최소 시간이 구해짐

3. 피울 수 있는 꽃의 개수 구하기
처음시도: 구한 카운팅 배열 gTime, rTime을 비교해서 0보다 큰, 동일한 값의 개수 카운팅 -> 실패
* 유의할 점: 꽃 피우면 배양액 퍼지는 거 멈춘다.
다른사람풀이: 배양액 시작점을 큐에 넣고, color G, R 구별해서 bfs 돌리기
-> 꽃 피운 위치에서도 visited 체크해야 함

-> 실패 -> 이유: 큐에 이미 들어가있는 위치인데 그 위치에서 꽃이 피는 경우, 멈춰야 하는데 계속 인접한 위치 탐색함
-> 꽃 피는 위치를 따로 저장해서, 큐에서 위치 꺼내고 꽃 피는 위치랑 같으면 continue
*/
