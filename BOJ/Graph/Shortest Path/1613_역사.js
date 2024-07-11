const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));
const [n, k] = input[0];
const distance = Array.from({ length: n + 1 }, () =>
  Array.from({ length: n + 1 }, () => Infinity)
);

for (let i = 0; i < k; i++) {
  const [early, late] = input[1 + i];

  distance[early][late] = 1;
}

for (let k = 1; k <= n; k++) {
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= n; j++) {
      distance[i][j] = Math.min(
        distance[i][j],
        distance[i][k] + distance[k][j]
      );
    }
  }
}

const [s] = input[1 + k];

for (let i = 0; i < s; i++) {
  const [p1, p2] = input[2 + k + i];

  if (distance[p1][p2] === Infinity && distance[p2][p1] === Infinity) {
    console.log(0);
  } else if (distance[p1][p2] !== Infinity) {
    console.log(-1);
  } else {
    console.log(1);
  }
}

/*
저울(10159) 문제랑 비슷. 경로 있는지 없는지 구하는 용도로 최단 거리 알고리즘 사용

distance 저장할 때, 먼저 일어난 사건->후에 일어난 사건의 가중치를 임의로 1로 저장
v->w or w->v 중 Infinity가 아닌 것이 v->w라고 하면, v가 w보다 먼저 일어난 사건으로 판단
*/
