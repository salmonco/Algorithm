const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const [R, C] = input[0].split(" ").map(Number);
const map = input.slice(1).map((v) => v.split(""));
const dr = [-1, 1, 0, 0];
const dc = [0, 0, -1, 1];
let history = 1 << (map[0][0].charCodeAt() - 65);
let max = 0;

const isOut = (r, c) => r < 0 || r >= R || c < 0 || c >= C;

const dfs = (r, c, depth) => {
  max = Math.max(max, depth);
  for (let i = 0; i < dr.length; i++) {
    const [nr, nc] = [r + dr[i], c + dc[i]];
    if (isOut(nr, nc)) continue;
    const nextCharBit = 1 << (map[nr][nc].charCodeAt() - 65);
    if (history & nextCharBit) continue;
    const temp = history;
    history |= nextCharBit;
    dfs(nr, nc, depth + 1);
    history = temp;
  }
};

dfs(0, 0, 1);
console.log(max);

/*
말은 상하좌우로 인접한 네 칸 중의 한 칸으로 이동할 수 있는데, 새로 이동한 칸에 적혀 있는 알파벳은 지금까지 지나온 모든 칸에 적혀 있는 알파벳과는 달라야 한다.
즉, 같은 알파벳이 적힌 칸을 두 번 지날 수 없다.
좌측 상단에서 시작해서, 말이 최대한 몇 칸을 지날 수 있는지를 구하는 프로그램을 작성하시오. 말이 지나는 칸은 좌측 상단의 칸도 포함된다.

큐에 history 객체 새로 생성해서 넣기 -> 메모리초과
-> 비트마스킹
-> 그래도 메모리초과 -> why? -> BFS를 사용하면 queue에 많은 상태가 저장됩니다.
-> dfs 이용

*/
