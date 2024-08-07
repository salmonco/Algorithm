const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const [N, M, K] = input[0].split(" ").map(Number);
const map = [];
const hash = {};
const dr = [-1, -1, -1, 0, 1, 1, 1, 0];
const dc = [-1, 0, 1, 1, 1, 0, -1, -1];
const maxLen = 5;
for (let i = 0; i < N; i++) {
  const arr = input[i + 1].split("");
  map[i] = arr;
}
for (let i = 0; i < K; i++) {
  const str = input[i + 1 + N];
  hash[str] = 0;
}

const bfs = (r, c) => {
  const queue = [[r, c, map[r][c], 1]];
  let head = 0;
  while (queue.length > head) {
    const [cr, cc, str, len] = queue[head++];
    if (len > maxLen) continue;
    // console.log(cr, cc, str, len)
    for (let i = 0; i < dr.length; i++) {
      let [nr, nc] = [(cr + dr[i]) % N, (cc + dc[i]) % M];
      if (nr < 0) nr += N;
      if (nc < 0) nc += M;
      const newStr = str + map[nr][nc];
      if (hash[newStr] !== undefined) hash[newStr]++;
      queue.push([nr, nc, newStr, len + 1]);
    }
  }
};

for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    bfs(i, j);
  }
}
console.log(Object.values(hash).join("\n"));

/*
bfs + 해시
K개의 줄에 걸쳐서, 신이 좋아하는 문자열을 만들 수 있는 경우의 수를 순서대로 출력한다.
1 ≤ 신이 좋아하는 문자열의 길이 ≤ 5

8방향 이동 + 환형
*/
