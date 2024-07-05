const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));
const [N] = input[0];
const town = [0, ...input[1]];
const list = Array.from({ length: N + 1 }, () => []);
const visited = Array.from({ length: N + 1 }, () => false);
const memo = Array.from({ length: N + 1 }, () =>
  Array.from({ length: 2 }, () => -1)
);

for (let i = 0; i < N - 1; i++) {
  const [a, b] = input[i + 2];
  list[a].push(b);
  list[b].push(a);
}

const traversal = (pos, isNice) => {
  if (list[pos].length === 0) return 0;
  if (memo[pos][isNice] !== -1) return memo[pos][isNice];
  visited[pos] = true;
  memo[pos][isNice] = 0;
  for (let child of list[pos]) {
    if (visited[child]) continue;
    if (isNice === 1) {
      // 이전 노드가 우수마을일 경우
      memo[pos][isNice] += traversal(child, 0);
    } else {
      memo[pos][isNice] += Math.max(
        traversal(child, 1) + town[child],
        traversal(child, 0)
      );
    }
  }
  visited[pos] = false;
  return memo[pos][isNice];
};

const ans = Math.max(traversal(1, 1) + town[1], traversal(1, 0));
console.log(ans);

/*
1. '우수 마을'로 선정된 마을 주민 수의 총 합을 최대로 해야 한다.
2. 마을 사이의 충돌을 방지하기 위해서, 만일 두 마을이 인접해 있으면 두 마을을 모두 '우수 마을'로 선정할 수는 없다. 즉 '우수 마을'끼리는 서로 인접해 있을 수 없다.
3. 선정되지 못한 마을에 경각심을 불러일으키기 위해서, '우수 마을'로 선정되지 못한 마을은 적어도 하나의 '우수 마을'과는 인접해 있어야 한다.
첫째 줄에 '우수 마을'의 주민 수의 총 합을 출력한다.

트리 + DP

Tree구조로 구성되어있는 마을 데이터를
dfs와 dp로 탐색하여 마을 인원 수가 최대가 되게 우수마을들을 선정
*/
