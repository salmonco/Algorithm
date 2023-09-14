const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));
const [N, M, K] = input[0];
const A = Array.from({ length: N }, () => Array.from({ length: N }));
for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    A[i][j] = input[i + 1][j];
  }
}

const yangbun = Array.from({ length: N }, () =>
  Array.from({ length: N }, () => 5)
);
// 나무: [x, y, age, isDead]
let trees = [];
for (let i = 0; i < M; i++) {
  const [x, y, age] = input[i + 1 + N];
  trees.push([x - 1, y - 1, age, false]);
}
trees.sort((a, b) => b[2] - a[2]);
// console.log(A, trees)
const dx = [-1, -1, -1, 0, 0, 1, 1, 1];
const dy = [-1, 0, 1, -1, 1, -1, 0, 1];
let year = 0;

while (year < K) {
  // console.log(yangbun, trees, 'spring----------')
  for (let i = trees.length - 1; i >= 0; i--) {
    const tree = trees[i];
    const [x, y, age] = tree;

    if (age > yangbun[x][y]) {
      tree[3] = true;
      continue;
    }
    yangbun[x][y] -= age;
    tree[2]++;
  }
  // console.log(yangbun, trees, 'summer')
  trees = trees.filter((tree) => {
    const [x, y, age, isDead] = tree;

    if (!isDead) return true;
    yangbun[x][y] += Math.floor(age / 2);
    return false;
  });
  // console.log(yangbun, trees, 'autumn')
  for (let i = 0; i < trees.length; i++) {
    const tree = trees[i];
    const [x, y, age] = tree;

    if (age % 5 !== 0) continue;
    for (let j = 0; j < dx.length; j++) {
      const [r, c] = [x + dx[j], y + dy[j]];

      if (r < 0 || r >= N || c < 0 || c >= N) continue;
      trees.push([r, c, 1, false]);
    }
  }
  // console.log(yangbun, trees, 'winter')
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      yangbun[i][j] += A[i][j];
    }
  }
  year++;
}
console.log(trees.length);

/*
(r, c) r과 c는 1부터 시작
-> 내부에서 만든 배열은 모두 인덱스 0부터 시작하는 걸로 통일
모든 칸에 처음 양분 5

봄: 나이만큼 양분 먹고, 나이 1 증가. 한 칸에 나무 여러 개 있으면 나이가 어린 나무부터 양분 먹는다. 자신의 나이만큼 양분을 먹을 수 없는 나무는 즉시 죽는다.
-> 어린 나무만 양분 먹는 게 아니라, 남은 양분을 나머지 나무들이 순차적으로 먹는 거임
-> 나이 때문에 양분 먹어도 죽을 거면, 양분을 아예 안 먹고 죽는지 아님 최대한 먹고 죽는지? 즉시 죽는다 했으니 전자가 맞을 듯
여름: 각각의 죽은 나무마다 나이를 2로 나눈 값이 나무가 있던 칸에 양분으로 추가된다. 소수점 아래는 버린다.
가을: 나이가 5의 배수인 나무는 번식. 인접한 8개의 칸에 나이가 1인 나무가 생긴다. 땅을 벗어나는 칸에는 나무가 생기지 않는다.
겨울: 각 칸에 A[r][c]만큼 양분 추가

K년이 지난 후 살아있는 나무의 개수 구하기
*/
