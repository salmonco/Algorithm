const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));
const [N, M] = input[0];
const ans = [];

const dfs = (arr, cnt) => {
  if (cnt === M) {
    ans.push(arr.join(" "));
    return;
  }
  for (let i = 1; i <= N; i++) {
    if (arr[arr.length - 1] >= i) continue;
    dfs([...arr, i], cnt + 1);
  }
};
dfs([], 0);
console.log(ans.join("\n"));

/*
자연수 N과 M이 주어졌을 때, 아래 조건을 만족하는 길이가 M인 수열을 모두 구하는 프로그램을 작성하시오.
- 1부터 N까지 자연수 중에서 중복 없이 M개를 고른 수열
- 고른 수열은 오름차순이어야 한다.
*/
