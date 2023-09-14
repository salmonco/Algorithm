const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));
const [N, M, V] = input[0];
const obj = {};
for (let i = 1; i <= N; i++) {
  obj[i] = [];
}
for (let i = 0; i < M; i++) {
  const [x, y] = input[i + 1];
  obj[x].push(y);
  obj[y].push(x);
}

// 작은 정점부터 탐색하기 위해 정렬
for (let i = 1; i <= N; i++) {
  obj[i].sort((a, b) => a - b);
}

// dfs
const mark = [];
const dfs = (start) => {
  if (mark.includes(start)) return;
  mark.push(start);

  const arr = obj[start];
  for (let i = 0; i < arr.length; i++) {
    if (mark.includes(arr[i])) continue;
    dfs(arr[i]);
  }
};
dfs(V);
console.log(mark.join(" "));

// bfs
const mark2 = [];
const queue = [];
const bfs = () => {
  while (queue.length) {
    const x = queue.shift();
    if (mark2.includes(x)) continue;
    mark2.push(x);

    const arr = obj[x];
    for (let i = 0; i < arr.length; i++) {
      if (mark2.includes(arr[i])) continue;
      queue.push(arr[i]);
    }
  }
};
queue.push(V);
bfs();
console.log(mark2.join(" "));

/*
1: [2, 3, 4]
2: [1, 4]
3: [1, 4]
4: [1, 2, 3]
방문한 정점은 마킹
(1,2) (2,4) (4,3)
*/
