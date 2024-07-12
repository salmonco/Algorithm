const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));
const [N, R, Q] = input[0];
const edges = {};
const tree = {};
const size = Array.from({ length: N + 1 }, () => 1); // 자신도 자신을 루트로 하는 서브트리에 포함되므로 0이 아닌 1에서 시작한다.
// let parent

for (let i = 1; i <= N; i++) {
  edges[i] = [];
  tree[i] = [];
}
for (let i = 0; i < N - 1; i++) {
  const [v1, v2] = input[i + 1];
  edges[v1].push(v2);
  edges[v2].push(v1);
}

const makeTree = (v, parent) => {
  for (let child of edges[v]) {
    if (child === parent) continue;
    // add Node to currentNode’s child
    tree[v].push(child);
    // set Node’s parent to currentNode
    // parent[child] = v
    makeTree(child, v);
  }
  return tree;
};

const countSubtreeNodes = (v) => {
  for (let child of tree[v]) {
    countSubtreeNodes(child);
    size[v] += size[child];
  }
};

makeTree(R, -1);
countSubtreeNodes(R);

const ans = [];
for (let i = 0; i < Q; i++) {
  const [U] = input[i + N];
  // parent = Array.from({ length: N+1 }, () => -1)
  ans.push(size[U]);
}
console.log(ans.join("\n"));

/*
간선에 가중치와 방향성이 없는 임의의 루트 있는 트리가 주어졌을 때, 아래의 쿼리에 답해보도록 하자.
정점 U를 루트로 하는 서브트리에 속한 정점의 수를 출력한다.

예를 들어, 5번 정점을 루트로 하는 트리에 대해, ‘정점 U를 루트로 하는 서브트리의 정점의 수는 얼마인가?’ 라는 질의가 다수 주어진다고 해 보자. U를 루트로 하는 서브트리란, 위에도 언급하였지만 정점 U와 그 부모의 연결을 끊고 정점 U를 기준으로 그 자식들, 자식들의 자식들… 로 만든 트리를 말한다.
물론 직접 연결을 끊은 뒤 다시 정점의 수를 세는 방법도 가능하겠지만, 트리의 정점 수가 많고, 질의 또한 많다면 프로그램이 제한시간 내에 수행될 수 없을 확률이 높다. 아마 미리 모든 정점을 각각 루트로 하는 서브트리에서의 정점의 수를 빠르게 구해 둘 방법이 있다면 좋을 것이다.
-> 서브트리 개수 구하는 거 이해를 잘못해서 시간 오래 걸림
-> U를 루트로 트리 만드는 게 아니라, 루트인 R에 대해 트리 한 번 만들어 놓고, [U를 루트로 하는 서브트리]의 정점의 수를 구하는 거였음
*/
