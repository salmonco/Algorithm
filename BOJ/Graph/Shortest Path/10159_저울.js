const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));
const [N] = input[0];
const [M] = input[1];
const distance = Array.from({ length: N + 1 }, () =>
  Array.from({ length: N + 1 }, () => Infinity)
);

for (let i = 0; i < M; i++) {
  const [heavy, light] = input[2 + i];

  distance[heavy][light] = 1;
}

for (let k = 1; k <= N; k++) {
  for (let i = 1; i <= N; i++) {
    for (let j = 1; j <= N; j++) {
      distance[i][j] = Math.min(
        distance[i][j],
        distance[i][k] + distance[k][j]
      );
    }
  }
}

for (let i = 1; i <= N; i++) {
  let cantCompareCnt = 0;

  for (let j = 1; j <= N; j++) {
    if (i === j) continue;
    if (distance[i][j] === Infinity && distance[j][i] === Infinity) {
      cantCompareCnt++;
    }
  }
  console.log(cantCompareCnt);
}

/*
v->w or w->v 경로가 있는지 없는지 확인
-> 경로가 있으면 비교 가능. 없으면 비교 불가능
-> 최단 경로를 구해서 Infinity면 경로가 없는 것임

모든 정점에서 모든 정점으로 가는 최단 경로 구하기 (플로이드 워셜)
*/
