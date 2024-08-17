const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));
const [F, S, G, U, D] = input[0];

const bfs = (s) => {
  const queue = [[s, 0]];
  const visited = Array.from({ length: F + 1 }, () => false);
  let head = 0;
  visited[s] = true;
  while (queue.length > head) {
    const [c, cnt] = queue[head++];
    if (c === G) return cnt;
    for (const n of [c + U, c - D]) {
      if (n <= 0 || n > F || visited[n]) continue;
      queue.push([n, cnt + 1]);
      visited[n] = true;
    }
  }
  return "use the stairs";
};
const ans = bfs(S);
console.log(ans);

/*
스타트링크는 총 F층으로 이루어진 고층 건물에 사무실이 있고, 스타트링크가 있는 곳의 위치는 G층이다.
강호가 지금 있는 곳은 S층이고, 이제 엘리베이터를 타고 G층으로 이동하려고 한다.
U버튼은 위로 U층을 가는 버튼, D버튼은 아래로 D층을 가는 버튼이다.
(만약, U층 위, 또는 D층 아래에 해당하는 층이 없을 때는, 엘리베이터는 움직이지 않는다)
(1 ≤ S, G ≤ F ≤ 1000000, 0 ≤ U, D ≤ 1000000)
건물은 1층부터 시작하고, 가장 높은 층은 F층이다.

첫째 줄에 강호가 S층에서 G층으로 가기 위해 눌러야 하는 버튼의 수의 최솟값을 출력한다.
만약, 엘리베이터로 이동할 수 없을 때는 "use the stairs"를 출력한다.

15:05~15:28 (23m)
*/
