const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));
const [N, M] = input[0];
const seq = input[1];
const ans = [];
seq.sort((a, b) => a - b);

const dfs = (idx, arr, cnt) => {
  if (cnt === M) {
    ans.push(arr.join(" "));
    return;
  }
  if (idx === N) return;
  const v = seq[idx];
  dfs(idx + 1, [...arr, v], cnt + 1); // 포함
  dfs(idx + 1, [...arr], cnt); // 미포함
};

dfs(0, [], 0);
console.log(ans.join("\n"));

/*
N개의 자연수와 자연수 M이 주어졌을 때, 아래 조건을 만족하는 길이가 M인 수열을 모두 구하는 프로그램을 작성하시오. N개의 자연수는 모두 다른 수이다.
- N개의 자연수 중에서 M개를 고른 수열
- 고른 수열은 오름차순이어야 한다.
(1 ≤ M ≤ N ≤ 8)
입력으로 주어지는 수는 10,000보다 작거나 같은 자연수이다.

*/
