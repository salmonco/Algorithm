const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));
const [N, M] = input[0];
const ans = [];

const dfs = (idx, cnt, arr) => {
  if (cnt === M) {
    ans.push(arr.join(" "));
    return;
  }
  for (let i = idx; i <= N; i++) {
    dfs(i, cnt + 1, [...arr, i]);
  }
};

for (let i = 1; i <= N; i++) {
  dfs(i, 1, [i]);
}
console.log(ans.join("\n"));

/*
자연수 N과 M이 주어졌을 때, 아래 조건을 만족하는 길이가 M인 수열을 모두 구하는 프로그램을 작성하시오.
- 1부터 N까지 자연수 중에서 M개를 고른 수열
- 같은 수를 여러 번 골라도 된다.
- 고른 수열은 비내림차순이어야 한다.

*/
