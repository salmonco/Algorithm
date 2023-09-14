const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));
const [N, M] = input[0];
const map = [];

for (let i = 0; i < N; i++) {
  map.push(input[1 + i]);
}

const visited = Array.from({ length: N }, () =>
  Array.from({ length: M }, () => false)
);
const dx = [0, 1, 0, -1];
const dy = [1, 0, -1, 0];

let cnt = 1;

const isOut = (x, y) => {
  return x < 0 || x >= N || y < 0 || y >= M;
};

for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (visited[i][j] || !map[i][j]) continue;
    const queue = [[i, j]];

    map[i][j] = cnt;
    while (queue.length) {
      const [i, j] = queue.shift();

      for (let k = 0; k < dx.length; k++) {
        const [r, c] = [dx[k], dy[k]];

        if (
          !isOut(i + r, j + c) &&
          !visited[i + r][j + c] &&
          map[i + r][j + c]
        ) {
          map[i + r][j + c] = cnt;
          visited[i + r][j + c] = true;
          queue.push([i + r, j + c]);
        }
      }
    }
    cnt++;
  }
}

const vertexCnt = cnt - 1;
const graph = [];

for (let i = 0; i < N; i++) {
  let startVertex = null;
  let len = 0;

  for (let j = 0; j < M; j++) {
    const current = map[i][j];

    if (!startVertex) {
      if (current) {
        startVertex = current;
      }
      continue;
    }
    if (!current) {
      len++;
      if (isOut(i, j + 1)) continue;
      const next = map[i][j + 1];

      if (next) {
        if (len >= 2) {
          const finVertex = next;

          graph.push([startVertex, finVertex, len]);
        }
        len = 0;
        startVertex = null;
      }
      continue;
    }
    startVertex = current;
  }
}

for (let j = 0; j < M; j++) {
  let startVertex = null;
  let len = 0;

  for (let i = 0; i < N; i++) {
    const current = map[i][j];

    if (!startVertex) {
      if (current) {
        startVertex = current;
      }
      continue;
    }
    if (!current) {
      len++;
      if (isOut(i + 1, j)) continue;
      const next = map[i + 1][j];

      if (next) {
        if (len >= 2) {
          const finVertex = next;

          graph.push([startVertex, finVertex, len]);
        }
        len = 0;
        startVertex = null;
      }
      continue;
    }
    startVertex = current;
  }
}
// console.log(map, graph)
graph.sort((a, b) => a[2] - b[2]);
const parents = Array.from({ length: vertexCnt + 1 }, () => -1);

const find = (x) => {
  if (parents[x] === -1) return x;
  parents[x] = find(parents[x]);
  return parents[x];
};

const union = (x, y) => {
  const p1 = find(x);
  const p2 = find(y);

  if (p1 < p2) parents[p2] = p1;
  else parents[p1] = p2;
};

const isCycle = (x, y) => {
  const p1 = find(x);
  const p2 = find(y);

  return p1 === p2;
};

const selectedEdges = [];

for (let i = 0; i < graph.length; i++) {
  if (selectedEdges.length === vertexCnt - 1) break;
  const [x, y, len] = graph[i];

  if (isCycle(x, y)) continue;
  union(x, y);
  selectedEdges.push(graph[i]);
}

console.log(
  selectedEdges.length === vertexCnt - 1
    ? selectedEdges.reduce((p, c) => p + c[2], 0)
    : -1
);

/*
연결할 수 있는 간선 후보를 만들어놓고 길이 작은 거부터 연결해가기

0 0 0 0 0 0 1 1
2 2 + + + + 1 1
2 2 0 0 0 0 0 +
2 2 + + + 3 3 +
+ + 0 0 0 3 3 +
+ + 0 0 0 0 0 +
4 4 4 4 4 4 4 4

1 0 0 2 2 2 0 0
0 0 3 0 0 0 4 4
0 0 3 0 0 0 4 4
0 0 3 3 3 0 0 0
0 0 0 0 0 0 0 0
0 5 5 5 0 0 0 0
5 5 5 5 5 5 0 0

0 1 0 2
2 0 0 2
2 0 0 2
2 2 2 2
*/
