const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));
let parent;

const find = (v) => {
  if (parent[v] <= 0) return v;
  parent[v] = find(parent[v]);
  return parent[v];
};

const union = (v1, v2) => {
  const p1 = find(v1);
  const p2 = find(v2);
  if (p1 < p2) parent[p2] = p1;
  else parent[p1] = p2;
};

const isCycle = (v1, v2) => {
  return find(v1) === find(v2);
};

const ans = [];
let line = 0;
while (true) {
  const [N, M] = input[line];
  if (N === 0 && M === 0) break;
  parent = Array.from({ length: N + 1 }, () => -1);
  const cycle = [];
  for (let i = 0; i < M; i++) {
    // console.log(parent);
    const [v1, v2] = input[line + i + 1];
    if (isCycle(v1, v2)) {
      // const root = find(v1)
      // parent[root] = 0
      cycle.push(v1);
      continue;
    }
    union(v1, v2);
  }
  //   console.log(parent, "END");
  cycle.forEach((v) => {
    const root = find(v);
    parent[root] = 0;
  });

  const cnt = parent.filter((v) => v === -1).length - 1; // parent[0]의 -1을 제외
  ans.push(cnt);
  line += M + 1;
}
ans.forEach((v, i) => {
  let str = `Case ${i + 1}: `;
  if (v === 0) {
    str += `No trees.`;
  } else if (v > 1) {
    str += `A forest of ${v} trees.`;
  } else {
    str += `There is one tree.`;
  }
  console.log(str);
});

/*
트리는 사이클이 없는 연결 요소이다.
트리는 정점이 n개, 간선이 n-1개 있다. 또, 임의의 두 정점에 대해서 경로가 유일하다.
그래프가 주어졌을 때, 트리의 개수를 세는 프로그램을 작성하시오.

정점이 하나이고 간선이 없는 경우도 트리의 정의에 포함됨
parent가 -1인 것의 개수 세기
사이클이 있으면 그 그래프의 parent는 0으로 구분
-> 75%에서 실패. Why?
-> 사이클이 있는 sub graph가 다른 정점을 부모로 가질 수 있음. 이때 sub graph의 부모는 0이지만, 새로운 부모는 -1이라서 사이클이 있음에도 트리라고 계산됨
-> 사이클이 생기는 정점을 따로 저장해놓고, union 다 돌린 후에 사이클이 있는 parent를 0으로 구분
*/
