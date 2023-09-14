let input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .split("\n")
  .map((v) => v.split(" ").map(Number));

const N = 10;
let answer = Infinity;
const paperCnt = Array.from({ length: 6 }, () => 0);
const arr = JSON.parse(JSON.stringify(input));

const dfs = (idx, cnt) => {
  if (idx === N * N) {
    answer = Math.min(answer, cnt);
    return;
  }
  if (answer <= cnt) return;

  const r = parseInt(idx / N);
  const c = idx % N;

  if (!arr[r][c]) {
    dfs(idx + 1, cnt);
  } else {
    for (let size = 5; size >= 1; size--) {
      if (paperCnt[size] === 5 || !isOkay(r, c, size)) continue;
      paperCnt[size]++;
      fillZero(r, c, size);
      dfs(idx + 1, cnt + 1);
      paperCnt[size]--;
      fillOne(r, c, size);
    }
  }
};

const isOkay = (r, c, size) => {
  for (let i = r; i < r + size; i++) {
    for (let j = c; j < c + size; j++) {
      if (isOut(i, j) || !arr[i][j]) return false;
    }
  }
  return true;
};

const fillZero = (r, c, size) => {
  for (let i = r; i < r + size; i++) {
    for (let j = c; j < c + size; j++) {
      arr[i][j] = 0;
    }
  }
};

const fillOne = (r, c, size) => {
  for (let i = r; i < r + size; i++) {
    for (let j = c; j < c + size; j++) {
      arr[i][j] = 1;
    }
  }
};

const isOut = (r, c) => {
  return r < 0 && r >= N && c < 0 && c >= N;
};

dfs(0, 0);
console.log(answer === Infinity ? -1 : answer);

/*
우측 하단부터 1인 요소 찾기
해당 위치로부터 좌측, 좌측상단, 상단 쪽으로 둘러싼 곳에 1인 요소가 존재하는지 확인
존재한다면, 해당 위치를 우측 하단으로 하는 가능한 최대 크기의 색종이 붙이기
아니라면 그냥 크기 1짜리 색종이 붙이기
색종이 크기별로 몇 개 붙였는지 개수 세서 5 초과하는지 확인
*/

/*
반례 -> 우측 하단부터 탐색하는 건 그리디가 될 수 없음
-> 완전탐색. 색종이 큰 것부터 다 붙여보기
1 1 1 1 1 1 1 0 0 0
1 1 1 1 1 1 1 0 0 0
1 1 1 1 1 1 1 0 0 0
1 1 1 1 1 1 1 0 0 0
1 1 1 1 1 1 1 0 0 0
1 1 1 1 1 0 0 0 0 0
1 1 1 1 1 0 0 0 0 0
1 1 1 1 1 0 0 0 0 0
1 1 1 1 1 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0
*/
